import {
  expect
} from 'chai';
import UserRepository from '../src/UserRepository';
import dayjs from 'dayjs';
import Sleep from '../src/Sleep';
import Activity from '../src/Activity';
import Hydration from '../src/Hydration';
import User from '../src/User';

describe('UserRepository', function() {
  let user, user2, sleep1, sleep2, activity1, activity2, hydration1, hydration2, sleepArray, activityArray, hydrationArray, userRepository, userData;
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
    hydrationArray = [];
    activityArray = [];
    userData = []

    sleepArray.push(sleep1, sleep2)
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
    userData.push(user, user2)
    userRepository = new UserRepository(userData);
  });

  it.only('should return average stairs climbed on that day', function() {

    expect(userRepository.getAverageStairsClimbedOnDay('2019/06/21')).to.equal(27)
  })
  it.only('should return average steps taken on that day', function() {

    expect(userRepository.getAverageStepsTakenOnDay('2019/06/21')).to.equal(4128)
  })
  it.only('should return average minutes active on that day', function() {

    expect(userRepository.getAverageMinutesActiveOnDay('2019/06/21')).to.equal(280)
  })

});
// userData = [user, user2]
// userRepository.users.push(user1, user2, user3);

// it('should be a function', function() {
//   expect(UserRepository).to.be.a('function');
// });
// it('should be an instance of user repository', function() {
//   expect(userRepository).to.be.an.instanceof(UserRepository);
// });
// it('should hold an array of users', function() {
//   expect(userRepository.users).to.deep.equal([user1, user2, user3]);
//   expect(userRepository.users.length).to.equal(3);
// });
// it('getUser should return user object when given a user id', function() {
//   expect(userRepository.getUser(2)).to.equal(user2);
// })
// it('calculateAverageStepGoal should return average step goal for all users', function() {
//   expect(userRepository.calculateAverageStepGoal()).to.equal(10000);
// })
// it('calculateAverageSleepQuality should return average sleep quality for all users', function() {
//   user1.sleepQualityAverage = 3.3;
//   user2.sleepQualityAverage = 5;
//   user3.sleepQualityAverage = 1;
//   expect(userRepository.calculateAverageSleepQuality()).to.equal(3.1);
// });
// it('should have a method that calculates friends average ounces of water', function() {
//   user1.ouncesRecord = [
//     {"2019/06/15": 1},
//     {"2019/06/15": 1},
//     {"2019/06/16": 5}
//   ]
//   user2.ouncesRecord = [
//     {"2019/06/15": 1},
//     {"2019/06/15": 1},
//     {"2019/06/16": 8}
//   ]
//   user3.ouncesRecord = [
//     {"2019/06/15": 1},
//     {"2019/06/15": 1},
//     {"2019/06/16": 4}
//   ]
//   expect(userRepository.calculateAverageDailyWater("2019/06/16")).to.equal(5)
// });
// it('should have a method that finds the best sleepers', function() {
//   sleep1 = new Sleep({
//     "userID": 1,
//     "date": "2019/06/16",
//     "hoursSlept": 6.1,
//     "sleepQuality": 1000
//   }, userRepository);
//   sleep2 = new Sleep({
//     "userID": 2,
//     "date": "2019/06/15",
//     "hoursSlept": 7.3,
//     "sleepQuality": 500
//   }, userRepository);
//   sleep3 = new Sleep({
//     "userID": 3,
//     "date": "2019/06/15",
//     "hoursSlept": 9.3,
//     "sleepQuality": 1.4
//   }, userRepository);
//   expect(userRepository.findBestSleepers("2019/06/16")).to.deep.equal([user1, user2]);
// });
// it('should have a method that finds the longest sleepers', function() {
//   sleepData = [{
//     "userID": 1,
//     "date": "2019/06/15",
//     "hoursSlept": 6.1,
//     "sleepQuality": 100
//   }, {
//     "userID": 2,
//     "date": "2019/06/15",
//     "hoursSlept": 7.3,
//     "sleepQuality": 1500
//   }, {
//     "userID": 3,
//     "date": "2019/06/15",
//     "hoursSlept": 9.3,
//     "sleepQuality": 1.4
//   }];
//   expect(userRepository.getLongestSleepers("2019/06/15")).to.equal(3);
// });
// it('should have a method that finds the worst sleepers', function() {
//   sleepData = [{
//     "userID": 1,
//     "date": "2019/06/15",
//     "hoursSlept": 6.1,
//     "sleepQuality": 1000
//   }, {
//     "userID": 2,
//     "date": "2019/06/15",
//     "hoursSlept": 7.3,
//     "sleepQuality": 500
//   }, {
//     "userID": 3,
//     "date": "2019/06/15",
//     "hoursSlept": 9.3,
//     "sleepQuality": 1.4
//   }];
//   expect(userRepository.getWorstSleepers("2019/06/15")).to.equal(1);
// });
// it('should have a method that calculates average number of stairs for users', function() {
//   user1.activityRecord = [{date: "2019/09/17", flightsOfStairs: 10}, {date: "2019/09/17", flightsOfStairs: 15}];
//   user2.activityRecord = [{date: "2019/09/16", flightsOfStairs: 8}, {date: "2019/09/17", flightsOfStairs: 4}];
//   expect(userRepository.calculateAverageStairs("2019/09/17")).to.equal(10);
// })
// it('should have a method that calculates average number of steps for users', function() {
//   user1.activityRecord = [{date: "2019/09/17", steps: 100}, {date: "2019/09/17", steps: 2000}];
//   user2.activityRecord = [{date: "2019/09/16", steps: 9820}, {date: "2019/09/17", steps: 234}];
//   expect(userRepository.calculateAverageSteps("2019/09/17")).to.equal(778);
// })
// it('should have a method that calculates average number of active minutes for users', function() {
//   user1.activityRecord = [{date: "2019/09/17", minutesActive: 100}, {date: "2019/09/17", minutesActive: 20}];
//   user2.activityRecord = [{date: "2019/09/16", minutesActive: 78}, {date: "2019/09/17", minutesActive: 12}];
//   expect(userRepository.calculateAverageMinutesActive("2019/09/17")).to.equal(44);

//
// it.only('should return average stairs climbed on that day', function() {
//
//   expect(userRepository.getAverageStepsTakenOnDay('2019/06/21')).to.equal(13656)
// })
// })