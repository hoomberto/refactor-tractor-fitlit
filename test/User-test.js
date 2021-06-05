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
  it.skip('should have a daily step goal', function() {
    expect(user.dailyStepGoal).to.equal(10000);
  });
  it.skip('should have friends', function() {
    expect(user.friends).to.deep.equal([16, 4, 8])
  });
  it.skip('should have a default ouncesAverage of 0', function() {
    expect(user.ouncesAverage).to.equal(0);
  });
  it.skip('should have a default ouncesRecord of []', function() {
    expect(user.ouncesRecord).to.deep.equal([]);
  });
  it.skip('should have a default hoursSleptAverage of 0', function() {
    expect(user.hoursSleptAverage).to.equal(0);
  });
  it.skip('should have a default sleepQualityAverage of 0', function() {
    expect(user.sleepQualityAverage).to.equal(0);
  });
  it.skip('should have a default sleepHoursRecord of []', function() {
    expect(user.sleepHoursRecord).to.deep.equal([]);
  });
  it.skip('should have a default sleepQualityRecord of []', function() {
    expect(user.sleepQualityRecord).to.deep.equal([]);
  });
  it.skip('should have a default activityRecord of []', function() {
    expect(user.activityRecord).to.deep.equal([]);
  });
  it.skip('should have a default value of [] for accomplishedDays', function() {
    expect(user.accomplishedDays).to.deep.equal([]);
  });
  it.skip('should have a default value of [] for trendingStepDays', function() {
    expect(user.trendingStepDays).to.deep.equal([]);
  });
  it.skip('should have a default value of [] for trendingStairsDays', function() {
    expect(user.trendingStairsDays).to.deep.equal([]);
  });
  it('getFirstName should return the first name of the user', function() {
    expect(user.getFirstName()).to.equal('LUISA');
  });

  // describe('updateSleep', function() {
  //   beforeEach(() => {
  //     user.updateSleep("2019/06/15", 7, 4.7);
  //     user.updateSleep("2019/07/14", 6, 4);
  //     user.updateSleep("2019/08/04", 8, 5.4);
  //   })
  //   it('should update user\'s quality of sleep record', function() {
  //     expect(user.sleepQualityRecord.length).to.equal(3);
  //   });
  //   it('should update user\'s average hours of sleep', function() {
  //     expect(user.hoursSleptAverage).to.equal('7.0');
  //   });
  //   it('should update user\'s average quality of sleep', function() {
  //     expect(user.sleepQualityAverage).to.equal('4.7');
  //   });
  // })
  it('should calculate the average hours slept per day', function() {
    expect(user.getAverageSleepPerDay()).to.equal(7.5)
    //
    // let totalHours = sleep1.getHoursSleptOverWeek(sleepArr)
    //
    // expect(totalHours).to.equal(10.2)
  });


  it.skip('calculateAverageHoursThisWeek should calculate average sleep hours for week before given date', function() {
    user.sleepHoursRecord = [{
      date: "2019/09/22",
      hours: 9.6
    }, {
      date: "2019/09/21",
      hours: 8.2
    }, {
      date: "2019/09/20",
      hours: 9.9
    }, {
      date: "2019/09/19",
      hours: 4.2
    }, {
      date: "2019/09/18",
      hours: 9.5
    }, {
      date: "2019/09/17",
      hours: 7.8
    }, {
      date: "2019/09/16",
      hours: 10.2
    }, {
      date: "2019/09/15",
      hours: 5.7
    }, {
      date: "2019/09/14",
      hours: 8.8
    }, {
      date: "2019/09/13",
      hours: 4.6
    }, {
      date: "2019/09/12",
      hours: 5.3
    }];
    expect(user.calculateAverageHoursThisWeek('2019/09/21')).to.equal('7.9');
  });
  // it.only('calculateAverageQualityThisWeek should calculate average quality of sleep for week before a given date', function() {
  //   expect(user.calculateAverageQualityThisWeek('2019/06/25')).to.equal(3)
  // });
  it.skip('should have a method that return the highest climbing record', function() {
    user.activityRecord = [{
      flightsOfStairs: 10
    }, {
      flightsOfStairs: 15
    }, {
      flightsOfStairs: 17
    }]
    expect(user.findClimbingRecord()).to.equal(17)
  });
  it.skip('should have a method that calculates daily calories burned', function() {
    user.activityRecord = [{
      date: "2019/09/16",
      activityRecord: 78
    }, {
      date: "2019/09/17",
      minutesActive: 100
    }, {
      date: "2019/09/17",
      minutesActive: 20
    }];
    expect(user.calculateDailyCalories("2019/09/17")).to.equal(912)
  });
  it.skip('calculateAverageMinutesActiveThisWeek should calculate the average minutes active', function() {
    user.activityRecord = [{
      date: "2019/09/18",
      minutesActive: 78
    }, {
      date: "2019/09/17",
      minutesActive: 100
    }, {
      date: "2019/09/16",
      minutesActive: 20
    }, {
      date: "2019/09/15",
      minutesActive: 21
    }, {
      date: "2019/09/14",
      minutesActive: 35
    }, {
      date: "2019/09/13",
      minutesActive: 37
    }, {
      date: "2019/06/12",
      minutesActive: 42
    }, {
      date: "2019/09/11",
      minutesActive: 18
    }, {
      date: "2019/09/10",
      minutesActive: 16
    }, {
      date: "2019/09/09",
      minutesActive: 81
    }];
    expect(user.calculateAverageMinutesActiveThisWeek("2019/09/17")).to.equal('39')
  });
  it.skip('calculateAverageStepsThisWeek should calculate the average steps taken in a given week', function() {
    user.activityRecord = [{
      date: "2019/09/18",
      steps: 1178
    }, {
      date: "2019/09/17",
      steps: 1080
    }, {
      date: "2019/09/16",
      steps: 120
    }, {
      date: "2019/09/15",
      steps: 891
    }, {
      date: "2019/09/14",
      steps: 380
    }, {
      date: "2019/09/13",
      steps: 3234
    }, {
      date: "2019/06/12",
      steps: 1111
    }, {
      date: "2019/09/11",
      steps: 18
    }, {
      date: "2019/09/10",
      steps: 345
    }, {
      date: "2019/09/09",
      steps: 81
    }];
    expect(user.calculateAverageStepsThisWeek("2019/09/17")).to.equal('976')
  });
  it.skip('calculateAverageFlightsThisWeek should calculate the average flights of stairs taken in a given week', function() {
    user.activityRecord = [{
      date: "2019/09/18",
      flightsOfStairs: 4
    }, {
      date: "2019/09/17",
      flightsOfStairs: 6
    }, {
      date: "2019/09/16",
      flightsOfStairs: 1
    }, {
      date: "2019/09/15",
      flightsOfStairs: 2
    }, {
      date: "2019/09/14",
      flightsOfStairs: 12
    }, {
      date: "2019/09/13",
      flightsOfStairs: 21
    }, {
      date: "2019/06/12",
      flightsOfStairs: 3
    }, {
      date: "2019/09/11",
      flightsOfStairs: 14
    }, {
      date: "2019/09/10",
      flightsOfStairs: 2
    }, {
      date: "2019/09/09",
      flightsOfStairs: 8
    }];
    expect(user.calculateAverageFlightsThisWeek("2019/09/17")).to.equal('8.4')
  });

  it.skip('updateAccomplishedDays should create an array of good days', function() {
    user.updateActivities({
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 3684,
      "minutesActive": 140,
      "flightsOfStairs": 16
    });
    user.updateActivities({
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 14684,
      "minutesActive": 140,
      "flightsOfStairs": 16
    });
    expect(user.accomplishedDays.length).to.equal(1);
  })
  it.skip('findTrendingStepDays should find 3+ days with positive trend', function() {
    user.activityRecord = [{
        "date": "2019/06/29",
        "steps": 2
      },
      {
        "date": "2019/06/28",
        "steps": 1
      },
      {
        "date": "2019/06/27",
        "steps": 4
      },
      {
        "date": "2019/06/26",
        "steps": 3
      },
      {
        "date": "2019/06/25",
        "steps": 1
      },
      {
        "date": "2019/06/24",
        "steps": 12
      },
      {
        "date": "2019/06/23",
        "steps": 11
      },
      {
        "date": "2019/06/22",
        "steps": 10
      },
      {
        "date": "2019/06/21",
        "steps": 9
      },
      {
        "date": "2019/06/20",
        "steps": 8
      },
      {
        "date": "2019/06/19",
        "steps": 11
      },
      {
        "date": "2019/06/18",
        "steps": 10
      }
    ];
    user.findTrendingStepDays()
    expect(user.trendingStepDays).to.deep.equal(['Your most recent positive step streak was 2019/06/26 - 2019/06/29!', 'Your most recent positive step streak was 2019/06/21 - 2019/06/24!']);
  });
  it.skip('findTrendingStairsDays should find 3+ days with positive trend', function() {
    user.activityRecord = [{
        "date": "2019/06/29",
        "flightsOfStairs": 4
      },
      {
        "date": "2019/06/28",
        "flightsOfStairs": 1
      },
      {
        "date": "2019/06/27",
        "flightsOfStairs": 16
      },
      {
        "date": "2019/06/26",
        "flightsOfStairs": 15
      },
      {
        "date": "2019/06/25",
        "flightsOfStairs": 1
      },
      {
        "date": "2019/06/24",
        "flightsOfStairs": 9
      },
      {
        "date": "2019/06/23",
        "flightsOfStairs": 3
      },
      {
        "date": "2019/06/22",
        "flightsOfStairs": 10
      },
      {
        "date": "2019/06/21",
        "flightsOfStairs": 4
      },
      {
        "date": "2019/06/20",
        "flightsOfStairs": 3
      },
      {
        "date": "2019/06/19",
        "flightsOfStairs": 2
      },
      {
        "date": "2019/06/18",
        "flightsOfStairs": 1
      }
    ];
    user.findTrendingStairsDays()
    expect(user.trendingStairsDays).to.deep.equal(['Your most recent positive climbing streak was 2019/06/26 - 2019/06/29!', 'Your most recent positive climbing streak was 2019/06/19 - 2019/06/24!']);
  });
  // it('findFriendsNames should find the first names of friends', function() {
  //   let user2 = new User({
  //     'id': 16,
  //     'name': 'Ben Nist',
  //   })
  //   let user3 = new User({
  //     'id': 4,
  //     'name': 'John Firth',
  //   })
  //   let user4 = new User({
  //     'id': 8,
  //     'name': 'Nick Adams',
  //   })
  //   let users = [user2, user3, user4];
  //   user.findFriendsNames(users);
  //   expect(user.friendsNames).to.deep.equal(['BEN', 'JOHN', 'NICK']);
  // });
  it.skip('calculateTotalStepsThisWeek should add users steps for week', function() {
    user.activityRecord = [{
        "date": "2019/06/29",
        "steps": 2
      },
      {
        "date": "2019/06/28",
        "steps": 1
      },
      {
        "date": "2019/06/27",
        "steps": 4
      },
      {
        "date": "2019/06/26",
        "steps": 3
      },
      {
        "date": "2019/06/25",
        "steps": 1
      },
      {
        "date": "2019/06/24",
        "steps": 12
      },
      {
        "date": "2019/06/23",
        "steps": 11
      },
      {
        "date": "2019/06/22",
        "steps": 10
      },
      {
        "date": "2019/06/21",
        "steps": 9
      },
      {
        "date": "2019/06/20",
        "steps": 8
      },
      {
        "date": "2019/06/19",
        "steps": 11
      },
      {
        "date": "2019/06/18",
        "steps": 10
      }
    ];
    user.calculateTotalStepsThisWeek('2019/06/29');
    expect(user.totalStepsThisWeek).to.equal(34);
  });
  // it('findFriendsTotalStepsForWeek should find friends\' total steps', function() {
  //   let user2 = new User({
  //     'id': 16,
  //     'name': 'Ben Nist',
  //   })
  //   let user3 = new User({
  //     'id': 4,
  //     'name': 'John Firth',
  //   })
  //   let user4 = new User({
  //     'id': 8,
  //     'name': 'Nick Adams',
  //   })
  //   user2.activityRecord = [{
  //   "date": "2019/06/29", "steps": 25},
  //   {"date": "2019/06/28", "steps": 1},
  //   {"date": "2019/06/27", "steps": 43},
  //   {"date": "2019/06/26", "steps": 35},
  //   {"date": "2019/06/25", "steps": 1},
  //   {"date": "2019/06/24", "steps": 132},
  //   {"date": "2019/06/23", "steps": 11},
  //   {"date": "2019/06/22", "steps": 1025},
  //   {"date": "2019/06/21", "steps": 9},
  //   {"date": "2019/06/20", "steps": 85},
  //   {"date": "2019/06/19", "steps": 11},
  //   {"date": "2019/06/18", "steps": 10}];
  // user3.activityRecord = [{
  //   "date": "2019/06/29", "steps": 2},
  //   {"date": "2019/06/28", "steps": 21},
  //   {"date": "2019/06/27", "steps": 24},
  //   {"date": "2019/06/26", "steps": 23},
  //   {"date": "2019/06/25", "steps": 31},
  //   {"date": "2019/06/24", "steps": 512},
  //   {"date": "2019/06/23", "steps": 121},
  //   {"date": "2019/06/22", "steps": 120},
  //   {"date": "2019/06/21", "steps": 92},
  //   {"date": "2019/06/20", "steps": 82},
  //   {"date": "2019/06/19", "steps": 141},
  //   {"date": "2019/06/18", "steps": 10}];
  // user4.activityRecord = [{
  //   "date": "2019/06/29", "steps": 2},
  //   {"date": "2019/06/28", "steps": 1},
  //   {"date": "2019/06/27", "steps": 4},
  //   {"date": "2019/06/26", "steps": 3},
  //   {"date": "2019/06/25", "steps": 1},
  //   {"date": "2019/06/24", "steps": 12},
  //   {"date": "2019/06/23", "steps": 11},
  //   {"date": "2019/06/22", "steps": 10},
  //   {"date": "2019/06/21", "steps": 9},
  //   {"date": "2019/06/20", "steps": 8},
  //   {"date": "2019/06/19", "steps": 11},
  //   {"date": "2019/06/18", "steps": 10}];
  //   let users = [user2, user3, user4];
  //   user.findFriendsTotalStepsForWeek(users, '2019/06/29');
  //   expect(user.friendsActivityRecords).to.deep.equal([{"id": 4, "totalWeeklySteps": 734}, {"id": 16, "totalWeeklySteps": 248}, {"id": 8, "totalWeeklySteps": 34}]);
  // });

  it('should hold users hydration data', function() {
    user.hydration = []
    expect(user.hydration.length).to.deep.equal(0)
  });

  it('should have a method that returns average fluid oz consumption for all time for a user', function() {
    user.hydration.push(hydration, hydration1)
    expect(user.hydration.length).to.deep.equal(2)
    expect(user.findTotalWaterConsumption()).to.equal(53);
  });

  it('calculateAverageQualityThisWeek should calculate average quality of sleep for week before a given date', function() {
    expect(user.calculateAverageQualityThisWeek('2019/06/25')).to.equal(3)
  });

  it('should have method that returns how many fluid ounces they consumed for a specific day (identified by a date)', function() {
    user.hydration.push(hydration, hydration1)
    console.log(user.hydration)
    expect(user.findTotalWaterConsumptionDay("2019/06/15")).to.equal(37)
  })
  it('should have method that returns average consumed ounces over week', function() {
    // user.hydration.push(hydration, hydration1)


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
    })
    // user.hydration.push(data)

    expect(user.consumedWaterOverWeek("2019/06/16").length).to.equal(7);
  })

  it('should return hours slept by date', () => {

    expect(user.getHoursSleptByDay('2019/06/26')).to.equal(7);
  });

  it('should return sleep quality by date', () => {

    expect(user.getSleepQualityBydate('2019/06/26')).to.equal(3);
  });

  it('should calculate average hours sleep of all days', () => {

    expect(user.getAverageHoursSleepAllDays()).to.equal(7.5)
  })

  it('should calculate average quality of sleep of all days', () => {

    expect(user.getAverageQualitySleepAllDays()).to.equal(3)
  })

  it('should get the miles a user has walked on a specific day', () => {

    expect(user.getMilesWalkedOnDay("2019/06/20")).to.equal(2.3)
  })

  it('should get the miles a user has walked on a specific day', () => {

    expect(user.getMinutesActiveOnDay("2019/06/20")).to.equal(280)
  })

  it('should get the miles a user has walked on a specific day', () => {

    expect(user.averageMinutesActiveByWeek("2019/06/20")).to.equal(280)
  })

  it('should get the miles a user has walked on a specific day', () => {

    expect(user2.userGoalReached("2019/06/20")).to.be.false;
    expect(user2.userGoalReached("2019/06/21")).to.be.true;
  })

  it('should get the all the the days of user where they reached thier daily step goals', () => {

    expect(user2.allDaysGoalReached("2019/06/20").length).to.equal(1)
  })
  it('should get the highest stair count of user', () => {

    expect(user2.getAllTimeHigh()).to.equal(32)
  })
  it.only('should return sleep average hours for all day', () => {

    expect(user.hoursSleptAverageForAllDays()).to.equal(7)
  })
  it.only('should return sleep quality average for all day', () => {

    expect(user.sleepQualityAverageForAllDays()).to.equal(3)
  })
  it.only('should return sleep hours for specific day', () => {

    expect(user.gethoursSleptOnDay("2019/06/25")).to.equal(8)
  })
  it.only('should return sleep quality for specific day', () => {

    expect(user.getSleepQualityOnDay("2019/06/25")).to.equal(3)
  })

  it.only('should return hours slept for week', () => {

    expect(user2.getHoursSleptOverWeek("2019/06/25").length).to.equal(2)
  })
  it.only('should return sleep quality over the week', () => {
    expect(user.getSleepQualityOverWeek("2019/06/25").length).to.equal(2)
  })

  it.only('should return average sleep quality over the week', () => {
    expect(user.calculateAverageQualityByWeek("2019/06/25")).to.equal(3)
  })

});
