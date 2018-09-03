const exec = require('child_process').exec;
exec('aws s3 sync s3://testcli96146 .', (err, stdout, stderr) => { });