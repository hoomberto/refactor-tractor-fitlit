export const renderWaterOverWeek = (currentUser, currentDate) => {
  console.log('dys this bitch drank: ', currentUser.consumedWaterOverWeek(currentDate));
  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const data = {
    labels: labels,
    datasets: [{
      label: 'Water Consumed Over Week',
      data: currentUser.consumedWaterOverWeek(currentDate),
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