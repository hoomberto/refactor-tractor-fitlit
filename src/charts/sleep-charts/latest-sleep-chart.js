export const renderSleepQuality = (currentUser, currentDate) => {
  let hrsSlept = currentUser.gethoursSleptOnDay(currentDate)
  let sleepQuality = currentUser.getSleepQualityOnDay(currentDate)


  const sleepData = {
    labels: ['Hours Sleep', ' Sleep Quality'],
    datasets: [{
      data: [hrsSlept, sleepQuality],
      backgroundColor: ['rgb(94,158,167)', 'rgb(158,214,183)']
    }]
  }
  const sleepConfig = {
    type: 'pie',
    data: sleepData,

  };

  const myChart = new Chart(
    document.getElementById('sleep-chart'),
    sleepConfig
  )
}