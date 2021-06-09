// API / DAYJS
import apiCalls from './apiCalls'
// import dayjs from 'dayjs';
// Class imports
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';

// dom.js import
import { renderPage } from './dom.js'

// -----------------------GLOBAL VARIABLES--------------------
let currentDate, firstDate, fetchUserData, fetchSleepData, fetchActivityData, fetchHydrationData, userRepo, currentUser

const getRandomArray = (array) => {
  return Math.floor(Math.random() * array.length)
}

const correlateUsers = (users, activityData, hydrationData, sleepData) => {
  return users.userData.map(user => {
    let correlatedSleep = sleepData.filter(sleep => sleep.userID === user.id)
    let correlatedHydration = hydrationData.filter(hydration => hydration.userId === user.id)
    let correlatedActivity = activityData.filter(activity => activity.userId === user.id)
    return new User(user, correlatedSleep, correlatedHydration, correlatedActivity)
  });
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

      userRepo = new UserRepository(correlateUsers(fetchUserData, instaActivity, instaHydration, instaSleep))
      currentUser = userRepo.users[getRandomArray(userRepo.users)]
      currentDate = currentUser.hydration.sort((a, b) => a.date > b.date ? -1 : 1)[0];
      firstDate = currentUser.hydration.sort((a, b) => a.date > b.date ? 1 : -1)[0];
      renderPage(currentUser, currentDate.date, userRepo, firstDate)
    })
})
