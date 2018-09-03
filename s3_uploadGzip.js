const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-2' });

let s3 = new AWS.S3(),
    fs = require('fs');

let file = process.argv[3];
var uploadEntitlementDataOnS3 = function (bucketName, filePath) {
    console.log("uploadEntitlementDataOnS3 function started", filePath);
    // var bufferObject = new Buffer.from(JSON.stringify(jsonFileContent));
    let fileStream = fs.createReadStream(filePath);
    let zlib = require('zlib');
    // console.log(fileStream);

    // var s3 = new AWS.S3();
    zlib.gunzip(fileStream, function (err, zipped) {
        if (err) {
            console.log("error", err);
            // next(err);
        }
        else {
            console.log("zipped", zipped);
            /*
            var params = {
                Bucket: bucketName,
                Key: filePath,
                Body: zipped,
                CacheControl: 'no-cache',
                // ContentType: "application/json",
                ContentEncoding: 'gzip'
            }
            s3.putObject(params, function (err, data) {
                if (err) {
                    console.err('err', err.stack);
                } else {
                    // next(null, filePath);
                    console.log('filePath', filePath);
                }
            });*/
        }
    })
};

uploadEntitlementDataOnS3('testcli96146', 'package.json')