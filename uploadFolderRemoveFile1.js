const AWS = require("aws-sdk"),
    path = require("path"),
    fs = require("fs"),
    configRegion = require("./config.json").region,
    config = require("./config.json").upload,
    configTime = config.time,
    configBucket = config.bucketDetails,
    configLocalDirectory = config.localDirectoriesPathDetails;

configAWSregion = () => {
    AWS.config.update({ region: configRegion });
    return AWS.config.region;
}

s3Upload = (params, bucketFilePath, bucketName, callback) => {
    let s3 = new AWS.S3();
    s3.upload(params, (err, data) => {
        if (err) {
            if (err.code === "NoSuchBucket") {
                console.log("No such bucket found");
                callback(false);
            }
            else {
                console.log("check for params are correct", err);
                callback(false);
            }
        } else {
            console.log("Successfully uploaded " + bucketFilePath + " to " + bucketName);
            if (data.ETag) {
                fs.unlink(bucketFilePath, (err) => {
                    if (err) {
                        console.error(err);
                        callback(false);
                    }
                    else {
                        console.log("Removed the file " + bucketFilePath);
                        callback(true);
                    }
                })
            } else {
                console.log("\x1b[31m", "File uploading was unsuccessful");
            }
        }
    });
}
// s3Upload = (params, bucketFilePath, bucketName) => {
//     let s3 = new AWS.S3();
//     s3.upload(params, (err, data) => {
//         if (err) {
//             if (err.code === "NoSuchBucket") {
//                 console.log("No such bucket found");
//                 // callback(false);
//             }
//             else {
//                 console.log("check for params are correct", err);
//                 // callback(false);
//             }
//         } else {
//             console.log("Successfully uploaded " + bucketFilePath + " to " + bucketName);
//             if (data.ETag) {
//                 fs.unlink(bucketFilePath, (err) => {
//                     if (err) {
//                         console.error(err);
//                         // callback(false);
//                     }
//                     else {
//                         console.log("Removed the file " + bucketFilePath);
//                         // callback(true);
//                     }
//                 })
//             } else {
//                 console.log("\x1b[31m", "File uploading was unsuccessful");
//             }
//         }
//     });
// }

directoryWalkSync = (currentDirPath, callback) => {
    console.log("inside directoryWalksync currentdir :", currentDirPath)
    try {
        fs.readdirSync(currentDirPath).forEach(function (pathName) {
            let filePath = path.join(currentDirPath, pathName);
            let fileStat = fs.statSync(filePath);
            if (fileStat.isFile()) {
                let fileModifiedTime = fileStat.mtime;
                let currentTime = new Date();
                let diffBetweenCurrentAndModifiedTime = (currentTime - fileModifiedTime) / (1000 * 60 * 60 * 24);
                if (diffBetweenCurrentAndModifiedTime > configTime.minTimePeriod) {
                    callback(filePath);
                }
            } else if (fileStat.isDirectory()) {
                console.log('calling recursive directorywalksync');
                directoryWalkSync(filePath, callback);
            }
        });
    }
    catch (err) {
        if (err.code === "ENOENT")
            console.error("File not found check for path");
        else
            console.error("Error: ", err);
    }
}

const uploadDir = (directoryPath, bucketName) => {
    // AWS.config.update({ region: configRegion });
    configAWSregion();

    directoryWalkSync(directoryPath, async (filePath) => {
        let bucketFilePath = filePath;
        console.log("bucketFilePath", bucketFilePath);

        let fileStream = await fs.createReadStream(filePath);
        let params = {
            Bucket: bucketName,
            Key: bucketFilePath,
            Body: fileStream
        };
        await s3Upload(params, bucketFilePath, bucketName, (callbackpath) => {

        });
    });
};

configLocalDirectory.directoryPathArrays.forEach((directory) => {
    uploadDir(directory, configBucket.bucketName);
})
module.exports = {
    uploadDir,
    s3Upload,
    directoryWalkSync,
    configAWSregion
}