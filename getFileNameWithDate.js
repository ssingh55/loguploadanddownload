getFileNameWithRangeOfDate = (origFileName, startDate, endDate) => {
    console.log('Date is verified');
    let start = new Date(startDate); //YYYY-MM-DD
    let end = new Date(endDate); //YYYY-MM-DD

    let arr = new Array();
    let newStartDate = start;
    while (newStartDate <= end) {
        let fileDateFormat = newStartDate.toISOString().slice(0, 10).replace(/-/g, '');
        arr.push(origFileName + '-' + fileDateFormat + ".gz");
        newStartDate.setDate(newStartDate.getDate() + 1);
    }
    return arr;
}

module.exports = {
    getFileNameWithRangeOfDate
}