This project is to upload and download the log files using node to aws S3

To run this project you should have nodejs and npm in your local machine

If you don't have then run the **install.sh** file 
>Run this it will install node and npm with all the dependencies required
```
./install.sh
```

Once node and dependencies are installed make sure to configure the **config.json** file
It contains the aws region, upload and download configurations

**To upload files to Amazon s3**

Change the config settings according to your need in the upload section

* Change the region by changing the region name in the config file
```
	"region": "region-name"
```
* Change the min time period before which you want to upload the file for example: here before 30 days file
```
"time": {"minTimePeriod": 30}
```
* Give the bucket name to which you want to upload the file
```
"bucketName": "Name-of-the-bucket" 
```
* Give the local directory or log files directory which you want to upload ( it must be in array separated by comma for multiple directories )
```
"directoryPathArrays": [ "log/access-log/", "log/error-log" ]
```
>After configuring to upload the files just run the **uploadScript.sh**
```
./uploadScript.sh
```
>**Note: Make sure you can access the directory which you entered from the current directory from which you are running the file**


**To download files from the Amazon S3 server**

Change the config settings according to your need in the download section

* Change the region by changing the region name in the config file
```
	"region": "region-name"
```
* Give the bucket name from which you want to download the file
```
"bucketName": "Name-of-the-bucket" 
```
* Give the download directory name to which you want to download the file
```
"downloadDirectory": "/home/exotel/Downloads" 
```
* Specify the date format on which you want to specify the start date and end date of the log files to be downloaded (By default: YYYY-MM-DD)
```
"dateFormat": "YYYY-MM-DD"
```
>After configuring to download the files just run the **downloadScript.sh**
```
./downloadScript.sh
```
>>After running the downloadScript some options will be asked

* First option it will asked for filename with path in the aws s3 bucket which you want to download
```
exotel/access-log/access.log
```
* Next option to specify the start date in YYYY-MM-DD format
```
2018-08-02
```
* Next option to specify the end date in YYYY-MM-DD format
```
2018-08-03
```

Once everything will be verified download of the file between the date range can be  done.


**To run the test cases**

* Install the dev dependencies packages by
```
npm install --only=dev
```

Make changes required u need to make in the test case and config.json file

>Run the command to run the test cases
```
npm run test
```
