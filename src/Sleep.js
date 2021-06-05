class Sleep { // instance for the user's sleep each day
  constructor(data) {
    this.userID = data.userID;
    this.date = data.date;
    this.hoursSlept = data.hoursSlept;
    this.sleepQuality = data.sleepQuality;
  }
}

export default Sleep;
