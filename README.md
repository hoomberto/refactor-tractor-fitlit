# *FitLit*

### Table of Contents
- [Overview](#overview-and-project-goals)
- [Learning Goals](#learning-goals)
- [Functionality](#functionality)
- [Future Additions](#future-additions)
- [Instructions For Running Project](#instructions-for-running-project-locally)
- [How To Contribute](#want-to-contribute)
- [Contributors](#contributors)

## Overview and Project Goals
FitLit is an application built in week 10 of [Turing School of Software and Design](https://turing.io/).  The goal of this group [project](https://frontend.turing.edu/projects/module-2/refactor-tractor.html) was to refactor an existing codebase to build a responsive fitness tracking application.

### Learning Goals

To solidify and demonstrate the understanding of:

- Building on top of a pre-existing codebase
- Implementing SCSS to DRY up repetitive styling
- Utilizing Lighthouse to pass ARIA audits
- Making network requests to API endpoints to retrieve and manipulate data
- Utilizing third party packages
- Creating an enjoyable user experience and responsive user interface

## Functionality

-Site pulls in data from API and selects a random user on load, displaying their stats for the latest day<br>
![alt text](https://media.giphy.com/media/MrNwZqVPeOlpcu4F0I/giphy.gif "Demo of random user on load")

-Date picker that lets user go through a navigable calendar of dates corresponding to the current users data<br>
-Choosing a date loads the data corresponding to selection<br>
![alt text](https://media.giphy.com/media/dTbWqLdK5LH3mvsxiv/giphy.gif "Demo of site date picker")

-User is able to see their friends + friends' daily step goals<br>
![alt text](https://media.giphy.com/media/fr6WYH3SC24K8suBIw/giphy.gif "Demo of friends list")

-Site features responsive and interactive charts that visually represent data pertaining to the user's<br>
activity, sleep, and hydration analytics<br>
![alt text](https://media.giphy.com/media/3NnAxDGExfDxBPPx6k/giphy.gif "Demo of interactive charts")

-User is able to POST and add analytics data via form accessible from navigation bar<br>
-All forms have error handling that ask user to input data correctly if they have not done so<br>
![alt text](https://media.giphy.com/media/pJZ3ik3nCeiADf19Fm/giphy.gif "Demo of POST form")

-Site is responsive and will change layouts across desktop, tablet, and phone screens<br>
![alt text](https://media.giphy.com/media/2yn1mr4EHfQhM755a4/giphy.gif "Demo of responsiveness across media")

-Site has a lighthouse accessibility rating of 100%<br>
![alt text](https://i.ibb.co/3chcGQn/Screen-Shot-2021-06-08-at-10-25-42-PM.png "Accessibility rating")


## Future Additions

- *Add User/User Login* functionality to add a new account and login
- *Friend Challenge* functionality to challenge friends in daily step goal
- *Share* ability to share a proud achievement via social media, email, or text

**[Back to top](#table-of-contents)**

## Instructions for Running Project Locally

1. Clone down this [repository](https://github.com/hoomberto/refactor-tractor-fitlit)
2. `cd` into the repository in your terminal
3. Run `npm install` to install npm 
4. Run `npm install dayjs` to install dayJS
5. Run `npm install chart.js` to install Chart.js
6. Run `npm i pikaday` to install Pikaday
7. Run `npm install --save @fortawesome/fontawesome-free` to install FontAwesome 
8. Run `npm start` and visit `localhost:8080`
9. To test the code, run `npm test`

### Want to contribute?
If you would like to contribute, please fork this repository and clone it down to your local machine. Once you've successfully implemented the changes in code necessary for your intended contribution without changing any of the current functionality of main, submit a pull request for authors to review the changes.

## Technologies Used

- HTML
- SCSS
- JavaScript
- Webpack
- Mocha
- Chai
- Dayjs
- Chart.js
- Font-awesome
- Pikaday

## Contributors
#### Authors
- [Steven Berg](https://github.com/saberg1)
- [Rachael Carroll](https://github.com/rachaelcarroll)
- [Bobby Vasquez](https://github.com/hoomberto)
- [Fara Akhatova](https://github.com/Fakhatova)

#### Project Manager
- [Hannah Hudson](https://github.com/hannahhch)

**************************************************************************

**[Back to top](#table-of-contents)**
