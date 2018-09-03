//Load the AWS SDK for the JavaScript
const AWS = require('aws-sdk');

//set the global region
AWS.config.update({ region: 'us-east-2' });

//create s3 service object
let s3 = new AWS.S3();

//create parameters for the delete object
let bucketParams = {
    Bucket: process.argv[2],
    Key: process.argv[3]
}

s3.deleteObject(bucketParams, (err, data) => {
    console.log(err, '..', data);
    if (err) {
        console.log('File not deleted', err);
    } else {
        console.log('File deleted successfully', data);
    }
})