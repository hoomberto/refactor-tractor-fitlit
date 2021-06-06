export const renderLastMinActive = (currentUser, currentDate) => {
  const articleEle = document.getElementById('latestminactive')
  articleEle.innerHTML = `
  <p class='last-min-active excise'>${currentUser.getMinutesActiveOnDay(currentDate)}
  </p>`};
  //add commits to be deleted