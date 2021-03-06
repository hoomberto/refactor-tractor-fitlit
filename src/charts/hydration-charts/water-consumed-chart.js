export const renderWaterConsumed = (currentUser, currentDate) => {
  let waterChart;
  let waterDrank = currentUser.consumedWaterOnDay(currentDate)
  let waterData;
  // Comparing the recommended daily amount of 64oz to what the user drank
  let comparison = 64 - waterDrank
  if (comparison < 1) {
    waterData = {
      labels: [
        'Daily Water Goal Met!',
      ],
      datasets: [{
        label: 'Water Consumed',
        data: [waterDrank],
        backgroundColor: [
          'rgba(41, 126, 255, 0.54)',
        ],
        hoverOffset: 4
      }],
    };
  }
  else {
    waterData = {
      labels: [
        'Water Drank',
        'Ounces till Goal Met'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [waterDrank, comparison],
        backgroundColor: [
          'rgba(41, 223, 255, 0.44)',
          'rgba(219, 41, 255, 0.54)'
        ],
        hoverOffset: 4
      }],
    };
  }

  const waterConfig = {
    type: 'doughnut',
    data: waterData,
    options: {
      cutout: 77,
    }
  };

  waterChart = new Chart(
    document.getElementById('water-chart').getContext("2d"),
    waterConfig
  );
}
