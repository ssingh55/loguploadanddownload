//load the aws SDK for javascript
const AWS = require('aws-sdk');

//set the region
AWS.config.update({ region: 'us-east-2' });

//check for params
if (process.argv[2] === undefined) {
    console.log('Please enter 2nd parameter for creating the bucket');
    return;
}

//create the parameters for calling createBucket
const bucketParams = {
    Bucket: process.argv[2]
};

//create s3 service object
const s3 = new AWS.S3();

//call s3 to create the bucket
s3.createBucket(bucketParams, function (err, data) {
    if (err) {
        console.log("Error", err);
    }
    else {
        console.log("Success", data.Location);
    }
})