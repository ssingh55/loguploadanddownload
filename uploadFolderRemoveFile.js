const AWS = require("aws-sdk"),
    path = require("path"),
    fs = require("fs"),
    configRegion = require("./config.json").region,
    config = require("./config.json").upload,
    configTime = config.time,
    configBucket = config.bucketDetails,
    configLocalDirectory = config.localDirectoriesPathDetails;

const uploadDir = (directoryPath, bucketName) => {
    AWS.config.update({ region: configRegion });

    s3Upload = (params, bucketFilePath) => {
        let s3 = new AWS.S3();
        s3.upload(params, (err, data) => {
            if (err) {
                console.log("check for params are correct");
            } else {
                console.log("Successfully uploaded " + bucketFilePath + " to " + bucketName);
                if (data.ETag) {
                    fs.unlink(bucketFilePath, (err) => {
                        if (err)
                            console.error(err);
                        else {
                            console.log("Removed the file " + bucketFilePath);
                        }
                    })
                } else {
                    console.log("\x1b[31m", "File uploading was unsuccessful");
                }
            }
        });
    }

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

    directoryWalkSync(directoryPath, async (filePath) => {
        let bucketFilePath = filePath;
        let fileStream = await fs.createReadStream(filePath);
        let params = {
            Bucket: bucketName,
            Key: bucketFilePath,
            Body: fileStream
        };
        await s3Upload(params, bucketFilePath);
    });
};

configLocalDirectory.directoryPathArrays.forEach((directory) => {
    uploadDir(directory, configBucket.bucketName);
})
