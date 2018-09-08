const expect = require('chai').expect,
    getFileNameWithRangeOfDate = require('../production/getFileNameWithRangeOfDate').getFileNameWithRangeOfDate;

xdescribe('test the folder name with date to be returned in correct format', () => {
    it('should return the filename in array', () => {
        let expectedValue = 'array',
            filename = 'exotel/access-log/access.log',
            startDate = '2018-08-01',
            endDate = '2018-08-03';

        expect(getFileNameWithRangeOfDate(filename, startDate, endDate)).to.be.a(expectedValue);
    })
    it('should return the array length greater than 0', () => {
        let expectedValue = 0,
            filename = 'exotel/access-log/access.log',
            startDate = '2018-08-01',
            endDate = '2018-08-03';

        expect(getFileNameWithRangeOfDate(filename, startDate, endDate)).length.to.be.greaterThan(expectedValue);
    })
    it('should return the filename with given date range', () => {
        let expectedValue = ['exotel/access-log/access.log-20180801.gz', 'exotel/access-log/access.log-20180802.gz', 'exotel/access-log/access.log-20180803.gz'],
            filename = 'exotel/access-log/access.log',
            startDate = '2018-08-01',
            endDate = '2018-08-03';

        expect(getFileNameWithRangeOfDate(filename, startDate, endDate)).deep.equal(expectedValue)
    })
})