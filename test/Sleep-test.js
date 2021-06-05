import {
  expect
} from 'chai';

import Sleep from '../src/Sleep';
import User from '../src/User';

describe('Sleep', function() {
  let sleep1, sleep2
  beforeEach(() => {

    sleep1 = new Sleep({
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    });

    sleep2 = new Sleep({
      "userID": 2,
      "date": "2019/06/25",
      "hoursSlept": 7.3,
      "sleepQuality": 3.2
    });

  });

  it('should be a function', function() {
    expect(Sleep).to.be.a('function');
  });

  it('should be an instance of activity', function() {
    expect(sleep1).to.be.an.instanceof(Sleep);
  });

  it('should hold a userId', function() {
    expect(sleep2.userID).to.equal(2);
  });

  it('should hold a date', function() {
    expect(sleep2.date).to.equal("2019/06/25");
  });

  it('should hold hours slept', function() {
    expect(sleep1.hoursSlept).to.equal(6.1);
  });

  it('should hold sleep quality', function() {
    expect(sleep2.sleepQuality).to.equal(3.2);
  });
});