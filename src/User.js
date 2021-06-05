import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear'
// var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)
class User {
  constructor(user, sleep, hydration, activity) {
    this.id = user.id;
    this.name = user.name;
    this.address = user.address;
    this.email = user.email;
    this.strideLength = user.strideLength;
    this.dailyStepGoal = user.dailyStepGoal;
    this.friends = user.friends;
    this.sleep = sleep;
    this.hydration = [];
    this.activity = activity;
    // this.totalStepsThisWeek = 0;
    // this.ouncesAverage = 0;
    // this.ouncesRecord = [];
    // this.hoursSleptAverage = 0;
    // this.sleepQualityAverage = 0;
    // this.sleepHoursRecord = [];
    // this.sleepQualityRecord = [];
    // this.activityRecord = [];
    // this.accomplishedDays = [];
    // this.trendingStepDays = [];
    // this.trendingStairsDays = [];
    // this.friendsNames = [];
    // this.friendsActivityRecords = []
  }

  //   For a user (identified by their userID - this is the same for all methods requiring a specific user’s data), the average fluid ounces consumed per day for all time
  // For a user, how many fluid ounces they consumed for a specific day (identified by a date)
  // For a user, how many fluid ounces of water consumed each day over the course of a week (7 days) - return the amount for each day
  // You have to decide which classes should contain each method. Think about whose responsibility it is to own the method.
  //

  getFirstName() {
    var name = this.name.split(' ');
    return name[0].toUpperCase();
  }

