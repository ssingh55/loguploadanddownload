//Load the SDK for JavaScript
const AWS = require('aws-sdk');

//Set the region
AWS.config.update({ region: 'us-east-2' });

// Create s3 service object
let s3 = new AWS.S3();

//Call s3 to list current buckets
s3.listBuckets((err, data) => {
	if (err)
		console.log("Error", err);
	else
		console.log('Bucket list', data);
})