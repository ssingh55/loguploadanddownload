const AWS = require('aws-sdk'),
    fs = require('fs'),
    path = require('path');

const ensureDirectoryExists = (filePath) => {
    let dirName = path.dirname(filePath);
    if (fs.existsSync(dirName)) {
        console.log('folder exists');
        return true;
    }
    else {
        ensureDirectoryExists(dirName);
        fs.mkdirSync(dirName);
    }
}

const downloadDir = (bucketName) => {
    ensureDirectoryExists(bucketName);
    let s3 = new AWS.S3();
    s3.listObjects({ Bucket: bucketName }, (err, data) => {
        if (err) console.log('error inside listing object', err);
        else {
            console.log(data.Contents.length + " files found in " + bucketName + " bucket");
            data.Contents.forEach((currentValue, index, array) => {
                console.log('current value', currentValue);

                //check the file already exists
                fs.exists(bucketName + "/" + currentValue.Key, function (exists) {
                    if (exists) {
                        console.log("Skipping: " + currentValue.Key);
                    }
                    else {
                        console.log("Retrieving: " + currentValue.Key);
                        s3.getObject({ Bucket: bucketName, Key: currentValue.Key }, (err, data) => {
                            if (err) console.log('Error in getting the object', err);
                            else {
                                ensureDirectoryExists(bucketName + "/" + currentValue.Key);
                                fs.writeFileSync(bucketName + "/" + currentValue.Key, data.Body, () => {
                                    console.log('Finished retrieving');
                                })
                            }
                        })
                    }
                })
            })
        }

    })
}

downloadDir('testcli96146');