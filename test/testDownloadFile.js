let chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    downloadFileModule = require('../production/downloadFile'),
    downloadFile = downloadFileModule.downloadFile,
    s3Download = downloadFileModule.s3Download;

describe('check the files are being downloaded or not', () => {
    beforeEach(() => {
        spy = sinon.spy(console, 'log');
    });

    afterEach(() => {
        sinon.restore();
    });
    xit('should return error to enter the filename for not inputing the file key name', () => {
        let bucketName = "testcli96146";
        let fileKeyName = undefined,
            startDate = '2018-08-01',
            endDate = '2018-08-02',
            downloadDirectory = '/home/exotel/Downloads'
        // let expectedValue = 'please enter the file name with path in the script';
        let returnvalue = downloadFile(bucketName, fileKeyName, startDate, endDate, downloadDirectory);
        // expect(spy.calledWith(expectedValue)).to.be.ok;
        expect(returnvalue).equal(undefined);
    })
    xit('should return error for not inputing the startdate', () => {
        let bucketName = "testcli96146";
        let fileKeyName = '/test',
            startDate = undefined,
            endDate = '2018-08-02',
            downloadDirectory = '/home/exotel/Downloads'
        // let expectedValue = '"please enter the startdate in the script';
        let returnvalue = downloadFile(bucketName, fileKeyName, startDate, endDate, downloadDirectory);
        expect(returnvalue).equal(undefined);
        // expect(spy.calledWith(expectedValue)).to.be.ok;
    })
    xit('should return error for not inputing the enddate', () => {
        let bucketName = "testcli96146";
        let fileKeyName = '/test',
            startDate = '2018-08-01',
            endDate = undefined,
            downloadDirectory = '/home/exotel/Downloads'
        // let expectedValue = 'please enter the enddate in the script';
        let returnvalue = downloadFile(bucketName, fileKeyName, startDate, endDate, downloadDirectory);
        // expect(spy.calledWith(expectedValue)).to.be.ok;
        expect(returnvalue).equal(undefined);
    })

    xit('should return undefined inputing the empty file key name', () => {
        let bucketName = "testcli96146";
        let fileKeyName = "      ",
            startDate = '2018-08-01',
            endDate = '2018-08-02',
            downloadDirectory = '/home/exotel/Downloads'
        // let expectedValue = 'please enter the file name with path in the script';
        let returnvalue = downloadFile(bucketName, fileKeyName, startDate, endDate, downloadDirectory);
        // expect(spy.calledWith(expectedValue)).to.be.ok;
        expect(returnvalue).equal(undefined);
    })
    xit('should return undefined for inputing the empty startdate', () => {
        let bucketName = "testcli96146";
        let fileKeyName = '/test',
            startDate = "         ",
            endDate = '2018-08-02',
            downloadDirectory = '/home/exotel/Downloads'
        // let expectedValue = '"please enter the startdate in the script';
        let returnvalue = downloadFile(bucketName, fileKeyName, startDate, endDate, downloadDirectory);
        expect(returnvalue).equal(undefined);
        // expect(spy.calledWith(expectedValue)).to.be.ok;
    })
    xit('should return undefined for inputing the empty enddate', () => {
        let bucketName = "testcli96146";
        let fileKeyName = '/test',
            startDate = '2018-08-01',
            endDate = "       ",
            downloadDirectory = '/home/exotel/Downloads'
        // let expectedValue = 'please enter the enddate in the script';
        let returnvalue = downloadFile(bucketName, fileKeyName, startDate, endDate, downloadDirectory);
        // expect(spy.calledWith(expectedValue)).to.be.ok;
        expect(returnvalue).equal(undefined);
    })


    xit('should return date verified start date is less than end date', () => {
        let bucketName = "testcli96146",
            fileKeyName = '/test',
            startDate = '2018-08-01',
            endDate = '2018-08-02',
            downloadDirectory = '/home/exotel/Downloads',
            expectedValue = 'Date is verified';
        downloadFile(bucketName, fileKeyName, startDate, endDate, downloadDirectory);
        expect(spy.calledWith(expectedValue)).to.be.ok;
    })
    xit('should return error msg with start date should be less than end date', () => {
        let bucketName = "testcli96146",
            fileKeyName = '/test',
            startDate = '2018-08-02',
            endDate = '2018-08-01',
            downloadDirectory = '/home/exotel/Downloads',
            expectedValue = 'Start date should be less than end date';
        downloadFile(bucketName, fileKeyName, startDate, endDate, downloadDirectory);
        expect(spy.calledWith(expectedValue)).to.be.ok;
    })
    xit('should return skipping filename for file exists', () => {
        let bucketName = "testcli96146",
            fileKeyName = '/test',
            startDate = '2018-08-01',
            endDate = '2018-08-01',
            downloadDirectory = '/home/exotel/Downloads',
            expectedValue = 'Skipping: /test-20180801.gz';
        downloadFile(bucketName, fileKeyName, startDate, endDate, downloadDirectory);
        expect(spy.calledWith(expectedValue)).to.be.ok;
    })
    xit('should return retrieving filename', () => {
        let bucketName = "testcli96146",
            fileKeyName = '/test.log',
            startDate = '2018-08-02',
            endDate = '2018-08-02',
            downloadDirectory = '/home/exotel/Downloads',
            expectedValue = 'Retrieving: /test.log-20180802.gz';
        downloadFile(bucketName, fileKeyName, startDate, endDate, downloadDirectory);
        expect(spy.calledWith(expectedValue)).to.be.ok;
    })
    xit('should return no bucket found', async () => {
        let bucketName = "testcli9614",
            fileName = '/testuploadfolderdata/access.logs-20180801.gz',
            downloadDirectory = '/home/exotel/Downloads',
            expectedValue = 'No such bucket found';
        await s3Download(fileName, downloadDirectory, bucketName);
        expect(spy.calledWith(expectedValue)).to.be.ok;
    })
    xit('should return removed the file message', async () => {
        let bucketName = "testcli9614",
            fileName = '/testuploadfolderdata/access.logs-20180801.gz',
            downloadDirectory = '/home/exotel/Downloads',
            expectedValue = "Removed the file /testuploadfolderdata/access.logs-20180801.gz";
        await s3Download(fileName, downloadDirectory, bucketName);
        expect(spy.calledWith(expectedValue)).to.be.ok;
    })
    xit('should return no such key found', async () => {
        let bucketName = "testcli96146",
            fileName = '/testuploadfolderdata/access.logs-20180801.gz',
            downloadDirectory = '/home/exotel/Downloads',
            expectedValue = "No Such Key found or Stream Content Length Mismatch";
        await s3Download(fileName, downloadDirectory, bucketName);
        expect(spy.calledWith(expectedValue)).to.be.ok;
    })
    xit('should return successfully got the object', async () => {
        let bucketName = "testcli96146",
            fileName = 'testuploadfolderdata/exotel/access-log/access.log-20180801.gz',
            downloadDirectory = '/home/exotel/Downloads',
            expectedValue = "Successfully got the object";
        await s3Download(fileName, downloadDirectory, bucketName);
        expect(spy.calledWith(expectedValue)).to.be.ok;
    })
})