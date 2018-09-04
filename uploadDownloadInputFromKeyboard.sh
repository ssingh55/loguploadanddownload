#!/bin/bash

# if  which node >/dev/null
# then 
# echo "node is installed"
# else
# echo "Installing Node ..."
# curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
# sudo apt-get install nodejs -y
# echo "Node has been installed."
# sleep 5
# fi
echo "Before executing make changes required in the configuration file";
echo "Press 1 to upload and 2 to download";
read inputFromKeyboard
if [ $inputFromKeyboard == 1 ]
then
    node uploadFolder.js
elif [ $inputFromKeyboard == 2 ]
then
    node downloadFile.js
else
    echo "Please give correct input";
fi