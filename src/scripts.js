import './css/base.scss';
import './css/styles.scss';
import apiCalls from './apiCalls'

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import { renderWaterConsumed } from './charts/hydration-charts/water-consumed-chart.js'
import { renderWaterOverWeek } from './charts/hydration-charts/water-over-week.js'
import { renderStepsMiles } from './charts/activity-charts/steps-miles-chart.js'
import { renderAllTimeSleep } from './charts/sleep-charts/allTime-sleep-chart.js'
import { renderSleepQuality } from './charts/sleep-charts/latest-sleep-chart.js'
import { renderUserStepGoalVsAverage } from './charts/activity-charts/user-step-goal-vs-avg.js'
import { renderLastMinActive } from './charts/activity-charts/last-min-active.js'
import { renderUserAnalyticsVsAll } from './charts/activity-charts/activity-analytics-vs-all.js'

// -----------------------QUERY SELECTORS---------------------------

const userCard = document.getElementById('userinfo');
const friendsBtn = document.getElementById('friendsDropDown');
const friends = document.getElementById('dropDownContent');

// -----------------------GLOBAL VARIABLES--------------------
let currentDate, fetchUserData, fetchSleepData, fetchActivityData, fetchHydrationData, usersInstantiated, userRepo, currentUser

// -------------------EVENT LISTENERS----------------------


const getRandomArray = (array) => {
  return Math.floor(Math.random() * array.length)
}


window.addEventListener('load', function() {

  apiCalls.getData()
  .then(data => {
    fetchUserData = data[0]
    fetchSleepData = data[1];
    fetchActivityData = data[2];
    fetchHydrationData = data[3];

    let instaActivity = fetchActivityData.activityData.map(activity => new Activity(activity))
    let instaHydration = fetchHydrationData.hydrationData.map(hydration => new Hydration(hydration))
    let instaSleep = fetchSleepData.sleepData.map(sleep => new Sleep(sleep))
    usersInstantiated = fetchUserData.userData.map(user => {
      let correlatedSleep = instaSleep.filter(sleep => sleep.userID === user.id)
      let correlatedHydration = instaHydration.filter(hydration => hydration.userId === user.id)
      let correlatedActivity = instaActivity.filter(activity => activity.userId === user.id)
      return new User(user, correlatedSleep, correlatedHydration, correlatedActivity)
    });
    userRepo = new UserRepository(usersInstantiated)
    currentUser = userRepo.users[getRandomArray(userRepo.users)]
    console.log(userRepo)
    console.log('CURRENTUSER>>>>>', currentUser)
    currentDate = currentUser.hydration.sort((a, b) => a.date > b.date ? -1 : 1)[0]
    console.log(currentDate.date)
    renderWaterConsumed(currentUser, currentDate.date)
    renderWaterOverWeek(currentUser, currentDate.date)
    renderStepsMiles(currentUser, currentDate.date)
    renderAllTimeSleep(currentUser, currentDate.date)
    renderSleepQuality(currentUser, currentDate.date)
    renderUserCard(currentUser);
    renderUserStepGoalVsAverage(currentUser, userRepo);
    renderLastMinActive(currentUser, currentDate.date);
    renderUserAnalyticsVsAll(currentUser, currentDate.date, userRepo)
    renderFriends(currentUser)
  })
})






//need to invoke on pageload to populate these friends... then will apply hover to the FRIENDS button in nav
const renderFriends = (currentUser) => {
  friends.innerHTML = '';
  let userFriends = currentUser.friends.map(friend => {
      return userRepo.users.filter(user => {
          if (user.id === friend) {
              return user
          }
      })
  }).flat();
    console.log('FRIENDS', userFriends)
    friends.innerHTML +=
    `<p class='friend-details'>${userFriends.map(friend => {return `${friend.name} | ${friend.dailyStepGoal}` + "<br>"}).join('')}</p>`
  };


  const toggleFriends = () => {
    friends.classList.toggle('hidden')
  }


  friendsBtn.addEventListener('click', toggleFriends)



