export const renderWeeklyActivity = (currentUser, currentDate) => {
const userFirstName = currentUser.name.split(" ")[0]

const userStairs = currentUser.getAverageStairsByWeek(currentDate)
const userMin = currentUser.getAverageMinutesActiveByWeek(currentDate)
const userSteps = currentUser.getAverageStepsByWeek(currentDate)

console.log('>>>>>> USERS STEPS', userSteps)

  const labels1 = [
    `${userFirstName}'s stairs climbed`,
    `${userFirstName}'s minutes active`,
  ];

  const minStairsData = {
    labels: labels1,
    datasets: [{
      label: `${userFirstName}'s Weekly Average Min Active / Stairs Climbed`,
      data: [
        userStairs,
        userMin,
      ],
      backgroundColor: [
        'rgba(255, 10, 202, 0.17)',
        'rgba(245, 196, 0, 0.28)',
      ],
      borderColor: [
        'rgba(255, 10, 202, 0.66)',
        'rgba(214, 171, 0, 0.76)',
      ],
      borderWidth: 1
    }]
  };

  const stepsData = {
    labels: [`${userFirstName}'s steps walked`, `${userFirstName}'s daily goal`],
    datasets: [{
      label: `${userFirstName}'s Weekly Average Steps`,
      data: [
        userSteps,
        currentUser.dailyStepGoal
      ],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 10, 10, 0.21)'
      ],
      borderColor: [
        'rgb(54, 162, 235)',
        'rgba(255, 10, 10, 0.64)',
      ],
      borderWidth: 1
    }]
  };


  const config = {
    type: 'bar',
    data: minStairsData,
    options: {
      // indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        }
      },
      maintainAspectRatio: false,
      responsive: false
    },
  };

  const config2 = {
    type: 'bar',
    data: stepsData,
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        }
      },
      maintainAspectRatio: false,
      responsive: false
    },
  };

  const minStairsChart = new Chart(
    document.getElementById('minStairsAvgChart'),
    config
  );

  const activityVsAllChart = new Chart(
    document.getElementById('stepsAvgChart'),
    config2
  );

}
