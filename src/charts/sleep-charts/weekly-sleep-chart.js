export const renderSleepOverWeek = (currentUser, currentDate) => {
  let correlatedHoursOverWeek = currentUser.getHoursSleptOverWeek(currentDate);
  let correlatedQualityOverWeek = currentUser.getSleepQualityOverWeek(currentDate);
  let dates = correlatedHoursOverWeek.map(day => day.date)
  let hoursValues = correlatedHoursOverWeek.map(day => day.hoursSlept)
  let qualityValues = correlatedQualityOverWeek.map(day => day.sleepQuality)
  // const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  console.log('CORRELATED HRS >>>>', correlatedHoursOverWeek)
  console.log('CORRELATED QUALITY >>>>', correlatedQualityOverWeek)

  const data = {
    labels: dates,
    datasets: [{
      label: 'Hours over Week',
      data: hoursValues,
      fill: false,
      borderColor: 'blue',
      tension: 0.1
    },
    {
      label: 'Quality over Week',
      data: qualityValues,
      fill: false,
      borderColor: 'red',
      tension: 0.1
    }]
  };

  const sleepConfig = {
    type: 'line',
    data: data,
  };

  const sleepChart = new Chart(
    document.getElementById('sleepOverWeekChart'),
    sleepConfig
  );
};