const renderUserCard = (currentUser) => {
  userCard.innerHTML =
  `   <article id='userinfo'>
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
      </article> `
};














function postData(dataType, body) {
  const root = 'http://localhost:3001/api/v1/'
  fetch(root + dataType, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => console.log(response.status))
    .catch(err => console.error(err))
}

function createSleepBody() {
  let userSleepDate = document.getElementById('sleep-input-date').value
  let userHoursSlept = parseFloat(document.getElementById('input-hours-slept').value)
  let userSleepQuality = parseFloat(document.getElementById('input-sleep-quality').value)
  let sleep = {userID: currentUser.id, date: userSleepDate, hoursSlept: userHoursSlept, sleepQuality: userSleepQuality}
  return new Sleep(sleep)
}

function createHydrationBody() {
  let userHydrationDate = document.getElementById('hydration-input-date').value
  let userOuncesConsumed = parseFloat(document.getElementById('input-ounces-number').value)
  let hydration = {userID: currentUser.id, date: userHydrationDate, numOunces: userOuncesConsumed}
  return new Hydration(hydration)
}

function createActivityBody() {
  let userActivityDate = document.getElementById('activity-input-date').value
  let userNumberOfSteps = parseFloat(document.getElementById('input-step-number').value)
  let userMinutesActive = parseFloat(document.getElementById('input-minutes-active').value)
  let userStairsClimbed = parseFloat(document.getElementById('input-stairs-climbed').value)
  let activity = {userID: currentUser.id, date: userActivityDate, numSteps: userNumberOfSteps, minutesActive: userMinutesActive, flightsOfStairs: userStairsClimbed}
  return new Activity(activity)
}

function formSubmitClickHandler(event) {
  if (event.target.id === 'submit-sleep') {
    let sleepBody = createSleepBody();
    postData('sleep', sleepBody)
    closeModal();
  }
  if (event.target.id === 'submit-hydration') {
    let hydrationBody = createHydrationBody();
    postData('hydration', hydrationBody)
    closeModal();
  }
  if (event.target.id === 'submit-activity') {
    let activityBody = createActivityBody();
    postData('activity', activityBody)
    closeModal();
  }
}


const newUserEntry = document.getElementById('addEntry');
const userInputModal = document.getElementById('userInputModal');

const getUserInput = (currentUser) => {
  console.log(currentUser)
  userInputModal.innerHTML = '';
  userInputModal.innerHTML +=
  `<article class='user-input-content'>
      <button class='close-modal' id='close'>
        <i class="far fa-times-circle"></i>
      </button>
      <h1 class='user-input-header'>Add New Fitness Data</h1>
        <form class='user-input-sleep' id='userInputSleep'>
          <h2>Add New Sleep Data</h2>
          <label for="sleep-user-date">Date</label>
          <input type="text" name="sleep-user-input-date" id="sleep-input-date" placeholder="yyyy/mm/dd">
          <label for="user-hours-slept">Hours Slept</label>
          <input type="number" name="user-hours-slept" id="input-hours-slept" min="0" max="40">
          <label for="user-sleep-quality">Sleep Quality</label>
          <input type="number" name="user-sleep-quality" id="input-sleep-quality" min="1" max="5" placeholder="Enter a number from 1-5" step=".1">
          <input value="Submit" class="submit-info" id="submit-sleep" type="submit">
        </form>
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
          <button class="submit-info" id="submit-activity">Submit</button>
        </form>
        <form class='user-input-hydration' id='userInputHydration'>
          <h2>Add New Hydration Data</h2>
          <label for="hydration-user-date">Date</label>
          <input type="text" name="hydration-user-date" id="hydration-input-date" placeholder="yyyy/mm/dd">
          <label for="user-ounces-number">Ounces of Water Drank</label>
          <input type="number" name="user-ounces-number" id="input-ounces-number" min="0">
          <button class="submit-info" id="submit-hydration">Submit</button>
        </form>
  </article>`
 openModal()
}