  // updateHydration(date, amount) {
  //   this.ouncesRecord.unshift({[date]: amount});
  //   if (this.ouncesRecord.length) {
  //     this.ouncesAverage = Math.round((amount + (this.ouncesAverage * (this.ouncesRecord.length - 1))) / this.ouncesRecord.length);
  //   } else {
  //     this.ouncesAverage = amount;
  //   }
  // }
  // addDailyOunces(date) {
  //   // console.log('every date',date)
  //   // console.log('array of record Ounces',this.ouncesRecord)
  //   return this.ouncesRecord.reduce((sum, record) => {
  //     let amount = record[date];
  //     if (amount) {
  //       sum += amount
  //     }
  //     // console.log('record num',sum)
  //     return sum
  //   }, 0)
  // }
  //
  // updateSleep(date, hours, quality) {
  //   this.sleepHoursRecord.unshift({
  //     'date': date,
  //     'hours': hours
  //   });
  //   this.sleepQualityRecord.unshift({
  //     'date': date,
  //     'quality': quality
  //   });
  //   if(this.sleepHoursRecord.length) {
  //     this.hoursSleptAverage = ((hours + (this.hoursSleptAverage * (this.sleepHoursRecord.length - 1))) / this.sleepHoursRecord.length).toFixed(1);
  //   } else {
  //     this.hoursSleptAverage = hours;
  //   }
  //   if (this.sleepQualityRecord.length) {
  //     this.sleepQualityAverage = ((quality + (this.sleepQualityAverage * (this.sleepQualityRecord.length - 1))) / this.sleepQualityRecord.length).toFixed(1);
  //   } else {
  //     this.sleepQualityAverage = quality;
  //   }
  // }
  // calculateAverageHoursThisWeek(todayDate) {
  //   return (this.sleepHoursRecord.reduce((sum, sleepAct) => {
  //     let index = this.sleepHoursRecord.indexOf(this.sleepHoursRecord.find(sleep => sleep.date === todayDate));
  //     if (index <= this.sleepHoursRecord.indexOf(sleepAct) && this.sleepHoursRecord.indexOf(sleepAct) <= (index + 6)) {
  //       sum += sleepAct.hours;
  //     }
  //     return sum;
  //   }, 0) / 7).toFixed(1);
  // }
  // calculateAverageQualityThisWeek(todayDate) {
  //   return (this.sleepQualityRecord.reduce((sum, sleepAct) => {
  //     let index = this.sleepQualityRecord.indexOf(this.sleepQualityRecord.find(sleep => sleep.date === todayDate));
  //     if (index <= this.sleepQualityRecord.indexOf(sleepAct) && this.sleepQualityRecord.indexOf(sleepAct) <= (index + 6)) {
  //       sum += sleepAct.quality;
  //     }
  //     return sum;
  //   }, 0) / 7).toFixed(1);
  // }
  // updateActivities(activity) {
  //   this.activityRecord.unshift(activity);
  //   if (activity.numSteps >= this.dailyStepGoal) {
  //     this.accomplishedDays.unshift(activity.date);
  //   }
  // }
  // findClimbingRecord() {
  //   return this.activityRecord.sort((a, b) => {
  //     return b.flightsOfStairs - a.flightsOfStairs;
  //   })[0].flightsOfStairs;
  // }
  // calculateDailyCalories(date) {
  //   let totalMinutes = this.activityRecord.filter(activity => {
  //     return activity.date === date
  //   }).reduce((sumMinutes, activity) => {
  //     return sumMinutes += activity.minutesActive
  //   }, 0);
  //   return Math.round(totalMinutes * 7.6);
  // }
  // calculateAverageMinutesActiveThisWeek(todayDate) {
  //   return (this.activityRecord.reduce((sum, activity) => {
  //     let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
  //     if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
  //       sum += activity.minutesActive;
  //     }
  //     return sum;
  //   }, 0) / 7).toFixed(0);
  // }
  // calculateAverageStepsThisWeek(todayDate) {
  //   return (this.activityRecord.reduce((sum, activity) => {
  //     let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
  //     if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
  //       sum += activity.steps;
  //     }
  //     return sum;
  //   }, 0) / 7).toFixed(0);
  // }
  // calculateAverageFlightsThisWeek(todayDate) {
  //   return (this.activityRecord.reduce((sum, activity) => {
  //     let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
  //     if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
  //       sum += activity.flightsOfStairs;
  //     }
  //     return sum;
  //   }, 0) / 7).toFixed(1);
  // }
  // findTrendingStepDays() {
  //   let positiveDays = [];
  //   for (var i = 0; i < this.activityRecord.length; i++) {
  //     if (this.activityRecord[i + 1] && this.activityRecord[i].steps > this.activityRecord[i + 1].steps) {
  //       positiveDays.unshift(this.activityRecord[i].date);
  //     } else if (positiveDays.length > 2) {
  //       this.trendingStepDays.push(`Your most recent positive step streak was ${positiveDays[0]} - ${positiveDays[positiveDays.length - 1]}!`);
  //       positiveDays = [];
  //     }
  //   }
  // }
  // findTrendingStairsDays() {
  //   let positiveDays = [];
  //   for (var i = 0; i < this.activityRecord.length; i++) {
  //     if (this.activityRecord[i + 1] && this.activityRecord[i].flightsOfStairs > this.activityRecord[i + 1].flightsOfStairs) {
  //       positiveDays.unshift(this.activityRecord[i].date);
  //     } else if (positiveDays.length > 2) {
  //       this.trendingStairsDays.push(`Your most recent positive climbing streak was ${positiveDays[0]} - ${positiveDays[positiveDays.length - 1]}!`);
  //       positiveDays = [];
  //     }
  //   }
  // }
  // findFriendsNames(users) {
  //   this.friends.forEach(friend => {
  //     this.friendsNames.push(users.find(user => user.id === friend).getFirstName());
  //   })
  // }
  // calculateTotalStepsThisWeek(todayDate) {
  //   this.totalStepsThisWeek = (this.activityRecord.reduce((sum, activity) => {
  //     let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
  //     if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
  //       sum += activity.steps;
  //     }
  //     return sum;
  //   }, 0));
  // }
  //
  // findFriendsTotalStepsForWeek(users, date) {
  //   this.friends.map(friend => {
  //     let matchedFriend = users.find(user => user.id === friend);
  //     matchedFriend.calculateTotalStepsThisWeek(date);
  //     this.friendsActivityRecords.push(
  //       {
  //         'id': matchedFriend.id,
  //         'firstName': matchedFriend.name.toUpperCase().split(' ')[0],
  //         'totalWeeklySteps': matchedFriend.totalStepsThisWeek
  //       })
  //   })
  //   this.calculateTotalStepsThisWeek(date);
  //   this.friendsActivityRecords.push({
  //     'id': this.id,
  //     'firstName': 'YOU',
  //     'totalWeeklySteps': this.totalStepsThisWeek
  //   });
  //   this.friendsActivityRecords = this.friendsActivityRecords.sort((a, b) => b.totalWeeklySteps - a.totalWeeklySteps);
  // }

  findTotalWaterConsumption() {
    console.log(this.hydration)
    let hydrationAvg = this.hydration.reduce((total, userHydration) => {
      return total + userHydration.numOunces
    }, 0)
    return Math.round(hydrationAvg / this.hydration.length)
  }

  findTotalWaterConsumptionDay(date) {
    const ouncesInDay = this.hydration.find(currentDate => currentDate.date === date)
    // console.log('currentdate', currentDate)

    console.log(ouncesInDay)
    return ouncesInDay.numOunces;
  }

