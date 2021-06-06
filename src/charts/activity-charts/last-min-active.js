export const renderLastMinActive = (currentUser, currentDate) => {
  const latestMinActive = document.getElementById('latestminactive')
  latestMinActive.innerHTML = `
  <h4><strong>MIN ACTIVE TODAY</strong></h4>
  <p class='last-min-active exercise'>${currentUser.getMinutesActiveOnDay(currentDate)}
  </p>
  `
};