newUserEntry.addEventListener('click', () => {
  getUserInput(currentUser)
});

userInputModal.addEventListener('click', (event) => {
  modalClickHandler(event)
});

function modalClickHandler(event){
  event.preventDefault();
  if(event.target.id === 'close') {
    console.log('click')
    closeModal();
  } else if (event.target.id === 'submit-activity' || event.target.id === 'submit-sleep' || event.target.id === 'submit-hydration') {
    formSubmitClickHandler(event);
    closeModal();
  }
}

function openModal() {
  userInputModal.style.display = 'flex'
}

function closeModal() {
  userInputModal.style.display = 'none';
}































// ---------------------FARA WORK AREA-------------------------




























































// ----------------------------------------------------------------
//
// window.onload = fetchApiData('users').then(promise => {
//   fetchUserData = promise;
//
// }).then(console.log('in onload', fetchUserData))
//
//
// userData.forEach(user => {
//   user = new User(user);
//   userRepository.users.push(user)
// });
//
// activityData.forEach(activity => {
//   activity = new Activity(activity, userRepository);
// });
//
// hydrationData.forEach(hydration => {
//   hydration = new Hydration(hydration, userRepository);
// });
//
// sleepData.forEach(sleep => {
//   sleep = new Sleep(sleep, userRepository);
// });

// let user = userRepository.users[0];
// let todayDate = "2019/09/22";
// user.findFriendsNames(userRepository.users);

// let sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
//   if (Object.keys(a)[0] > Object.keys(b)[0]) {
//     return -1;
//   }
//   if (Object.keys(a)[0] < Object.keys(b)[0]) {
//     return 1;
//   }
//   return 0;
// });

//
// function flipCard(cardToHide, cardToShow) {
//   cardToHide.classList.add('hide');
//   cardToShow.classList.remove('hide');
// }

