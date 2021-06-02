import {
  expect
} from 'chai';

import Hydration from '../src/Hydration';
import UserRepository from '../src/UserRepository';
import User from '../src/User';

describe.only('Hydration', function() {
  let hydration;
  let user1;
  let user2;
  let userRepository;
  let hydrate1;
  let hydrate2;
  let hydrate3;

  beforeEach(() => {
    user1 = new User({
      'id': 1,
      'name': 'Luisa Hane',
      'address': '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      'email': 'Diana.Hayes1@hotmail.com',
      'strideLength': 4.3,
      'dailyStepGoal': 10000,
      'friends': [
        16,
        4,
        8
      ]
    });
    user2 = new User({
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
      "friends": [
        9,
        18,
        24,
        19
      ]
    });

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
    hydrate3 = new Hydration({
      "userID": 2,
      "date": "2019/06/16",
      "numOunces": 91
    })
    userRepository = new UserRepository();
    userRepository.users.push(user1, user2);
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