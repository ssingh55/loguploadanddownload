let dateFormat = require('./config.json').download.dateFormat,
    moment = require('moment');

const verifyDate = (date) => {
    if (date.match(/[a-z]/ig) !== null) {
        console.log('contains alphabet character');
        return false;
    } else {
        if (moment(date, dateFormat, true).isValid())
            return true;
        else {
            console.log("There some with the specified date");
            return false;
        }
    }
}

module.exports = {
    verifyDate
}