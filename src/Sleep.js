class Sleep { // instance for the user's sleep each day
  constructor(data) {
    this.userID = data.userID;
    this.date = data.date;
    this.hoursSlept = data.hoursSlept;
    this.sleepQuality = data.sleepQuality;
  }

  sleep(userRepo) {
    var sleep = this;
    userRepo.users.find(function(user) {
      return user.id === sleep.userId;
    }).updateSleep(this.date, this.hoursSlept, this.sleepQuality);
  }

  getHoursSleptOverWeek(sleep) {
    let totalHoursSlept = 0

    sleep.map((id) => {
      let allHours = totalHoursSlept += id.hoursSlept
      return allHours
    })
    return totalHoursSlept
  };
}
     


export default Sleep;
/*

-Calculate how many hours a user slept each day over the course of a given week - 
  should be able to calculate this for any week

- Possible: .filter() days that fall between given week, 
  then reduce/sum hours a user slept over the course of a week

-For a user (identified by their userID),
  the average number of hours slept per day

-For a user, their average sleep 
  quality per day over all time

-For a user, how many hours they slept for 
  a specific day (identified by a date)

-For a user, their sleep quality for a 
  specific day (identified by a date)

-For a user, how many hours slept each day 
  over the course of a given week (7 days) - you should be able to 
  calculate this for any week, not just the latest week

-For a user, their sleep quality each day 
  over the course of a given week (7 days) - you should be able 
  to calculate this for any week, not just the latest week

-For all users, the average sleep quality

-Find all users who average a sleep quality 
  greater than 3 for a given week (7 days) - you should be able to 
  calculate this for any week, not just the latest week

-For a given day (identified by the date), 
  find the users who slept the most number of hours 
  (one or more if they tied)
*/