// function showDropdown() {
//   userInfoDropdown.classList.toggle('hide');
// }
//
// function showInfo() {
//   if (event.target.classList.contains('steps-info-button')) {
//     flipCard(stepsMainCard, stepsInfoCard);
//   }
//   if (event.target.classList.contains('steps-friends-button')) {
//     flipCard(stepsMainCard, stepsFriendsCard);
//   }
//   if (event.target.classList.contains('steps-trending-button')) {
//     flipCard(stepsMainCard, stepsTrendingCard);
//   }
//   if (event.target.classList.contains('steps-calendar-button')) {
//     flipCard(stepsMainCard, stepsCalendarCard);
//   }
//   if (event.target.classList.contains('hydration-info-button')) {
//     flipCard(hydrationMainCard, hydrationInfoCard);
//   }
//   if (event.target.classList.contains('hydration-friends-button')) {
//     flipCard(hydrationMainCard, hydrationFriendsCard);
//   }
//   if (event.target.classList.contains('hydration-calendar-button')) {
//     flipCard(hydrationMainCard, hydrationCalendarCard);
//   }
//   if (event.target.classList.contains('stairs-info-button')) {
//     flipCard(stairsMainCard, stairsInfoCard);
//   }
//   if (event.target.classList.contains('stairs-friends-button')) {
//     flipCard(stairsMainCard, stairsFriendsCard);
//   }
//   if (event.target.classList.contains('stairs-trending-button')) {
//     flipCard(stairsMainCard, stairsTrendingCard);
//   }
//   if (event.target.classList.contains('stairs-calendar-button')) {
//     flipCard(stairsMainCard, stairsCalendarCard);
//   }
//   if (event.target.classList.contains('sleep-info-button')) {
//     flipCard(sleepMainCard, sleepInfoCard);
//   }
//   if (event.target.classList.contains('sleep-friends-button')) {
//     flipCard(sleepMainCard, sleepFriendsCard);
//   }
//   if (event.target.classList.contains('sleep-calendar-button')) {
//     flipCard(sleepMainCard, sleepCalendarCard);
//   }
//   if (event.target.classList.contains('steps-go-back-button')) {
//     flipCard(event.target.parentNode, stepsMainCard);
//   }
//   if (event.target.classList.contains('hydration-go-back-button')) {
//     flipCard(event.target.parentNode, hydrationMainCard);
//   }
//   if (event.target.classList.contains('stairs-go-back-button')) {
//     flipCard(event.target.parentNode, stairsMainCard);
//   }
//   if (event.target.classList.contains('sleep-go-back-button')) {
//     flipCard(event.target.parentNode, sleepMainCard);
//   }
// }
//
// function updateTrendingStairsDays() {
//   user.findTrendingStairsDays();
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
// }
//
// function updateTrendingStepDays() {
//   user.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
// }
//
// for (var i = 0; i < dailyOz.length; i++) {
//   dailyOz[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
// }
//
// dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;
//
// dropdownEmail.innerText = `EMAIL | ${user.email}`;
//
// dropdownName.innerText = user.name.toUpperCase();
//
// headerName.innerText = `${user.getFirstName()}'S `;
//
// hydrationUserOuncesToday.innerText = hydrationData.find(hydration => {
//   return hydration.userID === user.id && hydration.date === todayDate;
// }).numOunces;
//
// hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);
//
// hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
//   return hydration.userID === user.id && hydration.date === todayDate;
// }).numOunces / 8;
//
// sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);
//
// sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);
//
// sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
//   return user.id === userRepository.getLongestSleepers(todayDate)
// }).getFirstName();
//
// sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
//   return user.id === userRepository.getWorstSleepers(todayDate)
// }).getFirstName();
//
// sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;
//
// stepsInfoMilesWalkedToday.innerText = user.activityRecord.find(activity => {
//   return (activity.date === todayDate && activity.userId === user.id)
// }).calculateMiles(userRepository);
//
// sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;
//
// sleepInfoQualityToday.innerText = sleepData.find(sleep => {
//   return sleep.userID === user.id && sleep.date === todayDate;
// }).sleepQuality;
//
// sleepUserHoursToday.innerText = sleepData.find(sleep => {
//   return sleep.userID === user.id && sleep.date === todayDate;
// }).hoursSlept;
//
// stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);
//
// stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
//
// stairsFriendFlightsAverageToday.innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);
//
// stairsInfoFlightsToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).flightsOfStairs;
//
// stairsUserStairsToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).flightsOfStairs * 12;
//
// stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);
//
// stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
//
// stairsTrendingButton.addEventListener('click', function() {
//   user.findTrendingStairsDays();
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
// });
//
// stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageMinutesActiveThisWeek(todayDate);
//
// stepsCalendarTotalStepsWeekly.innerText = user.calculateAverageStepsThisWeek(todayDate);
//
// stepsTrendingButton.addEventListener('click', function() {
//   user.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
// });
//
// stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageMinutesActive(todayDate);
//
// stepsFriendAverageStepGoal.innerText = `${userRepository.calculateAverageStepGoal()}`;
//
// stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate);
//
// stepsInfoActiveMinutesToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).minutesActive;
//
// stepsUserStepsToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).numSteps;
//
// user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
//
// user.friendsActivityRecords.forEach(friend => {
//   dropdownFriendsStepsContainer.innerHTML += `
//   <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
//   `;
// });
//
// let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');
//
// friendsStepsParagraphs.forEach(paragraph => {
//   if (friendsStepsParagraphs[0] === paragraph) {
//     paragraph.classList.add('green-text');
//   }
//   if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
//     paragraph.classList.add('red-text');
//   }
//   if (paragraph.innerText.includes('YOU')) {
//     paragraph.classList.add('yellow-text');
//   }
// });
