const AWS = require("aws-sdk"),
    path = require("path"),
    fs = require("fs"),
    configRegion = require("./config.json").region,
    config = require("./config.json").upload,
    configTime = config.time;

configAWSregion = () => {
    AWS.config.update({ region: configRegion });
    return AWS.config.region;
}

s3Upload = (params, bucketFilePath, localFilePath, bucketName) => {
    return new Promise((resolve, reject) => {
        let s3 = new AWS.S3();
        s3.upload(params, (err, data) => {
            if (err) {
                if (err.code == 'NoSuchBucket') {
                    console.log('Check the bucket name');
                    resolve(false);
                }
                else {
                    console.log("check for params are correct", err);
                    resolve(false);
                }
            } else {
                if (data.ETag) {
                    console.log("Successfully uploaded " + bucketFilePath + " to " + bucketName);
                    fs.unlink(localFilePath, (err) => {
                        if (err) {
                            console.error(err);
                            resolve(false);
                        }
                        else {
                            console.log("Removed the file " + localFilePath);
                            resolve(true);
                        }
                    })
                } else {
                    console.log("\x1b[31m", "File uploading was unsuccessful");
                }
            }
        });
    })
}

const uploadDir = (directoryPath, bucketName) => {
    console.log('inside uploadDir function');
    configAWSregion();

    directoryWalkSync = (currentDirPath, callback) => {
        console.log("inside directoryWalksync currentdir :", currentDirPath)
        try {
            fs.readdirSync(currentDirPath).forEach(function (pathName) {
                let filePath = path.join(currentDirPath, pathName);
                let fileStat = fs.statSync(filePath);
                if (fileStat.isFile()) {
                    let fileModifiedTime = fileStat.mtime;
                    let currentTime = new Date();
                    let diffBetweenCurrentAndModifiedTime = (currentTime - fileModifiedTime) / (1000 * 60 * 60 * 24);
                    if (diffBetweenCurrentAndModifiedTime > configTime.minTimePeriod) {
                        callback(filePath);
                    }
                } else if (fileStat.isDirectory()) {
                    directoryWalkSync(filePath, callback);
                }
            });
        }
        catch (err) {
            if (err.code === "ENOENT")
                console.error("File not found check for path");
            else
                console.log("Error: ", err);
        }
    }

    directoryWalkSync(directoryPath, async (localFilePath) => {
        let bucketFilePath;
        if (localFilePath.startsWith("/"))
            bucketFilePath = localFilePath.slice(1);
        else
            bucketFilePath = localFilePath;
        let fileStream = await fs.createReadStream(localFilePath);
        let params = {
            Bucket: bucketName,
            Key: bucketFilePath,
            Body: fileStream
        };
        await s3Upload(params, bucketFilePath, localFilePath, bucketName);
    });
};

module.exports = {
    configAWSregion,
    uploadDir,
    s3Upload
}