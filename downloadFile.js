const AWS = require('aws-sdk'),
    fs = require('fs'),
    path = require('path'),
    getFileNameWithRangeOfDate = require('./getFileNameWithDate').getFileNameWithRangeOfDate,
    verifyDate = require('./verifyDate').verifyDate,
    configRegion = require('./config.json').region,
    config = require('./config.json').download,
    configDownloadDirectory = config.downloadDirectory,
    configBucket = config.bucketDetails,
    logFileName = process.argv[2],
    startDate = process.argv[3],
    endDate = process.argv[4];

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

const downloadFile = (bucketName, FileKeyName, startDate, endDate, downloadDirectory) => {

    if (FileKeyName === undefined) {
        console.log('please enter the file name with path in the script seprated by space');
        return;
    }
    AWS.config.update({ region: configRegion });

    s3Download = (fileName, downloadDirectoryWithBucketName) => {
        s3.getObject({ Bucket: bucketName, Key: fileName }, (err, data) => {
            if (err) console.log('Error in getting the object, check for bucketname or FilekeyName');
            else {
                ensureDirectoryExists(path.join(downloadDirectoryWithBucketName, fileName));
                fs.writeFileSync(path.join(downloadDirectoryWithBucketName, fileName), data.Body, () => {
                    console.log('Finished retrieving');
                })
            }
        })
    }

    let downloadDirectoryWithBucketName = path.join(downloadDirectory, bucketName)
    ensureDirectoryExists(downloadDirectoryWithBucketName);
    let s3 = new AWS.S3();
    if (verifyDate(startDate) && verifyDate(endDate)) {
        if (startDate < endDate) {
            getFileNameWithRangeOfDate(FileKeyName, startDate, endDate).forEach((fileName) => {
                fs.exists(path.join(downloadDirectoryWithBucketName, fileName), function (exists) {
                    if (exists) {
                        console.log("Skipping: " + fileName);
                    }
                    else {
                        console.log("Retrieving: " + fileName);
                        s3Download(fileName, downloadDirectoryWithBucketName);
                    }
                })
            })
        }
        else {
            console.log('start date should be less than end date');
        }
    }
    else {
        console.log('Some error with date format ensure that the date format and date entered is matching');
    }
}
downloadFile(configBucket.bucketName, logFileName, startDate, endDate, configDownloadDirectory);