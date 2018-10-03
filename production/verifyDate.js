let dateFormat = require('./config.json').download.dateFormat,
    moment = require('moment');

const verifyDate = (date) => {
    if (date.match(/[a-z]/ig) !== null) {
        console.log('contains alphabet character');
        return false;
    } else {
        if (moment(date, dateFormat, true).isValid()) {
            console.log('Date is verified');
            return true;
        }
        else {
            console.log("There some error with the specified date");
            return false;
        }
    }
}

module.exports = {
    verifyDate
}