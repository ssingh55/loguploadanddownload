#!/bin/bash

echo "Before executing make changes required in the configuration file";
echo "Enter the fileName with path u want to download";
read fileName
echo "Enter the start date in YYYY-MM-DD format"
read startDate
echo "Enter the end date in YYYY-MM-DD format"
read endDate

node functionExecutionDownloadFile.js $fileName $startDate $endDate