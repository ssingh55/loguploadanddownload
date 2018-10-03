const config = require("./config.json").download,
    configDownloadDirectory = config.downloadDirectory,
    configBucket = config.bucketDetails,
    logFileName = process.argv[2],
    startDate = process.argv[3],
    endDate = process.argv[4],
    downloadFile = require('./downloadFile').downloadFile;

downloadFile(configBucket.bucketName, logFileName, startDate, endDate, configDownloadDirectory);