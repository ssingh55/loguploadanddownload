const AWS = require("aws-sdk"),
    path = require("path"),
    fs = require("fs"),
    configRegion = require("./config.json").region,
    config = require("./config.json").upload,
    configTime = config.time;

configAWSregion = () => {
    AWS.config.update({ region: configRegion });
    return AWS.config.region;
}

s3Upload = (params, bucketFilePath, localFilePath, bucketName) => {
    console.log(new Date().toLocaleString()," Inside s3Upload function",bucketFilePath);
    return new Promise((resolve, reject) => {
        let s3 = new AWS.S3();
        s3.upload(params, (err, data) => {
            if (err) {
                if (err.code == "NoSuchBucket") {
                    console.error(new Date().toLocaleString()," Check the bucket name");
                    resolve(false);
                }
                else {
                    console.error(new Date().toLocaleString()," Check for params are correct", err);
                    resolve(false);
                }
            } else {
                if (data.ETag) {
                    console.log(new Date().toLocaleString()," Successfully uploaded " + bucketFilePath + " to " + bucketName);
                    fs.unlink(localFilePath, (err) => {
                        if (err) {
                            console.log(new Date().toLocaleString()," Error in unlinking the file");
                            console.error(new Date().toLocaleString()," ",err);
                            resolve(false);
                        }
                        else {
                            console.log(new Date().toLocaleString()," Removed the file " + localFilePath);
                            resolve(true);
                        }
                    })
                } else {
                    console.log(new Date().toLocaleString(),"\x1b[31m", " File uploading was unsuccessful");
                }
            }
        });
    })
}

const uploadDir = (directoryPath, bucketName) => {
    console.log(new Date().toLocaleString()," inside uploadDir function");
    configAWSregion();

    directoryWalkSync = (currentDirPath, callback) => {
        console.log(new Date().toLocaleString()," inside directoryWalksync currentdir :", currentDirPath)
        try {
            fs.readdirSync(currentDirPath).forEach(async (pathName) => {
                let filePath = path.join(currentDirPath, pathName);
                let fileStat = fs.statSync(filePath);
                if (fileStat.isFile()) {
                    let fileModifiedTime = fileStat.mtime;
                    let currentTime = new Date();
                    let diffBetweenCurrentAndModifiedTime = (currentTime - fileModifiedTime) / (1000 * 60 * 60 * 24);
                    if (diffBetweenCurrentAndModifiedTime > configTime.minTimePeriod) {
                        await callback(filePath);
                    }
                } else if (fileStat.isDirectory()) {
                    directoryWalkSync(filePath, callback);
                }
            });
        }
        catch (err) {
            if (err.code === "ENOENT")
                console.error(new Date().toLocaleString()," File not found check for path");
            else
                console.log(new Date().toLocaleString()," Error: ", err);
        }
    }

    directoryWalkSync(directoryPath, async (localFilePath) => {
        let bucketFilePath;
        if (localFilePath.startsWith("/"))
            bucketFilePath = localFilePath.slice(1);
        else
            bucketFilePath = localFilePath;
        let fileStream = await fs.createReadStream(localFilePath);
        let params = {
            Bucket: bucketName,
            Key: bucketFilePath,
	        StorageClass: "REDUCED_REDUNDANCY",
            Body: fileStream
        };
        await s3Upload(params, bucketFilePath, localFilePath, bucketName);
    });
};

module.exports = {
    configAWSregion,
    uploadDir,
    s3Upload
}
