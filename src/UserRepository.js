// import sleepData from './data/sleep';
// import User from '../src/User';
 
class UserRepository {
  constructor(userData) {
    this.users = userData
  }
  getUser(id) {
    return this.users.find(user => user.id === id)
  }
  calculateAverageStepGoal() {
    let goals = this.users.map(user => user.dailyStepGoal)
    let total = goals.reduce((sum, goal) => {
      sum += goal;
      return sum;
    }, 0)
    return total / this.users.length
  }
  calculateAverageSleepQuality() {
    let totalSleepQuality = this.users.reduce((sum, user) => {
      sum += user.sleepQualityAverage;
      return sum;
    }, 0);
    return totalSleepQuality / this.users.length;
  }
  calculateAverageSteps(date) {
    let allUsersStepsCount = this.users.map(user => {
      return user.activityRecord.filter(activity => {
        return activity.date === date;
      });
    })
    let sumOfSteps = allUsersStepsCount.reduce((stepsSum, activityCollection) => {
      activityCollection.forEach(activity => {
        stepsSum += activity.steps
      })
      return stepsSum;
    }, 0);
    return Math.round(sumOfSteps / allUsersStepsCount.length);
  }
  calculateAverageStairs(date) {
    let allUsersStairsCount = this.users.map(user => {
      return user.activityRecord.filter(activity => {
        return activity.date === date;
      });
    })
    let sumOfStairs = allUsersStairsCount.reduce((stairsSum, activityCollection) => {
      activityCollection.forEach(activity => {
        stairsSum += activity.flightsOfStairs
      })
      return stairsSum;
    }, 0);
    return Math.round(sumOfStairs / allUsersStairsCount.length);
  }
  calculateAverageMinutesActive(date) {
    let allUsersMinutesActiveCount = this.users.map(user => {
      return user.activityRecord.filter(activity => {
        return activity.date === date;
      });
    })
    let sumOfMinutesActive = allUsersMinutesActiveCount.reduce((minutesActiveSum, activityCollection) => {
      activityCollection.forEach(activity => {
        minutesActiveSum += activity.minutesActive
      })
      return minutesActiveSum;
    }, 0);
    return Math.round(sumOfMinutesActive / allUsersMinutesActiveCount.length);
  }
  calculateAverageDailyWater(date) {
    let todaysDrinkers = this.users.filter(user => {
      return user.addDailyOunces(date) > 0;
    });
    let sumDrankOnDate = todaysDrinkers.reduce((sum, drinker) => {
      return sum += drinker.addDailyOunces(date);
    }, 0)
    return Math.floor(sumDrankOnDate / todaysDrinkers.length);
  }
  findBestSleepers(date) {
    return this.users.filter(user => {
      return user.calculateAverageQualityThisWeek(date) > 3;
    })
  }
  getLongestSleepers(date) {
    return sleepData.filter(sleep => {
      return sleep.date === date;
    }).sort((a, b) => {
      return b.hoursSlept - a.hoursSlept;
    })[0].userID;
  }
  getWorstSleepers(date) {
    return sleepData.filter(sleep => {
      return sleep.date === date;
    }).sort((a, b) => {
      return a.hoursSlept - b.hoursSlept;
    })[0].userID;
  };

  getAverageStairsClimbedOnDay(date) {

    // console.log('this.users[0].activity[0].flightsOfStairs: ', this.users[0].activity[0].flightsOfStairs)
    // let averagedClimbedStairs = []
    // this.users.forEach(user => {
    //   let stairsClimbed = user.activity.filter(activity => activity.date === date)
    //   .map((activity) => activity.flightsOfStairs)
    //   stairsClimbed.forEach(step => averagedClimbedStairs.push(step))
    //   console.log('>>>>>', averagedClimbedStairs[0] / averagedClimbedStairs.length);
  // })
    const findUser = 
      this.users.filter(user => {
        user.activity.reduce((userArr, cumVal) => {
          console.log('cumVal.date: ', cumVal.date)
          if(cumVal.date === date){
            userArr += cumVal.flightsOfStairs
            console.log('userAArr;<<<<<', userArr);
          }
          return userArr
        }, 0)
      })
      console.log('look here>>>> ', findUser)
      // console.log('finderUser: ', findUser);

    //end answer of 27<<<<<
  }
}




// retrieve from api

// fetchedUserData.forEach(user => {
//   fetchedSleepData.forEach((data) => {
//     if (user.id === data.id)
//   });
//
// })

// correlatedSleep = fetchedSleepData.filter(data => {
//   fetchedUserData.some(user => user.id === data.id}))
//
// })
//
// const correlate = (user, fetchedData) => {
//   correlated = fetchedData.filter(data => {
//     fetchedUserData.some(user => user.id === data.id}))
//   })
//   return correlated;
// }
//
//
//
// usersInstantiated = fetchedUserData.map(user => new User(user, correlate(user, sleepData), correlate(user, activityData))
// userRepo = new UserRepository(
//
// )







export default UserRepository;
