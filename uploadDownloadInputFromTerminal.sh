#!/bin/bash

echo "Before executing make changes required in the configuration file";
echo "Press 1 to upload and 2 to download"; 
if [ $1 == 1 ]
then
    node uploadFolder.js
elif [ $1 == 2 ]
then
    node downloadFile.js
else
    echo "Please give correct input";
fi