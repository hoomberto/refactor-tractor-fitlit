export const renderLastMinActive = (currentUser, currentDate) => {
  const latestMinActive = document.getElementById('latestminactive')
  latestMinActive.innerHTML = `
  <h2><strong>MIN ACTIVE TODAY</strong></h2>
  <p class='last-min-active exercise'>${currentUser.getMinutesActiveOnDay(currentDate)}
  </p>
  `
};
