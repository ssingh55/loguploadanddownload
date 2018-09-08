const AWS = require("aws-sdk"),
    fs = require("fs"),
    path = require("path"),
    getFileNameWithRangeOfDate = require("./getFileNameWithRangeOfDate").getFileNameWithRangeOfDate,
    verifyDate = require("./verifyDate").verifyDate,
    configRegion = require("./config.json").region;

const ensureDirectoryExists = (filePath) => {
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

s3Download = (fileName, downloadDirectory, bucketName) => {
    ensureDirectoryExists(path.join(downloadDirectory, fileName));
    let s3 = new AWS.S3();
    let newDownloadFile = fs.createWriteStream(path.join(downloadDirectory, fileName));
    s3.getObject({ Bucket: bucketName, Key: fileName })
        .createReadStream()
        .on("error", (error) => {
            fs.unlink(path.join(downloadDirectory, fileName), (err) => {
                if (err)
                    console.error(err);
                else {
                    console.log("Removed the file " + path.join(downloadDirectory, fileName));
                }
            })
            if (error.code === "NoSuchBucket") {
                console.log("No such bucket found");
            }
            else
                console.log("No Such Key found or Stream Content Length Mismatch");
        })
        .pipe(newDownloadFile)
        .on("end", () => {
            console.log('Successfully got the object');
        })
}

const downloadFile = (bucketName, fileKeyName, startDate, endDate, downloadDirectory) => {

    if (fileKeyName === undefined) {
        console.log("please enter the file name with path in the script");
        console.log("Don't run it without shell script file");
        return undefined;
    }
    if (startDate === undefined) {
        console.log("please enter the startdate in the script");
        console.log("Don't run it without shell script file");
        return undefined;
    }
    if (endDate === undefined) {
        console.log("please enter the enddate in the script");
        console.log("Don't run it without shell script file");
        return undefined;
    }
    AWS.config.update({ region: configRegion });

    ensureDirectoryExists(downloadDirectory);
    if (verifyDate(startDate) && verifyDate(endDate)) {
        if (startDate <= endDate) {
            getFileNameWithRangeOfDate(fileKeyName, startDate, endDate).forEach((fileName) => {
                fs.exists(path.join(downloadDirectory, fileName), function (exists) {
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

module.exports = {
    downloadFile,
    s3Download
}