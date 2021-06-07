export const renderWaterConsumed = (currentUser, currentDate) => {
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
          'lightblue',
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
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
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

  const myChart = new Chart(
    document.getElementById('water-chart'),
    waterConfig
  );
}
