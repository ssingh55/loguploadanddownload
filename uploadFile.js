const AWS = require('aws-sdk'),
    fs = require('fs'),
    getFileNameWithDate = require('./getFileNameWithDate').getFileNameWithDate;

const s3 = new AWS.S3();

const uploadFile = (bucketName, fileName) => {
    console.log('inside upload file');
    fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        const fileParams = {
            Bucket: bucketName,
            Key: getFileNameWithDate(fileName),
            Body: data
        };
        s3.upload(fileParams, (s3Err, data) => {
            if (s3Err) throw s3Err;
            console.log('File uploaded successfully at ', data.Location);
        })
    })
}

module.exports = {
    uploadFile
}
uploadFile('testcli96146', 'package.json');