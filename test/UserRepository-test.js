import {
  expect
} from 'chai';
import UserRepository from '../src/UserRepository';
import Sleep from '../src/Sleep';
import Activity from '../src/Activity';
import Hydration from '../src/Hydration';
import User from '../src/User';

describe('UserRepository', function() {
  let userRepo, users, user, user2, user3, sleep1, sleep2, sleep3, sleep4, activity1, activity2, hydration1, hydration2, sleepArray, sleepArray2, activityArray, hydrationArray;
  beforeEach(() => {

    sleep1 = new Sleep({
      "userID": 2,
      "date": "2019/06/25",
      "hoursSlept": 8,
      "sleepQuality": 3
    })

    sleep2 = new Sleep({
      "userID": 2,
      "date": "2019/06/26",
      "hoursSlept": 7,
      "sleepQuality": 3
    })

    sleep3 = new Sleep({
      "userID": 2,
      "date": "2019/07/26",
      "hoursSlept": 7,
      "sleepQuality": 3
    })

    sleep4 = new Sleep({
      "userID": 2,
      "date": "2019/06/25",
      "hoursSlept": 9,
      "sleepQuality": 3
    })

    activity1 = new Activity({
      "userID": 2,
      "date": "2019/06/21",
      "numSteps": 2856,
      "minutesActive": 280,
      "flightsOfStairs": 22
    })

    activity2 = new Activity({
      "userID": 2,
      "date": "2019/06/21",
      "numSteps": 5400,
      "minutesActive": 280,
      "flightsOfStairs": 32
    })

    hydration1 = new Hydration({
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 37
    })

    hydration2 = new Hydration({
      "userID": 1,
      "date": "2019/06/16",
      "numOunces": 69
    })

    sleepArray = [];
    sleepArray2 = [];
    hydrationArray = [];
    activityArray = [];

    sleepArray.push(sleep1, sleep2, sleep3)
    hydrationArray.push(hydration1, hydration2)
    activityArray.push(activity1, activity2)

    user = new User({
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
    }, sleepArray, hydrationArray, activityArray)

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
    }, sleepArray, hydrationArray, activityArray);

    users = [];
    users.push(user, user2)
    userRepo = new UserRepository(users)
  });

  it('should be a function', function() {

    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of user repository', function() {

    expect(userRepo).to.be.an.instanceof(UserRepository);
  });

  it('should hold an array of users', function() {

    expect(userRepo.users).to.deep.equal([user, user2]);
    expect(userRepo.users.length).to.equal(2);
  });

  it('getUser should return user object when given a user id', function() {

    expect(userRepo.getUser(2)).to.equal(user2);
  });

  it('should find best sleepers whose average sleep quality for a week is greater than 3', function() {

    expect(userRepo.getBestSleepers("2019/06/26").length).to.equal(2);
  });

  it('should find the top sleeper for a given date', function() {

    let newSleep = new Sleep({
      "userID": 2,
      "date": "2019/07/26",
      "hoursSlept": 7,
      "sleepQuality": 3
    })

    let newSleep2 = new Sleep({
      "userID": 2,
      "date": "2019/06/25",
      "hoursSlept": 9,
      "sleepQuality": 3
    })

    sleepArray2.push(newSleep, newSleep2)

    let newUser = new User({
      "id": 2,
      "name": "Nerdo Baggins",
      "address": "30086 asdfasdf",
      "email": "1@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
      "friends": [
        9,
        18,
        24,
        19
      ]
    }, sleepArray2, hydrationArray, activityArray);

    userRepo.users.push(newUser)

    expect(userRepo.getLongestSleepers("2019/06/25")).to.deep.equal({
      name: "Nerdo Baggins",
      hours: 9
    });
  });

  it('should return average stairs climbed on a given day', function() {

    expect(userRepo.getAverageStairsClimbedOnDay("2019/06/21")).to.equal(27)
  });

  it('should return average steps taken on a given day', function() {

    expect(userRepo.getAverageStepsTakenOnDay("2019/06/21")).to.equal(4128)
  });

  it('should return active minutes on a given day', function() {

    expect(userRepo.getAverageMinutesActiveOnDay("2019/06/21")).to.equal(280)
  });
});