  consumedWaterOverWeek(inputDate) {
    let inputToWeek = dayjs(inputDate, "YYYY-MM-DD").week()
    let filteredDays = this.hydration.filter(item => {
      let convertedToWeek = dayjs(item.date, "YYYY-MM-DD").week()
      if (convertedToWeek === inputToWeek) {
        return item
      }
    })
    let ouncesOverWeek = filteredDays.map(day => day.numOunces)
    return ouncesOverWeek;
  }

  hoursSleptAverageForAllDays() {
    let sleepAvg = this.sleep.reduce((total, sleepData) => {
      return total + sleepData.hoursSlept
    }, 0)
    return Math.round(sleepAvg / this.sleep.length)
  }

  sleepQualityAverageForAllDays() {
    let sleepAvg = this.sleep.reduce((total, sleepData) => {
      return total + sleepData.sleepQuality
    }, 0)
    return Math.round(sleepAvg / this.sleep.length)
  }

  gethoursSleptOnDay(date) {
    let found = this.sleep.find(sleepData => sleepData.date === date)
    return found.hoursSlept
  }

  getSleepQualityOnDay(date) {
    let found = this.sleep.find(sleepData => sleepData.date === date)
    return found.sleepQuality
  }


  getHoursSleptOverWeek(inputDate) {
    let inputToWeek = dayjs(inputDate, "YYYY-MM-DD").week()
    let filteredDays = this.sleep.filter(item => {
      let convertedToWeek = dayjs(item.date, "YYYY-MM-DD").week()
      if (convertedToWeek === inputToWeek) {
        return item
      }
    })
    let hoursSlept = filteredDays.map(day => day.hoursSlept)
    return hoursSlept;
  }

  getSleepQualityOverWeek(inputDate) {
    let inputToWeek = dayjs(inputDate, "YYYY-MM-DD").week()
    let filteredDays = this.sleep.filter(item => {
      let convertedToWeek = dayjs(item.date, "YYYY-MM-DD").week()
      if (convertedToWeek === inputToWeek) {
        return item
      }
    })
    let sleepQuality = filteredDays.map(day => day.sleepQuality)
    return sleepQuality;
  }

  calculateAverageQualityByWeek(date) {
    let inputToWeek = dayjs(date, "YYYY-MM-DD").week()
    let filteredDays = this.sleep.filter(item => {
      let convertedToWeek = dayjs(item.date, "YYYY-MM-DD").week()
      if (convertedToWeek === inputToWeek) {
        return item
      }
    })
    let sleepQuality = filteredDays.map(day => day.sleepQuality)
    let sum = sleepQuality.reduce((total, currentVal) => {
      total += currentVal
      return total
    }, 0)
    return sum / sleepQuality.length
  }


  // Return How many minutes active a user averaged for a given week
  // Possible: .filter() days between a week then .reduce() and average a user’s minutesActive

  getMilesWalkedOnDay(date) {
    let activityOnDay = this.activity.find(activity => activity.date === date)
    return parseFloat(((activityOnDay.steps * this.strideLength) / 5280).toFixed(1))
  }

  getMinutesActiveOnDay(date) {
    let activityOnDay = this.activity.find(activity => activity.date === date)
    return activityOnDay.minutesActive;
  }


  averageMinutesActiveByWeek(inputDate) {
    let inputToWeek = dayjs(inputDate, "YYYY-MM-DD").week()
    let filteredDays = this.activity.filter(item => {
      let convertedToWeek = dayjs(item.date, "YYYY-MM-DD").week()
      if (convertedToWeek === inputToWeek) {
        return item
      }
    })
    let averageMinutesOverWeek = filteredDays.reduce((total, currentVal) => {
      total += currentVal.minutesActive
      return total
    }, 0)

    return averageMinutesOverWeek / filteredDays.length
  }

  userGoalReached(date) {
    let activityOnDay = this.activity.find(activity => activity.date === date)
    if (activityOnDay.steps >= this.dailyStepGoal) {
      return true
    } else {
      return false
    }
  }

  allDaysGoalReached() {
    let daysGoalReached =
      this.activity.filter(act => this.userGoalReached(act.date));
    return daysGoalReached;
  };

  getAllTimeHigh() {
    let highestStairCount =
      this.activity.sort((a, b) => a.flightsOfStairs > b.flightsOfStairs ? -1 : 1);
    return highestStairCount[0].flightsOfStairs;
  };

  getStairsClimbedOnDate(date) {
    let stairsClimbDate = this.activity.find(activity => activity.date === date)
    return stairsClimbDate.flightsOfStairs
  }
};


export default User;
