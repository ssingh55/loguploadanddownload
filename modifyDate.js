let dateFormat = require('./config.json').download.dateFormat;

const modifyDate = (date) => {
    // dateFormat = "DD-MM-YY";
    // console.log(dateFormat);

    if (dateFormat === "YYYY-MM-DD") {
        console.log(date);
        return date;
    }
    else if (dateFormat === "DD-MM-YYYY") {
        let newDate = date.slice(6) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2);
        console.log(newDate);
        return newDate;
    } else if (dateFormat === "YY-MM-DD") {
        let newDate = "20" + date.slice(0, 2) + "-" + date.slice(3, 5) + "-" + date.slice(6);
        console.log(newDate);
        return newDate;
    } else if (dateFormat === "DD-MM-YY") {
        let newDate = "20" + date.slice(6) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2);
        console.log(newDate);
        return newDate;
    } else return false;
}

module.exports = {
    modifyDate
}

// modifyDate("18-01-21")