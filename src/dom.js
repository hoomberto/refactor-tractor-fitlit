// -------------------SCSS Imports----------------------
import './css/base.scss';
import './css/styles.scss';

// -------------------NPM Package Imports----------------------
import dayjs from 'dayjs';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

// -------------------Class Imports----------------------
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';

// -------------------Chart Imports----------------------
import {
  renderWaterConsumed
} from './charts/hydration-charts/water-consumed-chart.js'
import {
  renderWaterOverWeek
} from './charts/hydration-charts/water-over-week.js'
import {
  renderStepsMiles
} from './charts/activity-charts/steps-miles-chart.js'
import {
  renderAllTimeSleep
} from './charts/sleep-charts/allTime-sleep-chart.js'
import {
  renderSleepQuality
} from './charts/sleep-charts/latest-sleep-chart.js'
import {
  renderUserStepGoalVsAverage
} from './charts/activity-charts/user-step-goal-vs-avg.js'
import {
  renderLastMinActive
} from './charts/activity-charts/last-min-active.js'
import {
  renderUserAnalyticsVsAll
} from './charts/activity-charts/activity-analytics-vs-all.js'
import {
  renderSleepOverWeek
} from './charts/sleep-charts/weekly-sleep-chart.js'
import {
  renderWeeklyActivity
} from './charts/activity-charts/weekly-activity-analytics-chart.js'

// -----------------------GLOBAL VARIABLES--------------------
let user;
// -----------------------QUERY SELECTORS---------------------------
const userCard = document.getElementById('userinfo');
const friends = document.getElementById('dropDownContent');
const friendsBtn = document.getElementById('friendsDropDown');
// PAGE LOAD

export const renderPage = (currentUser, currentDate, userRepo, firstDate) => {
  renderWaterConsumed(currentUser, currentDate)
  renderWaterOverWeek(currentUser, currentDate)
  renderStepsMiles(currentUser, currentDate)
  renderAllTimeSleep(currentUser, currentDate)
  renderSleepQuality(currentUser, currentDate)
  renderUserCard(currentUser);
  renderUserStepGoalVsAverage(currentUser, userRepo);
  renderLastMinActive(currentUser, currentDate);
  renderUserAnalyticsVsAll(currentUser, currentDate, userRepo)
  renderSleepOverWeek(currentUser, currentDate)
  renderWeeklyActivity(currentUser, currentDate)
  renderDatePicker(currentDate, firstDate, currentUser, userRepo)
  renderFriends(currentUser, userRepo);
  user = currentUser;
}

const toggleFriends = () => {
  friends.classList.toggle('hidden')
}

export const renderFriends = (currentUser, userRepo) => {
  friendsBtn.addEventListener('click', toggleFriends)
  friends.innerHTML = '';
  let userFriends = currentUser.friends.map(friend => {
    return userRepo.users.filter(user => {
      if (user.id === friend) {
        return user
      }
    })
  }).flat();
  friends.innerHTML += `
  <p class='friend-details'>${userFriends.map(friend => {
    return `${friend.name} | ${friend.dailyStepGoal} steps` + "<br>"}).join('')}
  </p>
  `
};

const renderUserCard = (currentUser) => {
  userCard.innerHTML = `
      <article id='user' width="300" height="300">
        <div class='user-greeting'>
          <h1>Welcome back, ${currentUser.name.split(' ')[0]}!</h1>
        </div>
        <section class='user-details' id='userDetails'>
            <div class='user-address' id='userAddress'>
              <p><strong> ADDRESS: </strong>${currentUser.address}</p>
            </div>
            <div class='user-email' id='userEmail'>
              <p><strong> EMAIL: </strong>${currentUser.email}</p>
            </div>
            <div class='user-step-goal' id='userStepGoal'>
              <p><strong> DAILY STEP GOAL: </strong>${currentUser.dailyStepGoal}</p>
            </div>
        </section>
      </article>
    `
};

export const renderDatePicker = (currentDate, firstDate, currentUser, userRepo) => {
  let current = new Date(currentDate)
  let min = new Date(firstDate)
  let picker = new Pikaday({
    field: document.getElementById('datePicker'),
    defaultDate: current,
    minDate: min,
    maxDate: current,
  })
  document.getElementById('datePicker').addEventListener('change', (event) => {
    let value = event.target.value
    let day = value.split(' ').slice(1, 4).join(' ')
    let formatted = dayjs(day).format("YYYY/MM/DD")
    resetCharts();
    renderCanvases()
    updateCharts(currentUser, formatted, userRepo)
  });
}

