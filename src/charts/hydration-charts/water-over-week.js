export const renderWaterOverWeek = (currentUser, currentDate) => {
  let correlatedDates = currentUser.consumedWaterOverWeek(currentDate);
  let dates = correlatedDates.map(day => day.date)
  let values = correlatedDates.map(day => day.numOunces)
  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const data = {
    labels: dates,
    datasets: [{
      label: 'Water Consumed Over Week',
      data: values,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const waterConfig = {
    type: 'line',
    data: data,
  };

  const myChart = new Chart(
    document.getElementById('waterWeekChart'),
    waterConfig
  );
};
