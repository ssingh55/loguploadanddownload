let dateFormat = require('./config.json').download.dateFormat,
    moment = require('moment');

const verifyDate = (date) => {
    if (date.match(/[a-z]/ig) !== null) {
        console.log('contains alphabet character');
        return false;
    } else {
        // if (dateFormat === "YYYY-MM-DD") {
        // if (date.slice(0, 4) >= 2018 && (date.slice(5, 7) <= 12 && date.slice(5, 7) > 0) && (date.slice(8) > 0 && date.slice(8) <= 31))
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

// verifyDate("2018-10-21")










        // }
        /*else if (dateFormat === "DD-MM-YYYY") {
            if (date.slice(0, 2) >= 2018 && (date.slice(3, 5) <= 12 && date.slice(3, 5) > 0) && (date.slice(6) > 0 && date.slice(6) <= 31))
                return true;
            else {
                console.log("No logs are available for that month");
                return false;
            }
        } else if (dateFormat === "YY-MM-DD") {
            if (date.slice(0, 2) >= 2018 && (date.slice(3, 5) <= 12 && date.slice(3, 5) > 0) && (date.slice() > 0 && date.slice() <= 31))
                return true;
            else {
                console.log("No logs are available for that month");
                return false;
            }
        } else if (dateFormat === "DD-MM-YY") {
            if (date.slice() >= 2018 && (date.slice() <= 12 && date.slice() > 0) && (date.slice() > 0 && date.slice() <= 31))
                return true;
            else {
                console.log("No logs are available for that month");
                return false;
            }
        } else return false;*/