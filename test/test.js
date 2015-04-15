require('./prepare-test');

var distage = require('../lib');
var testImage = './test/test.jpg';

describe('Gets the age of an image', function() {
  it('Image was taken 1 hour ago', function(done) {
    var date = new Date('2015-04-14 10:12:53');
    distage.parse(testImage, date, function(err, response) {
      if (response.age.h === 1) {
        done();
      }
    });
  });
  it('Image was taken 25 hours ago', function(done) {
    var date = new Date('2015-04-15 10:12:53');
    distage.parse(testImage, date, function(err, response) {
      if (response.age.h === 25) {
        done();
      }
    });
  });
  it('Image was taken 25 hours and 59 minutes ago', function(done) {
    var date = new Date('2015-04-15 11:11:53');
    distage.parse(testImage, date, function(err, response) {
      if (response.age.h === 25 && response.age.m === 59) {
        done();
      }
    });
  });
  it('Image was taken 25 hours, 59 minutes and 59 seconds ago', function(done) {
    var date = new Date('2015-04-15 11:12:52');
    distage.parse(testImage, date, function(err, response) {
      if (response.age.h === 25 && response.age.m === 59 && response.age.s === 59) {
        done();
      }
    });
  });
});

describe('Gets the distance between where an image was taken and a lat/lon position', function() {
  it('Image was taken 1km (1000m) far away from a fake spot', function(done) {
    var fakePoint = getPointAtDistance(19.003725787037036, 99.00135592592591, 90, 1000);
    distage.parse(testImage, fakePoint, function(err, response) {
      if (response.distance === 1000) {
        done();
      }
    });
  });
  it('Image was taken 5849km (5849000m) far away from a fake spot', function(done) {
    var fakePoint = getPointAtDistance(19.003725787037036, 99.00135592592591, 90, 5849);
    distage.parse(testImage, fakePoint, function(err, response) {
      if (response.distance === 5849) {
        done();
      }
    });
  });
});

describe('Gets the age and distance of an image', function() {
  it('Was taken 1 hour ago and was 1000km far away', function(done) {
    var date = new Date('2015-04-14 10:12:53');
    var fakePoint = getPointAtDistance(19.003725787037036, 99.00135592592591, 90, 1000000);
    distage.parse(testImage, date, fakePoint, function(err, response) {
      console.log(response);
      if (response.age.h === 1 && response.distance === 1000000) {
        done();
      }
    });
  });
  it('Was taken 54 hours ago and was 5400km far away', function(done) {
    var date = new Date('2015-04-16 15:12:53');
    var fakePoint = getPointAtDistance(19.003725787037036, 99.00135592592591, 90, 5400000);
    distage.parse(testImage, fakePoint, date, function(err, response) {
      if (response.age.h === 54 && response.distance === 5400000) {
        done();
      }
    });
  });
});