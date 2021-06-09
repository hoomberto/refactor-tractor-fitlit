import {
  expect
} from 'chai';

import Hydration from '../src/Hydration';

describe('Hydration', function() {
  let hydrate1;

  beforeEach(() => {
    hydrate1 = new Hydration({
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 37
    });
  });

  it('should be a function', function() {

    expect(Hydration).to.be.a('function');
  });

  it('should be an instance of hydrate', function() {

    expect(hydrate1).to.be.an.instanceof(Hydration);
  });

  it('should have an id', function() {

    expect(hydrate1.userId).to.equal(1);
  });

  it('should have a date', function() {

    expect(hydrate1.date).to.equal("2019/06/15");
  });

  it('should have an amount of ounces drank', function() {

    expect(hydrate1.numOunces).to.equal(37);
  });
});
