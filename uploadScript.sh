#!/bin/bash

echo "Before executing make changes required in the configuration file";
SCRIPTPATH=$(dirname $0)
$SCRIPTPATH/node_modules/.bin/node $SCRIPTPATH/functionToCallUploadFileWithMutipleDirectories.js