const updateCharts = (currentUser, formatted, userRepo) => {
  renderWaterConsumed(currentUser, formatted)
  renderWaterOverWeek(currentUser, formatted)
  renderStepsMiles(currentUser, formatted)
  renderAllTimeSleep(currentUser, formatted)
  renderSleepQuality(currentUser, formatted)
  renderUserStepGoalVsAverage(currentUser, userRepo);
  renderLastMinActive(currentUser, formatted);
  renderUserAnalyticsVsAll(currentUser, formatted, userRepo)
  renderSleepOverWeek(currentUser, formatted)
  renderWeeklyActivity(currentUser, formatted)
}

export const resetCharts = () => {
  let allChartContainers = document.querySelectorAll('.chart-ctr')
  allChartContainers.forEach(container => {
    container.innerHTML = ""
  })
}

export const renderCanvases = () => {
  document.getElementById('waterconsumed').innerHTML += `
    <canvas id="water-chart" width="300" height="300"></canvas>
    `
  document.getElementById('wateroverweek').innerHTML += `
    <canvas id="waterWeekChart" width="300" height="300"></canvas>
    `
  document.getElementById('latestsleepdata').innerHTML += `
    <canvas id="sleep-chart" width="300" height="300"></canvas>
    `
  document.getElementById('latestsleepoverweek').innerHTML += `
    <canvas id="sleepOverWeekChart" width="300" height="300"></canvas>
    `
  document.getElementById('alltimesleepavg').innerHTML += `
    <canvas id="allTimeSleep-chart" ></canvas>
    `
  document.getElementById('lateststepsmiles').innerHTML += `
    <canvas id="stepsMilesChart" width="300" height="300"></canvas>
    `
  document.getElementById('usergoalvsavg').innerHTML += `
    <canvas id="useravgchart"></canvas>
    `
  document.getElementById('activityvsuserbase').innerHTML += `
    <canvas id="userAnalyticsVsUserBase" width="626" height="312"></canvas>
    `
  document.getElementById('weeklyactivitydata').innerHTML += `
    <div id="min-stairs-container">
      <canvas id="minStairsAvgChart" width="224" height="300"></canvas>
    </div>
    <div id="steps-container">
      <canvas id="stepsAvgChart"  width="224" height="300"></canvas>
    </div>  `
}



const checkResponse = (response) => {
  if (!response.ok) {
    let error = new Error('BAD POST REQUEST')
    let message = `${response.status} code, ${error.message}`
    let userMessage = "*Please fill out all fields"
    document.querySelector('.error-message').innerText = userMessage
    throw error
  } else {
    document.querySelector('.error-message').innerText = ""
    closeModal();
    return response.json()
  }
}

