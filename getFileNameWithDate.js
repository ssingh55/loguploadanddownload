getFileNameWithDate = (origFileName, fileModifiedTime) => {
    // const currentDate = new Date();
    // let sliceDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');
    return origFileName + '-' + fileModifiedTime;
}

getFileNameWithRangeOfDate = (origFileName, startDate, endDate) => {
    // console.log(startDate);
    // console.log(endDate);
    var start = new Date(startDate); //YYYY-MM-DD
    var end = new Date(endDate); //YYYY-MM-DD

    var arr = new Array();
    var newStartDate = start;
    while (newStartDate <= end) {
        let fileDateFormat = newStartDate.toISOString().slice(0, 10).replace(/-/g, '');
        arr.push(origFileName + '-' + fileDateFormat);
        newStartDate.setDate(newStartDate.getDate() + 1);
    }
    return arr;
}

module.exports = {
    getFileNameWithDate,
    getFileNameWithRangeOfDate
}

// var dateArr = getFileNameWithRangeOfDate('package.json', '2018-08-01', '2018-09-01');

// // Output
// for (var i = 0; i < dateArr.length; i++) {
//     console.log(dateArr[i])
// }

// getFileNameWithDate(fileName);
console.log(getFileNameWithDate('package.json', '20180819'));
/*
fs.stat(fileName, (err, stats) => {
    if (err) return console.log(err);
    var fileInfo = { fileDate: stats.birthtime, fileName }
    console.log(fileInfo);
})
*/
