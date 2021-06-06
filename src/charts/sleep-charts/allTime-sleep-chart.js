export const renderAllTimeSleep = (currentUser, currentDate) => {
  let hrsSlept = currentUser.hoursSleptAverageForAllDays(currentDate)
  let sleepQuality = currentUser.sleepQualityAverageForAllDays(currentDate)

  const sleepDataForAllTimes = {
    labels: ['All Time Sleep Hours', 'All Time Sleep Quality'],
    datasets: [{
      data: [hrsSlept, sleepQuality],
      backgroundColor: ['rgb(94,158,167)', 'rgb(158,214,183)']
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