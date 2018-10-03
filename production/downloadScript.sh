#!/bin/bash

set -e
echo "Before executing make changes required in the configuration file";
echo "Enter the fileName with full path u want to download without bucket name";
read fileName
echo "Enter the start date in YYYY-MM-DD format"
read startDate
echo "Enter the end date in YYYY-MM-DD format"
read endDate

node functionToCallDownloadFile.js $fileName $startDate $endDate
