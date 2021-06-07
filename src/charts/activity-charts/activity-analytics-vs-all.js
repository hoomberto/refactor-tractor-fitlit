export const renderUserAnalyticsVsAll = (currentUser, currentDate, currentRepo) => {
const userFirstName = currentUser.name.split(" ")[0]

const userSteps = currentUser.getStepsWalkedOnDay(currentDate)
const userMin = currentUser.getMinutesActiveOnDay(currentDate)
const userStairs = currentUser.getStairsClimbedOnDate(currentDate)

const userBaseStepsAvg = currentRepo.users
.map(user => user.getStepsWalkedOnDay(currentDate))
.reduce((acc, currentVal) => {
  acc += currentVal
  return acc
}, 0) / currentRepo.users.length

const userBaseMinAvg = currentRepo.users
.map(user => user.getMinutesActiveOnDay(currentDate))
.reduce((acc, currentVal) => {
  acc += currentVal
  return acc
}, 0) / currentRepo.users.length

const userBaseStairsAvg = currentRepo.users
.map(user => user.getStairsClimbedOnDate(currentDate))
.reduce((acc, currentVal) => {
  acc += currentVal
  return acc
}, 0) / currentRepo.users.length


console.log('>>>>>> USERS STEPS', userSteps)

  const labels = [
    `${userFirstName}'s stairs climbed`,
    'All stairs climbed',
    `${userFirstName}'s minutes active`,
    'All minutes active',
    `${userFirstName}'s steps walked`,
    'All steps walked',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: `${userFirstName}'s Analytics vs All Users`,
      data: [
        userStairs,
        userBaseStairsAvg,
        userMin,
        userBaseMinAvg,
        userSteps,
        userBaseStepsAvg],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
      ],
      borderWidth: 1
    }]
  };


  const config = {
    type: 'bar',
    data: data,
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  const activityVsAllChart = new Chart(
    document.getElementById('userAnalyticsVsUserBase'),
    config
  );

}
