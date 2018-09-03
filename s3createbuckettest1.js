//Load the sdk for JavaScript
var AWS = require('aws-sdk');
//set the region
AWS.config.update({ region: 'us-east-2' });

//Create s3 service object
var s3 = new AWS.S3();

var myBucket = "testAWSSDK";

var myKey = 'redhat';

s3.createBucket({ Bucket: myBucket }, (err, data) => {
	if (err) {
		console.log('create bucket', err);
	} else {
		params = { Bucket: myBucket, Key: myKey, Body: 'Hello!' };

		s3.putObject(params, function (err, data) {
			if (err) {
				console.log(err);
			} else {
				console.log("Successfully uploaded data to mybucket/key");
			}
		})
	}
}
);
