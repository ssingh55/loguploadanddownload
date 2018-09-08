const expect = require('chai').expect,
    verifyDate = require('../production/verifyDate').verifyDate;

xdescribe('test the date to be in correct format according to specified format', () => {
    it('should return false for alphanumeric character', () => {
        let expectedValue = false;
        let date = '2018-08-0a'
        expect(verifyDate(date)).equal(expectedValue)
    })
    it('should return the false for wrong date format', () => {
        let expectedValue = false;
        let date = '18-2008-01'
        expect(verifyDate(date)).equal(expectedValue)
    })
    it('should return the true for correct date format', () => {
        let expectedValue = true;
        let date = '2018-08-01'
        expect(verifyDate(date)).equal(expectedValue)
    })
})