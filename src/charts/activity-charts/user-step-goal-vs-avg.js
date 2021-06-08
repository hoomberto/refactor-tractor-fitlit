export const renderUserStepGoalVsAverage = (currentUser, userRepo) => {
  const labels = [ `${currentUser.name.split(' ')[0]}`, 'All Users' ]
  const data = {
    labels: labels,
    datasets: [{
      label: 'Users Step Goal VS Average',
      data: [ currentUser.dailyStepGoal , userRepo.getAverageStepGoalOfAllUser() ],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
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
