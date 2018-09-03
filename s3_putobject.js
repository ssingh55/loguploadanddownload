//load the AWS SDK for node
const AWS = require('aws-sdk');
const fs = require('fs');

//set the global region
AWS.config.update({ region: 'us-east-2' });

//create s3 object
let s3 = new AWS.S3();

//params to be set for upload
let paramsUpload = {
    Body: fs.readFileSync(process.argv[3]),
    Bucket: process.argv[2],
    Key: process.argv[3]
}
s3.putObject(paramsUpload, (err, data) => {
    if (err)
        console.log('error', err);
    else
        console.log('data uploaded', data);

})