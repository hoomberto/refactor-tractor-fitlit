export const renderAllTimeSleep = (currentUser, currentDate) => {
  let hrsSlept = currentUser.hoursSleptAverageForAllDays(currentDate)
  let sleepQuality = currentUser.sleepQualityAverageForAllDays(currentDate)

  if (!hrsSlept || !sleepQuality) {
    hrsSlept = currentUser.gethoursSleptOnDay("2020/01/21")
    sleepQuality = currentUser.getSleepQualityOnDay("2020/01/21")
  }

  const sleepDataForAllTimes = {
    labels: ['All Time Sleep Hours', 'All Time Sleep Quality'],
    datasets: [{
      data: [hrsSlept, sleepQuality],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(0,26,77, 0.2)',
      ]
    }]
  }

  const sleepConfig = {
    type: 'polarArea',
    data: sleepDataForAllTimes,
  };

  const myChart = new Chart(
    document.getElementById('allTimeSleep-chart'),
    sleepConfig
  )
}
