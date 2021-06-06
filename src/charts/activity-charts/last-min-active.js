export const renderLastMinActive = (currentUser, currentDate) => {
  const latestMinActive = document.getElementById('latestminactive')
  latestMinActive.innerHTML = `
  <p class='last-min-active exercise'>${currentUser.getMinutesActiveOnDay(currentDate)}
  </p>`};
