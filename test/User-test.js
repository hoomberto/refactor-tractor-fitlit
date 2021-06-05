import {
  expect
} from 'chai';
import dayjs from 'dayjs';
import Sleep from '../src/Sleep';
import Activity from '../src/Activity';
import Hydration from '../src/Hydration';
import User from '../src/User';

describe('User', function() {
  let user, user2, sleep1, sleep2, sleep3, activity1, activity2, hydration1, hydration2, sleepArray, activityArray, hydrationArray;
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

    activity1 = new Activity({
      "userID": 2,
      "date": "2019/06/20",
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
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of user', function() {
    expect(user).to.be.an.instanceof(User);
  });

  it('should have an id', function() {
    expect(user.id).to.equal(1);
  });

  it('should have a name', function() {
    expect(user.name).to.equal('Luisa Hane');
  });

  it('should have an address', function() {
    expect(user.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
  });

  it('should have an email address', function() {
    expect(user.email).to.equal('Diana.Hayes1@hotmail.com');
  });

  it('should have a stride length', function() {
    expect(user.strideLength).to.equal(4.3);
  });

  it('should have a daily step goal', function() {
    expect(user.dailyStepGoal).to.equal(10000);
  });

  it('should have friends', function() {
    expect(user.friends).to.deep.equal([16, 4, 8])
  });

  it('should hold users sleep data', function() {
    expect(user.sleep).to.equal(sleepArray)
  });

  it('should hold users hydration data', function() {
    user.hydration = []
    expect(user.hydration.length).to.deep.equal(0)
  });

  it('should hold users activity data', function() {
    expect(user.activity).to.equal(activityArray)
  });

  it('getFirstName should return the first name of the user', function() {
    expect(user.getFirstName()).to.equal('LUISA');
  });

  it('should have method that returns how many fluid ounces they consumed for a specific day (identified by a date)', function() {
    user.hydration.push(hydration1, hydration2)
    expect(user.consumedWaterOnDay("2019/06/15")).to.equal(37)

  });
  it('should have method that returns average consumed ounces over week', function() {

    let data = [{
        "userID": 1,
        "date": "2019/06/15",
        "numOunces": 66
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "numOunces": 69
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "numOunces": 91
      },
      {
        "userID": 1,
        "date": "2019/06/18",
        "numOunces": 99
      },
      {
        "userID": 1,
        "date": "2019/06/19",
        "numOunces": 95
      },
      {
        "userID": 1,
        "date": "2019/06/20",
        "numOunces": 79
      },
      {
        "userID": 1,
        "date": "2019/06/21",
        "numOunces": 57
      },
      {
        "userID": 1,
        "date": "2019/06/22",
        "numOunces": 49
      },
      {
        "userID": 1,
        "date": "2019/06/23",
        "numOunces": 26
      },
      {
        "userID": 1,
        "date": "2019/06/24",
        "numOunces": 98
      },
      {
        "userID": 1,
        "date": "2019/06/25",
        "numOunces": 68
      },
      {
        "userID": 1,
        "date": "2019/06/26",
        "numOunces": 21
      }
    ]

    data.forEach(d => {
      user.hydration.push(new Hydration(d))
    });

    expect(user.consumedWaterOverWeek("2019/06/16").length).to.equal(7);
  });

  it('should have a method that returns average fluid oz consumption for all time for a user', function() {
    user.hydration.push(hydration1, hydration2)
    expect(user.hydration.length).to.deep.equal(2)
    expect(user.findTotalWaterConsumption()).to.equal(53);
  });

  it('should return sleep hours for specific day', () => {

    expect(user.gethoursSleptOnDay("2019/06/25")).to.equal(8)
  })

  it('should return hours slept for week', () => {

    expect(user2.getHoursSleptOverWeek("2019/06/25").length).to.equal(2)
  })

  it('should return sleep average hours for all day', () => {

    expect(user.hoursSleptAverageForAllDays()).to.equal(7)
  })

  it('should return sleep quality for specific day', () => {

    expect(user.getSleepQualityOnDay("2019/06/25")).to.equal(3)
  })

  it('should return sleep quality over the week', () => {
    expect(user.getSleepQualityOverWeek("2019/06/25").length).to.equal(2)
  })

  it('should return average sleep quality over the week', () => {
    expect(user.calculateAverageQualityByWeek("2019/06/25")).to.equal(3)
  })

  it('should return sleep quality average for all day', () => {

    expect(user.sleepQualityAverageForAllDays()).to.equal(3)
  })

  it('should get the miles a user has walked on a specific day', () => {

    expect(user.getMinutesActiveOnDay("2019/06/20")).to.equal(280)
  });

  it('should get the miles a user has walked on a specific day', () => {

    expect(user.getMilesWalkedOnDay("2019/06/20")).to.equal(2.3)
  });

  it('should get the miles a user has walked on a specific day', () => {

    expect(user.averageMinutesActiveByWeek("2019/06/20")).to.equal(280)
  });

  it('should get the stairs climbed on a given day', () => {

    expect(user.getStairsClimbedOnDate("2019/06/21")).to.equal(32)
  });

  it('should get the all the the days of user where they reached thier daily step goals', () => {

    expect(user2.allDaysGoalReached("2019/06/20").length).to.equal(1)
  })

  it('should get the miles a user has walked on a specific day', () => {

    expect(user2.userGoalReached("2019/06/20")).to.be.false;
    expect(user2.userGoalReached("2019/06/21")).to.be.true;
  })

  it('should get the highest stair count of user', () => {

    expect(user2.getStairsAllTimeHigh()).to.equal(32)
  })

});