const postData = (dataType, body) => {
  const root = 'http://localhost:3001/api/v1/'
  fetch(root + dataType, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(checkResponse)
    .catch(err => console.error(err))
}


function createSleepBody() {
  let userSleepDate = document.getElementById('sleep-input-date').value
  let userHoursSlept = parseFloat(document.getElementById('input-hours-slept').value)
  let userSleepQuality = parseFloat(document.getElementById('input-sleep-quality').value)
  if (!userSleepDate || !userHoursSlept || !userSleepQuality) {
    document.querySelector('.error-message').innerText = "Please fill out all fields"
    return
  }
  let sleep = {
    userID: user.id,
    date: userSleepDate,
    hoursSlept: userHoursSlept,
    sleepQuality: userSleepQuality
  }
  return new Sleep(sleep)
}

function createHydrationBody() {
  let userHydrationDate = document.getElementById('hydration-input-date').value
  let userOuncesConsumed = parseFloat(document.getElementById('input-ounces-number').value)
  let hydration = {
    userID: user.id,
    date: userHydrationDate,
    numOunces: userOuncesConsumed
  }
  return new Hydration(hydration)
}

function createActivityBody() {
  let userActivityDate = document.getElementById('activity-input-date').value
  let userNumberOfSteps = parseFloat(document.getElementById('user-step-number').value)
  let userMinutesActive = parseFloat(document.getElementById('user-minutes-active').value)
  let userStairsClimbed = parseFloat(document.getElementById('user-stairs-climbed').value)
  if (!userActivityDate || !userNumberOfSteps || !userMinutesActive || !userStairsClimbed) {
    document.querySelector('.error-message').innerText = "Please fill out all fields"
    return
  }
  let activity = {
    userID: user.id,
    date: userActivityDate,
    numSteps: userNumberOfSteps,
    minutesActive: userMinutesActive,
    flightsOfStairs: userStairsClimbed
  }
  return new Activity(activity)
}

function formSubmitClickHandler(event) {
  if (event.target.id === 'submit-sleep') {
    let sleepBody = createSleepBody();
    postData('sleep', sleepBody)
    // closeModal();
  }
  if (event.target.id === 'submit-hydration') {
    let hydrationBody = createHydrationBody();
    postData('hydration', hydrationBody)

    // closeModal();
  }
  if (event.target.id === 'submit-activity') {
    let activityBody = createActivityBody();

    postData('activity', activityBody)
    // closeModal();
  }
}

const addEntryBtn = document.getElementById('addEntryBtn');
const userInputModal = document.getElementById('userInputModal');

const getUserInput = () => {
  userInputModal.innerHTML = '';
  userInputModal.innerHTML +=
    `<article class='user-input-content'>
        <button class='close-modal' aria-label="close-modal">
          <i id='close' class="far fa-times-circle"></i>
        </button>
        <section class='user-input-form' id='userInputForm'>
          <h1 class='user-input-header'>What Would You Like To Add?</h1>
          <div class='data-buttons' id='dataButtons'>
            <button id='addSleep'>Sleep</button>
            <button id='addWater'>Water</button>
            <button id='addActivity'>Activity</button>
          </div>
        </section>
     </article>`
  openModal()
}

addEntryBtn.addEventListener('click', () => {
  getUserInput()
});

userInputModal.addEventListener('click', (event) => {
  modalClickHandler(event)
});

function modalClickHandler(event) {
  event.preventDefault();
  if (event.target.id === 'close') {
    closeModal();
  } else if (event.target.id === 'addSleep') {
    renderSleepInputField()
  } else if (event.target.id === 'addWater') {
    renderWaterInputField()
  } else if (event.target.id === 'addActivity') {
    renderActivityInputField()
  } else if (event.target.id === 'submit-activity' || event.target.id === 'submit-sleep' || event.target.id === 'submit-hydration') {
    formSubmitClickHandler(event);
    // closeModal();
  } else if (event.target.id === 'returnToSelection') {
    getUserInput();
  }
}

function openModal() {
  userInputModal.style.display = 'flex'
}

function closeModal() {
  userInputModal.style.display = 'none';
}


function renderWaterInputField() {
  let userInputForm = document.getElementById('userInputForm')
  userInputForm.innerHTML = ''
  userInputForm.innerHTML +=
    `<section class='user-input-form' id='userInputForm'>
      <form class='user-input-hydration' id='userInputHydration'>
        <h2>Add Water Intake</h2>
        <label for="hydration-user-date">Date</label>
        <input type="text" name="hydration-user-date" id="hydration-input-date" placeholder="yyyy/mm/dd" required>
        <label for="user-ounces-number">Ounces of Water Drank</label>
        <input type="number" name="user-ounces-number" id="input-ounces-number" min="0" required>
        <button class="submit-info" id="submit-hydration">Submit</button><p class="error-message"></p>
      </form>
     </section>
     <button class='return-to-selection' id='returnToSelection'>Go Back</button>`
}

function renderActivityInputField() {
  let userInputForm = document.getElementById('userInputForm')
  userInputForm.innerHTML = ''
  userInputForm.innerHTML +=
    `<section class='user-input-form' id='userInputForm'>
      <form class='user-input-activity' id='userInputActivity'>
        <h2>Add New Activity Data</h2>
        <label for="activity-user-date">Date</label>
        <input type="text" name="activity-user-date" id="activity-input-date" placeholder="yyyy/mm/dd">
        <label for="user-step-number">Number of Steps</label>
        <input type="number" name="user-step-number" id="user-step-number" mix="0">
        <label for="user-minutes-active">Active Minutes</label>
        <input type="number" name="user-minutes-active" id="user-minutes-active" min="0">
        <label for="user-stairs-climbed">Flight of Stairs Climbed</label>
        <input type="number" name="user-stairs-climbed" id="user-stairs-climbed" min="0">
        <button class="submit-info" id="submit-activity">Submit</button><p class="error-message"></p>
      </form>
     </section>
     <button class='return-to-selection' id='returnToSelection'>Go Back</button>`
}

function renderSleepInputField() {
  let userInputForm = document.getElementById('userInputForm')
  userInputForm.innerHTML = ''
  userInputForm.innerHTML +=
    `<section class='user-input-form' id='userInputForm'>
      <form class='user-input-sleep' id='userInputSleep'>
        <h2>Add New Sleep Data</h2>
        <label for="sleep-user-date">Date</label>
        <input type="text" name="sleep-user-input-date" id="sleep-input-date" placeholder="yyyy/mm/dd">
        <label for="user-hours-slept">Hours Slept</label>
        <input type="number" name="user-hours-slept" id="input-hours-slept" min="0" max="40">
        <label for="user-sleep-quality">Sleep Quality</label>
        <input type="number" name="user-sleep-quality" id="input-sleep-quality" min="1" max="5" placeholder="Enter a number from 1-5" step=".1">
        <input value="Submit" class="submit-info" id="submit-sleep" type="submit"><p class="error-message"></p>
      </form>
     </section>
     <button class='return-to-selection' id='returnToSelection'>Go Back</button>`
}
