export const renderSleepOverWeek = (currentUser, currentDate) => {
  let correlatedHoursOverWeek = currentUser.getHoursSleptOverWeek(currentDate);
  let correlatedQualityOverWeek = currentUser.getSleepQualityOverWeek(currentDate);
  let dates = correlatedHoursOverWeek.map(day => day.date)
  let hoursValues = correlatedHoursOverWeek.map(day => day.hoursSlept)
  let qualityValues = correlatedQualityOverWeek.map(day => day.sleepQuality)

  const data = {
    labels: dates,
    datasets: [{
      label: 'Hours over Week',
      data: hoursValues,
      fill: false,
      borderColor: 'rgb(94,158,167)',
      tension: 0.1
    },
    {
      label: 'Quality over Week',
      data: qualityValues,
      fill: false,
      borderColor: 'rgba(118, 254, 179, 0.88)',
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
