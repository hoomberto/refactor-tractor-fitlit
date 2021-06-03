import { expect } from 'chai';

import Sleep from '../src/Sleep';
import User from '../src/User';

describe('Sleep', function() {
  let sleep1, sleep2, sleep3, user1, user2

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
    })
    
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

    sleep3 = new Sleep ({
      "userID":1,
      "date":"2019/06/16",
      "hoursSlept":4.1,
      "sleepQuality":3.8
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

  it.only('should calculate how many hours a user slept each day over the course of a week' , function () {
    let sleepArr = [sleep1, sleep3]
    
    let totalHours = sleep1.getHoursSleptOverWeek(sleepArr)

    expect(totalHours).to.equal(10.2)
  });

  it('should update user\'s slept hours record', function() {
      expect(user1.sleepHoursRecord.length).to.equal(2);
  });

  it('should update user\'s slept hours record', function() {
      expect(user2.sleepQualityRecord.length).to.equal(1);
  });

  it('should update user\'s slept hours average', function() {
      expect(user1.hoursSleptAverage).to.equal('7.7');
  });

  it('should update user\'s sleep quality average', function() {
      expect(user1.sleepQualityAverage).to.equal('1.8');
  });
});
