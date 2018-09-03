//Load the SDK for JavaScript
const AWS = require('aws-sdk');

//Set the global region
AWS.config.update({ region: 'us-east-2' });

//create Objects for s3
let s3 = new AWS.S3();

//create the parameters for calling the listObjects
let bucketParams = {
    Bucket: process.argv[2] //Enter the bucket name
}

//Call s3 to list the objects
s3.listObjects(bucketParams, (err, data) => {
    if (err) {
        console.log('Error', err);
    } else {
        console.log('Success', data);
    }
})