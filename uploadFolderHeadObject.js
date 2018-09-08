const AWS = require('aws-sdk'),
    path = require("path"),
    fs = require('fs'),
    configRegion = require('./config.json').region,
    config = require('./config.json').upload,
    configTime = config.time,
    configBucket = config.bucketDetails,
    configLocalDirectory = config.localDirectoriesPathDetails;

const uploadDir = (directoryPath, bucketName) => {
    AWS.config.update({ region: configRegion });

    s3Upload = (params, bucketFilePath) => {
        let s3 = new AWS.S3();
        s3.headObject(params, (err, data) => {
            if (err) {
                s3.upload(params, (err, data) => {
                    if (err) {
                        console.log('check for params are correct');
                        console.log(err);
                    } else {
                        console.log('Successfully uploaded ' + bucketFilePath + ' to ' + bucketName);
                    }
                });
            }
            else {
                console.log('data already exists on s3');

            }
        })
    }

    directoryWalkSync = (currentDirPath, callback) => {
        console.log('inside directoryWalksync currentdir :', currentDirPath)
        try {
            fs.readdirSync(currentDirPath).forEach(function (pathName) {
                let filePath = path.join(currentDirPath, pathName);
                let stat = fs.statSync(filePath);
                if (stat.isFile()) {
                    let fileModifiedTime = stat.mtime;
                    let currentTime = new Date();
                    let diffBetweenCurrentAndModifiedTime = (currentTime - fileModifiedTime) / (1000 * 60 * 60 * 24);
                    if (diffBetweenCurrentAndModifiedTime > configTime.minTimePeriod) {
                        callback(filePath);
                    }
                } else if (stat.isDirectory()) {
                    directoryWalkSync(filePath, callback);
                }
            });
        }
        catch (err) {
            if (err.code === "ENOENT")
                console.log("File not found check for path");
            else
                console.log("Other error");
        }
    }

    directoryWalkSync(directoryPath, (filePath) => {
        let bucketFilePath = filePath;
        console.log(bucketFilePath);

        let params = {
            Bucket: bucketName,
            Key: bucketFilePath,
            Body: fs.readFileSync(filePath)
        };
        s3Upload(params, bucketFilePath);
    });
};

configLocalDirectory.directoryPathArrays.forEach((directory) => {
    uploadDir(directory, configBucket.bucketName);
})
