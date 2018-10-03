#!/bin/bash

set -e
if  ! which node >/dev/null
then 
curl -sL https://rpm.nodesource.com/setup_8.x | bash - 
yum install nodejs
echo "Node has been installed."
sleep 5
fi
npm install
