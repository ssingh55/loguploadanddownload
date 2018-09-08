const expect = require('chai').expect,
    config = require('../production/config.json'),
    configUpload = config.upload,
    configDownload = config.download;

describe('test the config parameters for region are not empty and correct', () => {
    it('should return the region ok and type as string', () => {
        let configRegion = 'us-east-2';
        expect(configRegion).to.be.ok.and
            .to.be.a('string');
    })
})

xdescribe('test the config parameters for upload', () => {
    it('should return time period greater than equal to zero and it should be number', () => {
        let minTimePeriod = configUpload.time.minTimePeriod;
        expect(minTimePeriod).to.be.gte(0);
        expect(minTimePeriod).to.be.a('number')
    })
    it('should return the bucket name and type should be string', () => {
        let bucketName = configUpload.bucketDetails.bucketName;
        expect(bucketName).to.be.ok;
        expect(bucketName).to.be.a('string');
    })
    it('should return the directory path as array', () => {
        let directoryArray = configUpload.localDirectoriesPathDetails.directoryPathArrays;
        expect(directoryArray).to.be.ok;
        expect(directoryArray).to.be.a('array');
    })
    it('should return the directory path array element as string with /', () => {
        let directoryArray = configUpload.localDirectoriesPathDetails.directoryPathArrays;
        directoryArray.forEach((directory) => {
            expect(directory).to.be.ok;
            expect(directory).to.be.a('string');
            expect(directory).to.contain('/');
        })
    })
})

xdescribe('test the config parameters for Download', () => {
    it('should return the bucket name and type should be string', () => {
        let bucketName = configDownload.bucketDetails.bucketName;
        expect(bucketName).to.be.ok;
        expect(bucketName).to.be.a('string');
    })
    it('should return the directory path array element as string with /', () => {
        let directory = configDownload.downloadDirectory;
        expect(directory).to.be.ok;
        expect(directory).to.be.a('string');
        expect(directory).to.contain('/');
    })
    it('should return the dateformat to be YYYY-MM-DD', () => {
        let dateformat = configDownload.dateFormat;
        expect(dateformat).to.be.ok;
        expect(dateformat).equal('YYYY-MM-DD');
    })
})