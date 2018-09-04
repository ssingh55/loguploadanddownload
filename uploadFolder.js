const AWS = require('aws-sdk'),
    path = require("path"),
    fs = require('fs'),
    getFileNameWithDate = require('./getFileNameWithDate').getFileNameWithDate,
    config = require('./config.json').upload,
    configTime = config.time,
    configBucket = config.bucketDetails,
    configLocalDirectory = config.localDirectoriesPathDetails;

const uploadDir = (s3Path, bucketName) => {

    s3Upload = (params, bucketFilePath) => {
        let s3 = new AWS.S3();
        s3.upload(params, (err, data) => {
            if (err) {
                console.log('check for params are correct');
                console.log(err)
            } else {
                console.log('Successfully uploaded ' + bucketFilePath + ' to ' + bucketName);
            }
        });
    }

    directoryWalkSync = (currentDirPath, callback) => {
        console.log('inside directoryWalksync currentdir :', currentDirPath)
        try {
            fs.readdirSync(currentDirPath).forEach(function (name) {
                let filePath = path.join(currentDirPath, name);
                let stat = fs.statSync(filePath);
                if (stat.isFile()) {
                    // let fileCreatedTime = stat.birthtime.toISOString().slice(0, 10).replace(/-/g, '');
                    let fileModifiedTime = stat.mtime.toISOString().slice(0, 10).replace(/-/g, '');
                    let currentTime = new Date().toISOString().slice(0, 10).replace(/-/g, '');
                    let diffBetweenCurrentAndModifiedTime = currentTime - fileModifiedTime
                    if ((diffBetweenCurrentAndModifiedTime > configTime.minTimePeriod) && (diffBetweenCurrentAndModifiedTime < configTime.maxTimePeriod)) {
                        // callback(filePath, stat);
                        callback(filePath, fileModifiedTime);
                    }
                } else if (stat.isDirectory()) {
                    directoryWalkSync(filePath, callback);
                }
            });
        }
        catch (err) {
            console.log('File not found');
        }
    }

    directoryWalkSync(s3Path, (filePath, fileModifiedTime) => {
        let bucketFilePath = filePath;

        let params = {
            Bucket: bucketName,
            Key: getFileNameWithDate(bucketFilePath, fileModifiedTime),
            // Key: bucketFilePath,
            Body: fs.readFileSync(filePath)
        };
        // s3Upload(params, bucketFilePath);
    });
};

configLocalDirectory.directoryPathArray.forEach((directoryPath) => {
    uploadDir(directoryPath, configBucket.bucketName);
})
