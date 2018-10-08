const AWS = require("aws-sdk"),
    fs = require("fs"),
    path = require("path"),
    getFileNameWithRangeOfDate = require("./getFileNameWithRangeOfDate").getFileNameWithRangeOfDate,
    verifyDate = require("./verifyDate").verifyDate,
    configRegion = require("./config.json").region;

ensureDirectoryExists = (filePath) => {
    let dirName = path.dirname(filePath);
    if (fs.existsSync(dirName)) {
        console.log("folder exists");
        return true;
    }
    else {
        ensureDirectoryExists(dirName);
        fs.mkdirSync(dirName);
    }
}

configAWSregion = () => {
    AWS.config.update({ region: configRegion });
    return AWS.config.region;
}

s3Download = (fileName, downloadDirectory, bucketName) => {
    return new Promise((resolve, reject) => {
        ensureDirectoryExists(path.join(downloadDirectory, fileName));
        let newDownloadFile = fs.createWriteStream(path.join(downloadDirectory, fileName));
        let s3 = new AWS.S3();
        s3.getObject({ Bucket: bucketName, Key: fileName })
            .createReadStream()
            .on("error", (error) => {
                fs.unlink(path.join(downloadDirectory, fileName), (err) => {
                    if (err) {
                        console.error(err);
                        resolve(false);
                    }
                    else {
                        console.log("Removed the file " + fileName);
                        resolve(false);
                    }
                })
                if (error.code === "NoSuchBucket") {
                    console.log("No such bucket found");
                    resolve(error.code)
                }
                else {
                    console.log("No Such Key found or Stream Content Length Mismatch");
                    resolve('No such key found');
                }
            })
            .on("end", () => {
                console.log('Successfully got the object');
                resolve(true);
            })
            .pipe(newDownloadFile);
    })
};

const downloadFile = (bucketName, fileKeyName, startDate, endDate, downloadDirectory) => {
    if (fileKeyName === undefined || fileKeyName.trim() === "") {
        console.log("please enter the file name with full path in the script");
        console.log("Don't run it without shell script file");
        return undefined;
    }
    if (startDate === undefined) {
        console.log("please enter the startdate correctly in the script");
        console.log("Don't run it without shell script file");
        return undefined;
    }
    if (endDate === undefined) {
        console.log("please enter the enddate correctly in the script");
        console.log("Don't run it without shell script file");
        return undefined;
    }

    configAWSregion();

    ensureDirectoryExists(downloadDirectory);
    if (verifyDate(startDate) && verifyDate(endDate)) {
        if (startDate <= endDate) {
            getFileNameWithRangeOfDate(fileKeyName, startDate, endDate).forEach((fileName) => {
                fs.exists(path.join(downloadDirectory, fileName), (exists) => {
                    if (exists) {
                        console.log("Skipping: " + fileName);
                    }
                    else {
                        console.log("Retrieving: " + fileName);
                        s3Download(fileName, downloadDirectory, bucketName);
                    }
                })
            })
        }
        else {
            console.log("Start date should be less than end date");
        }
    }
    else {
        console.log("Some error with date format ensure that the date format and date entered is matching");
    }
}

downloadFile("configBucket.bucketName", "endata", "startDate", "endDate", "configDownloadDirectory");

module.exports = {
    ensureDirectoryExists,
    configAWSregion,
    downloadFile,
    s3Download
}