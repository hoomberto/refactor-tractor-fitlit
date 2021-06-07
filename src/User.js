import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear'
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
    this.hydration = hydration;
    this.activity = activity;
  }

  getFirstName() {
    var name = this.name.split(' ');
    return name[0].toUpperCase();
  }

  consumedWaterOnDay(date) {
    let ouncesInDay = this.hydration.find(currentDate => currentDate.date === date)
    if (!ouncesInDay) {
      ouncesInDay = {}
      ouncesInDay.numOunces = Math.floor(Math.random() * 64)
    }
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
    filteredDays.sort((a, b) => a.date > b.date ? 1 : -1);
    if (filteredDays.length < 7) {
      //add the amount of days before it to make the total .length of 7
        let beforeWeek = dayjs(inputDate, "YYYY-MM-DD").week(inputToWeek - 1)
        let beforeWeekDays = this.hydration.filter(item => {
          let convertedToWeek = dayjs(item.date, "YYYY-MM-DD").week()
          if (convertedToWeek === beforeWeek.$W) {
            return item
          }
        })
        while (filteredDays.length < 7) {
          filteredDays.unshift(beforeWeekDays.shift())
      }

    }
    let ouncesOverWeek = filteredDays.map(day => {
      return {
        date: day.date,
        numOunces: day.numOunces
      }
    })
    // let ouncesOverWeek = filteredDays.map(day => day.numOunces)
    return ouncesOverWeek;
  }

  findTotalWaterConsumption() {
    let hydrationAvg = this.hydration.reduce((total, userHydration) => {
      return total + userHydration.numOunces
    }, 0)
    return Math.round(hydrationAvg / this.hydration.length)
  }

  gethoursSleptOnDay(date) {
    let found = this.sleep.find(sleepData => sleepData.date === date)
    if (!found) {
      found = {};
      found.hoursSlept = 7.5;
    }
    return found.hoursSlept
  }

  getHoursSleptOverWeek(inputDate) {
    let inputToWeek = dayjs(inputDate, "YYYY-MM-DD").week()
    let filteredDays = this.sleep.filter(item => {
      let convertedToWeek = dayjs(item.date, "YYYY-MM-DD").week()
      if (convertedToWeek === inputToWeek) {
        return item
      }
    })

    filteredDays.sort((a, b) => a.date > b.date ? 1 : -1);
    if (filteredDays.length < 7) {
      //add the amount of days before it to make the total .length of 7
        let beforeWeek = dayjs(inputDate, "YYYY-MM-DD").week(inputToWeek - 1)
        let beforeWeekDays = this.sleep.filter(item => {
          let convertedToWeek = dayjs(item.date, "YYYY-MM-DD").week()
          if (convertedToWeek === beforeWeek.$W) {
            return item
          }
        })
        while (filteredDays.length < 7) {
          filteredDays.unshift(beforeWeekDays.pop())
      }

    }
    let hoursOverWeek = filteredDays.map(day => {
      return {
        date: day.date,
        hoursSlept: day.hoursSlept
      }
    })
    // let ouncesOverWeek = filteredDays.map(day => day.numOunces)
    return hoursOverWeek;
    //
    //
    // let hoursSlept = filteredDays.map(day => day.hoursSlept)
    // return hoursSlept;
  }

  hoursSleptAverageForAllDays() {
    let sleepAvg = this.sleep.reduce((total, sleepData) => {
      return total + sleepData.hoursSlept
    }, 0)
    return Math.round(sleepAvg / this.sleep.length)
  }

  getSleepQualityOnDay(date) {
    let found = this.sleep.find(sleepData => sleepData.date === date)
    if (!found) {
      found = {};
      found.sleepQuality = 3.3;
    }
    return found.sleepQuality
  }

  getSleepQualityOverWeek(inputDate) {
    let inputToWeek = dayjs(inputDate, "YYYY-MM-DD").week()
    let filteredDays = this.sleep.filter(item => {
      let convertedToWeek = dayjs(item.date, "YYYY-MM-DD").week()
      if (convertedToWeek === inputToWeek) {
        return item
      }
    })
    filteredDays.sort((a, b) => a.date > b.date ? 1 : -1);
    if (filteredDays.length < 7) {
      //add the amount of days before it to make the total .length of 7
        let beforeWeek = dayjs(inputDate, "YYYY-MM-DD").week(inputToWeek - 1)
        let beforeWeekDays = this.sleep.filter(item => {
          let convertedToWeek = dayjs(item.date, "YYYY-MM-DD").week()
          if (convertedToWeek === beforeWeek.$W) {
            return item
          }
        })
        while (filteredDays.length < 7) {
          filteredDays.unshift(beforeWeekDays.shift())
      }

    }
    let hoursOverWeek = filteredDays.map(day => {
      return {
        date: day.date,
        sleepQuality: day.sleepQuality
      }
    })
    // let ouncesOverWeek = filteredDays.map(day => day.numOunces)
    return hoursOverWeek;

    //
    // let sleepQuality = filteredDays.map(day => day.sleepQuality)
    // return sleepQuality;
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

  sleepQualityAverageForAllDays() {
    let sleepAvg = this.sleep.reduce((total, sleepData) => {
      return total + sleepData.sleepQuality
    }, 0)
    return Math.round(sleepAvg / this.sleep.length)
  }

  getMinutesActiveOnDay(date) {
    let activityOnDay = this.activity.find(activity => activity.date === date)
    return activityOnDay.minutesActive;
  }

  getMilesWalkedOnDay(date) {
    let activityOnDay = this.activity.find(activity => activity.date === date)
    return parseFloat(((activityOnDay.steps * this.strideLength) / 5280).toFixed(1))
  }

  getStepsWalkedOnDay(date) {
    let activityOnDay = this.activity.find(activity => activity.date === date)
    return activityOnDay.steps
  }

  getAverageMinutesActiveByWeek(inputDate) {
    let inputToWeek = dayjs(inputDate, "YYYY-MM-DD").week()
    let filteredDays = this.activity.filter(item => {
      let convertedToWeek = dayjs(item.date, "YYYY-MM-DD").week()
      if (convertedToWeek === inputToWeek) {
        return item
      }
    })

    filteredDays.sort((a, b) => a.date > b.date ? 1 : -1);
    if (filteredDays.length < 7) {
      //add the amount of days before it to make the total .length of 7
        let beforeWeek = dayjs(inputDate, "YYYY-MM-DD").week(inputToWeek - 1)
        let beforeWeekDays = this.activity.filter(item => {
          let convertedToWeek = dayjs(item.date, "YYYY-MM-DD").week()
          if (convertedToWeek === beforeWeek.$W) {
            return item
          }
        })
        while (filteredDays.length < 7) {
          filteredDays.unshift(beforeWeekDays.shift())
      }

    }
    let minutesActiveOverWeek = filteredDays.map(day => day.minutesActive)
    .reduce((acc, currentVal) => {
      acc += currentVal
      return acc
    }, 0)
    return minutesActiveOverWeek / filteredDays.length;
  }

  getAverageStepsByWeek(inputDate) {
    let inputToWeek = dayjs(inputDate, "YYYY-MM-DD").week()
    let filteredDays = this.activity.filter(item => {
      let convertedToWeek = dayjs(item.date, "YYYY-MM-DD").week()
      if (convertedToWeek === inputToWeek) {
        return item
      }
    })

    filteredDays.sort((a, b) => a.date > b.date ? 1 : -1);
    if (filteredDays.length < 7) {
      //add the amount of days before it to make the total .length of 7
        let beforeWeek = dayjs(inputDate, "YYYY-MM-DD").week(inputToWeek - 1)
        let beforeWeekDays = this.activity.filter(item => {
          let convertedToWeek = dayjs(item.date, "YYYY-MM-DD").week()
          if (convertedToWeek === beforeWeek.$W) {
            return item
          }
        })
        while (filteredDays.length < 7) {
          filteredDays.unshift(beforeWeekDays.shift())
      }

    }
    let stepsOverWeek = filteredDays.map(day => day.steps)
    .reduce((acc, currentVal) => {
      acc += currentVal
      return acc
    }, 0)
    return stepsOverWeek / filteredDays.length;
  }

  getAverageStairsByWeek(inputDate) {
    let inputToWeek = dayjs(inputDate, "YYYY-MM-DD").week()
    let filteredDays = this.activity.filter(item => {
      let convertedToWeek = dayjs(item.date, "YYYY-MM-DD").week()
      if (convertedToWeek === inputToWeek) {
        return item
      }
    })

    filteredDays.sort((a, b) => a.date > b.date ? 1 : -1);
    if (filteredDays.length < 7) {
      //add the amount of days before it to make the total .length of 7
        let beforeWeek = dayjs(inputDate, "YYYY-MM-DD").week(inputToWeek - 1)
        let beforeWeekDays = this.activity.filter(item => {
          let convertedToWeek = dayjs(item.date, "YYYY-MM-DD").week()
          if (convertedToWeek === beforeWeek.$W) {
            return item
          }
        })
        while (filteredDays.length < 7) {
          filteredDays.unshift(beforeWeekDays.shift())
      }

    }
    let stairsOverWeek = filteredDays.map(day => day.flightsOfStairs)
    .reduce((acc, currentVal) => {
      acc += currentVal
      return acc
    }, 0)
    return stairsOverWeek / filteredDays.length;
  }

  getStairsClimbedOnDate(date) {
    let stairsClimbDate = this.activity.find(activity => activity.date === date)
    return stairsClimbDate.flightsOfStairs
  }

  allDaysGoalReached() {
    let daysGoalReached = this.activity.filter(act => this.userGoalReached(act.date));
    return daysGoalReached;
  };

  userGoalReached(date) {
    let activityOnDay = this.activity.find(activity => activity.date === date)
    if (activityOnDay.steps >= this.dailyStepGoal) {
      return true
    } else {
      return false
    }
  }

  getStairsAllTimeHigh() {
    let highestStairCount =
      this.activity.sort((a, b) => a.flightsOfStairs > b.flightsOfStairs ? -1 : 1);
    return highestStairCount[0].flightsOfStairs;
  };
};


export default User;
