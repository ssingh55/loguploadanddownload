//load the AWS SDK for Node.js
const AWS = require('aws-sdk');

//Set the region
AWS.config.update({ region: 'us-east-2' });

//Create s3 service object
let s3 = new AWS.S3();

//Call s3 to retrieve upload file to specified bucket

//Body params is to set the content of the file
let uploadParams = { Bucket: process.argv[2], Key: '', Body: '' };

let file = process.argv[3];

let fs = require('fs');

//TO obtain the content of the file
let fileStream = fs.createReadStream(file);
fileStream.on('error', err => {
    console.log('File error', err);
})

uploadParams.Body = fileStream;

let path = require('path');
uploadParams.Key = path.basename(file);

//call s3 to retrieve upload file to specified bucket
s3.upload(uploadParams, function (err, data) {
    if (err)
        console.log('Error', err);
    else
        console.log('Upload success', data.Location);
});