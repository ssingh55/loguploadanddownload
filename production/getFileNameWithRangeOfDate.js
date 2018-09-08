getFileNameWithRangeOfDate = (origFileName, startDate, endDate) => {
    console.log('Date is verified');
    let newStartDate = new Date(startDate);
    let end = new Date(endDate);

    let arr = new Array();
    while (newStartDate <= end) {
        let fileDateFormat = newStartDate.toISOString().slice(0, 10).replace(/-/g, '');
        let newFileName = origFileName + '-' + fileDateFormat + ".gz";
        arr.push(newFileName);
        newStartDate.setDate(newStartDate.getDate() + 1);
    }
    return arr;
}

module.exports = {
    getFileNameWithRangeOfDate
}