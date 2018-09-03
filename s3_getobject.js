//load the aws SDK for downloading
const AWS = require('aws-sdk');
const fs = require('fs');

//set global region
AWS.config.update({ region: 'us-east-2' });

//create object of s3
let s3 = new AWS.S3();
//set the params for downloading the object
let paramsGet = {
    Bucket: process.argv[2],
    Key: process.argv[3]
};

s3.getObject(paramsGet, (err, data) => {
    if (err) console.log('error', err);
    else {
        console.log('data', data);
        fs.writeFileSync(process.argv[3], data.Body);
    }
})