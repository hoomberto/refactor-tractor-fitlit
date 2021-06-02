import {
  expect
} from 'chai';

import Hydration from '../src/Hydration';
import UserRepository from '../src/UserRepository';
import User from '../src/User';

describe.only('Hydration', function() {
  let hydrate1;
  let hydrate2;

  beforeEach(() => {
    hydrate1 = new Hydration({
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 37
    });
    hydrate2 = new Hydration({
      "userID": 2,
      "date": "2019/06/15",
      "numOunces": 75
    })
  })
  it('should be a function', function() {
    expect(Hydration).to.be.a('function');
  });
  it('should be an instance of hydrate', function() {
    expect(hydrate1).to.be.an.instanceof(Hydration);
  });
  it('should have an id', function() {
    expect(hydrate2.userId).to.equal(2);
  });
  it('should have a date', function() {
    expect(hydrate3.date).to.equal('2019/06/16');
  });
  it('should have an amount of ounces drank', function() {
    expect(hydrate3.ounces).to.equal(91);
  });
});