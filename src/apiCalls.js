const fetchUsersData = () => {
  return fetch('http://localhost:3001/api/v1/users')
    .then(response => response.json())
    .catch(err => console.error("not working"))
}
const fetchSleepData = () => {
  return fetch('http://localhost:3001/api/v1/sleep')
    .then(response => response.json())
    .catch(err => console.error("not working"))
}
const fetchActivityData = () => {
  return fetch('http://localhost:3001/api/v1/activity')
    .then(response => response.json())
    .catch(err => console.error("not working"))
}
const fetchHydrationData = () => {
  return fetch('http://localhost:3001/api/v1/hydration')
    .then(response => response.json())
    .catch(err => console.error("not working"))
}
const getData = () => {
  return Promise.all([fetchUsersData(), fetchSleepData(), fetchActivityData(), fetchHydrationData()])
}
export default {
  // fetchUsersData,
  // fetchSleepData,
  // fetchActivityData,
  // fetchHydrationData,
  getData
}