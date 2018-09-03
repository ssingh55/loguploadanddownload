//Load the AWS SDK for the JavaScript
const AWS = require('aws-sdk');

//set the global regions
AWS.config.update({ region: 'us-east-2' });

//create the parameters for calling the bucket
let bucketParams = {
    Bucket: process.argv[2]
};

//create object of s3
let s3 = new AWS.S3();

//Call s3 to delete the s3 bucket
s3.deleteBucket(bucketParams, (err, data) => {
    if (err) {
        console.log('error', err);
    }
    else {
        console.log('Success', data);
    }
})