const AWS = require('aws-sdk'),
    fs = require('fs'),
    path = require('path'),
    getFileNameWithRangeOfDate = require('./getFileNameWithDate').getFileNameWithRangeOfDate,
    verifyDate = require('./verifyDate').verifyDate,
    config = require('./config.json').download,
    configBucket = config.bucketDetails,
    logFileName = config.logFileName,
    time = config.time,
    modifyDate = require('./modifyDate').modifyDate;

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

const downloadFile = (bucketName, FileKeyName, startDate, endDate) => {

    s3Download = (fileName) => {
        s3.getObject({ Bucket: bucketName, Key: fileName }, (err, data) => {
            if (err) console.log('Error in getting the object check for bucketname or FilekeyName', err);
            else {
                ensureDirectoryExists(bucketName + "/" + fileName);
                fs.writeFileSync(bucketName + "/" + fileName, data.Body, () => {
                    console.log('Finished retrieving');
                })
            }
        })
    }

    ensureDirectoryExists(bucketName);
    let s3 = new AWS.S3();
    if (verifyDate(startDate) && verifyDate(endDate)) {
        startDate = modifyDate(startDate);
        endDate = modifyDate(endDate);
        if (startDate < endDate) {
            getFileNameWithRangeOfDate(FileKeyName, startDate, endDate).forEach((fileName) => {
                //check the file already exists
                fs.exists(bucketName + "/" + fileName, function (exists) {
                    if (exists) {
                        console.log("Skipping: " + fileName);
                    }
                    else {
                        console.log("Retrieving: " + fileName);
                        // s3Download(fileName);
                    }
                })
            })
        }
        else {
            console.log('start date should be less than end date');
        }
    }
    else {
        console.log('Some error with date format change the config file and date entered is matching');
    }
}
// downloadFile(configBucket.bucketName, logFileName, time.startDate, time.endDate);
downloadFile(configBucket.bucketName, logFileName, "2018-08-06", "2018-09-05");