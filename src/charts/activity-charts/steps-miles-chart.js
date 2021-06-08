export const renderStepsMiles = (currentUser, currentDate) => {
  let userGoal = currentUser.dailyStepGoal;
  let userMilesOnDay = currentUser.getMilesWalkedOnDay(currentDate);
  let userStepsOnDay = currentUser.getStepsWalkedOnDay(currentDate);
  let comparison = userGoal - userStepsOnDay;


  // let innerRing = {
  //   data: [userMilesOnDay],
  //   backgroundColor: ['orange'],
  //   label: 'Miles Walked',
  //   labels: ['Miles Walked'],
  //   hoverOffset: 4
  // }

  let outerRing = {
    data: [userStepsOnDay, comparison],
    backgroundColor: [
      'rgba(255, 91, 41, 0.8)',
      'rgba(255, 226, 41, 0.8)',
    ],
    label: 'Outer Ring',
    labels: ['User Steps','Steps Left till Goal'],
    hoverOffset: 4
  }

  let data = {
    labels: ['Steps Taken', 'Steps Left till Goal'],
    datasets: [outerRing],
  };

  const stepsMilesConfig = {
    type: 'doughnut',
    data: data,
    options: {
      cutout: 77,
      plugins: {legend: { position: 'bottom'} },
  }
}

  if (comparison < 1) {
    outerRing = {
      data: [userStepsOnDay],
      backgroundColor: ['rgba(255, 41, 41, 0.79)'],
      // labels: ['Daily Step Goal Met!'],
      hoverOffset: 4
    }
    data.labels = ['Steps Goal Reached!']
    data.datasets = [outerRing]
  }



  const stepsMiles = new Chart(
    document.getElementById('stepsMilesChart'),
    stepsMilesConfig
  );

  let section = document.getElementById('lateststepsmiles')
  section.setAttribute('data-before', `${userMilesOnDay} Miles`)
  // .attr('data-content','User Miles');
}
