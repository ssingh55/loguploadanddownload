const uploadDir = require('./uploadFolderRemoveFile').uploadDir,
    config = require("./config.json").upload,
    configBucket = config.bucketDetails,
    configLocalDirectory = config.localDirectoriesPathDetails;

configLocalDirectory.directoryPathArrays.forEach((directory) => {
    uploadDir(directory, configBucket.bucketName);
})