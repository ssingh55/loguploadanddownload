#!/bin/bash

if  ! which node >/dev/null
then 
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get update
sudo apt-get install nodejs -y
echo "Node has been installed."
sleep 5
fi
echo "Before executing make changes required in the configuration file";
echo "Enter the fileName with path u want to download";
read fileName
echo "Enter the start date in YYYY-MM-DD format"
read startDate
echo "Enter the end date in YYYY-MM-DD format"
read endDate

node downloadFile.js $fileName $startDate $endDate