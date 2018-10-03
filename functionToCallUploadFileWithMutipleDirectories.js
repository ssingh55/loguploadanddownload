const config = require("./config.json").upload,
    configBucket = config.bucketDetails,
    configLocalDirectory = config.localDirectoriesPathDetails,
    uploadDir = require('./uploadFolderRemoveFile').uploadDir;

configLocalDirectory.directoryPathArrays.forEach((directory) => {
    uploadDir(directory, configBucket.bucketName)
})