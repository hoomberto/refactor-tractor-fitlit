class UserRepository {
  constructor(userData) {
    this.users = userData
  }
  getUser(id) {
    return this.users.find(user => user.id === id)
  }

  getAverageStairsClimbedOnDay(date) {
    let averagedClimbedStairs = []
    this.users.forEach(user => {
      let stairsClimbed = user.activity.filter(activity => activity.date === date).map((activity) => activity.flightsOfStairs)
      stairsClimbed.forEach(value => averagedClimbedStairs.push(value))
    })
    return averagedClimbedStairs.reduce((total, currentVal) => {
      total += currentVal
      return total
    }, 0) / averagedClimbedStairs.length
  }
  getAverageStepsTakenOnDay(date) {
    let averageStepsWalked = []
    this.users.forEach(user => {
      let stepsWalked = user.activity.filter(activity => activity.date === date).map((activity) => activity.steps)
      stepsWalked.forEach(value => averageStepsWalked.push(value))
    })
    return averageStepsWalked.reduce((total, currentVal) => {
      total += currentVal
      return total
    }, 0) / averageStepsWalked.length
  }

  getAverageMinutesActiveOnDay(date) {
    let averageStepsWalked = []
    this.users.forEach(user => {
      let stepsWalked = user.activity.filter(activity => activity.date === date).map((activity) => activity.minutesActive)
      stepsWalked.forEach(value => averageStepsWalked.push(value))
    })
    return averageStepsWalked.reduce((total, currentVal) => {
      total += currentVal
      return total
    }, 0) / averageStepsWalked.length
  }

  getBestSleepers(date) {
    return this.users.filter(user => {
      return user.calculateAverageQualityByWeek(date) >= 3;
    })
  }

  getLongestSleepers(date) {
    let values = this.users.map(user => {
      return {
        name: user.name,
        hours: user.gethoursSleptOnDay(date)
      }
    })
    let sorted = values.sort((a, b) => a.hours > b.hours ? -1 : 1)
    if (sorted.length >= 3 && sorted[0] === sorted[1]) {
      return sorted.slice(0, 3)
    } else {
      return sorted[0]
    }
  }

  getAverageStepGoalOfAllUser() {
    return this.users.reduce((stepGoal, user) => {
      stepGoal += user.dailyStepGoal
      return stepGoal
    }, 0) / this.users.length;
  }
}

export default UserRepository;
