const AWS = require('aws-sdk');
const path = require("path");
const fs = require('fs');
const getFileNameWithDate = require('./getFileNameWithDate').getFileNameWithDate;

const uploadDir = (s3Path, bucketName) => {

    let s3 = new AWS.S3();

    walkSync = (currentDirPath, callback) => {
        console.log('inside walksync')
        fs.readdirSync(currentDirPath).forEach(function (name) {
            let filePath = path.join(currentDirPath, name);
            let stat = fs.statSync(filePath);
            if (stat.isFile()) {
                // let fileCreatedTime = stat.birthtime.toISOString().slice(0, 10).replace(/-/g, '');
                let fileModifiedTime = stat.mtime.toISOString().slice(0, 10).replace(/-/g, '');
                let currentTime = new Date().toISOString().slice(0, 10).replace(/-/g, '');
                // if ( Number(currentTime) -Number(fileModifiedTime) > 30)
                if ((currentTime - fileModifiedTime) > 30) {
                    // callback(filePath, stat);
                    callback(filePath, fileModifiedTime);
                }
            } else if (stat.isDirectory()) {
                walkSync(filePath, callback);
            }
        });
    }

    walkSync(s3Path, (filePath, fileModifiedTime) => {
        let bucketFilePath = filePath;
        let params = {
            Bucket: bucketName,
            Key: getFileNameWithDate(bucketFilePath, fileModifiedTime),//check with this to update with modified time
            Body: fs.readFileSync(filePath)
        };
        s3.upload(params, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Successfully uploaded ' + bucketFilePath + ' to ' + bucketName);
            }
        });
    });
};

uploadDir("./testuploadfolder/", "testcli96146");