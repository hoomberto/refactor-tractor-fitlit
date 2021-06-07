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
const friendsDropDown = document.getElementById('friendsDropDown');
const friendsSelect = document.getElementById('userFriends');

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
    console.log(currentUser)
    currentDate = currentUser.hydration.sort((a, b) => a.date > b.date ? -1 : 1)[0]
    console.log(currentDate.date)
    renderWaterConsumed(currentUser, currentDate.date)
    renderWaterOverWeek(currentUser, currentDate.date)
    renderStepsMiles(currentUser, currentDate.date)
    renderAllTimeSleep(currentUser, currentDate.date)
    renderSleepQuality(currentUser, currentDate.date)
    renderUserCard(currentUser);
    renderUserStepGoalVsAverage(currentUser, userRepo);
    renderLastMinActive(currentUser, currentDate.date)
    renderUserAnalyticsVsAll(currentUser, currentDate.date, userRepo)
  })
})

friendsDropDown.addEventListener('click', () => {
  getFriends(currentUser)
});







const getFriends = (currentUser) => {
  friendsSelect.innerHTML = '';
  console.log('GETFRIENDS', currentUser)
  let userFriends = currentUser.friends.map(friend => {
      return userRepo.users.filter(user => {
          if (user.id === friend) {
              return user
          }
      })
  }).flat();
  console.log(userFriends)
  let userNames = userFriends.map(friend => friend.name)
  userNames.forEach(user => {
    friendsSelect.innerHTML +=
    `<option value='allFriends'>${user}</option>
    `
   })
  }


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



// const getUserInput = (currentUser) => {
//   console.log(currentUser)
//   userInputModal.innerHTML = '';
//   userInputModal.innerHTML +=
//   `<article class='user-input-content' id='${currentUser.id}'>
//       <div class='close-modal'>
//         <i class="far fa-times-circle" id="closeModal"></i>
//       </div>
//       <h1 class='input-header'></h1>
//   </article>`
//  openModal()
// }
// newUserEntry.addEventListener('click', () => {
//   getUserInput(currentUser)
// });
// xIcon.addEventListener('click', hideModal);
//
// const openModal = () => {
//   userInputModal.style.display = 'flex'
// }
//
// const hideModal = () => {
//   element.style.display = 'none'
// }
//


const newUserEntry = document.getElementById('addEntry');
const userInputModal = document.getElementById('userInputModal');

const getUserInput = (currentUser) => {
  console.log(currentUser)
  userInputModal.innerHTML = '';
  userInputModal.innerHTML +=
  `<article class='user-input-content' id='${currentUser.id}'>
      <div class='close-modal'>
        <i class="far fa-times-circle" id="closeModal"></i>
      </div>
      <h1 class='input-header'></h1>
  </article>`
 openModal()
}

newUserEntry.addEventListener('click', () => {
  getUserInput(currentUser)
});

userInputModal.addEventListener('click', (event) => {
  hideModal(event)
});

function hideModal(event){
  if(event.target.id === 'closeModal') {
    userInputModal.style.display = 'none'
  }
}

function openModal() {
  userInputModal.style.display = 'flex'
}






















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
