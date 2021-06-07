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
        'purple',
        'pink',
      ],
      borderColor: [
        'white',
        'white',
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
        'blue',
        'purple'
      ],
      borderColor: [
        'white',
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
      }
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
      }
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
