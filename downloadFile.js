const AWS = require('aws-sdk'),
    fs = require('fs'),
    path = require('path'),
    getFileNameWithRangeOfDate = require('./getFileNameWithDate').getFileNameWithRangeOfDate;

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

const downloadFile = (bucketName, Key, startDate, endDate) => {
    ensureDirectoryExists(bucketName);
    let s3 = new AWS.S3();
    getFileNameWithRangeOfDate(Key, startDate, endDate).forEach((fileName) => {
        //check the file already exists
        fs.exists(bucketName + "/" + fileName, function (exists) {
            if (exists) {
                console.log("Skipping: " + fileName);
            }
            else {
                console.log("Retrieving: " + fileName);
                s3.getObject({ Bucket: bucketName, Key: fileName }, (err, data) => {
                    if (err) console.log('Error in getting the object', err);
                    else {
                        ensureDirectoryExists(bucketName + "/" + fileName);
                        fs.writeFileSync(bucketName + "/" + fileName, data.Body, () => {
                            console.log('Finished retrieving');
                        })
                    }
                })
            }
        })
    })
}

//            bucketname      file                                          startdate             enddate
downloadFile('testcli96146', 'testuploadfolder/exotel/access-log/access.log', '2018-07-01', '2018-06-01');