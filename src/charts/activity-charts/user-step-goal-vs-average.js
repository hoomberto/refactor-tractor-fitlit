export const renderUserStepGoalVsAverage = (currentUser, userRepo) => {
  const labels = [ `${currentUser.name.split(' ')[0]}`, 'All Users' ]
  const data = {
    labels: labels,
    datasets: [{
      label: 'Users Step Goal VS Average',
      data: [ currentUser.dailyStepGoal , userRepo.getAverageStepGoalOfAllUser() ],
      backgroundColor: [
        'green',
        'black'
      ],
      borderColor: [
        'pink',
        'white'
      ],
      borderWidth: 1
    }]
  };
  const activityConfig = {
    type: 'bar',
    data: data,
  };
  const myChart = new Chart(
    document.getElementById('useravgchart'),
    activityConfig
  )
};