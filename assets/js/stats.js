// import data from "./data.js";

import {
  filterUpcomingEvents,
  filterPastEvents,
  addEstimateRevenuesUpcoming,
  addEstimateRevenuesPast,
  maxAttendEvents,
  minAttendEvents,
  largestEvent,
  createStatistics,
  createCategories,
  statisticsByCategory
} from "./functions.js";


const highestAttendance = document.getElementById("highestAttendance");
const lowestAttendance = document.getElementById("lowestAttendance");
const largestEvnt = document.getElementById("largestEvents");
const upcomingStats = document.getElementById("upcomingStats");
const pastStats = document.getElementById("pastStats");

let data = [];
let upcomingEvents = [];
let pastEvents = [];
let categories = "";

async function getData() {
  try {
    const apiUrl = "/assets/json/amazing.json";
    const response = await fetch(apiUrl);
    data = await response.json();
    // console.log(data.events);
    // hideSpinner(); // Escondo el spinner antes de imprimir las cards
    upcomingEvents = filterUpcomingEvents(data.events, data.currentDate);
    pastEvents = filterPastEvents(data.events, data.currentDate);
    categories = createCategories(data.events);
    addEstimateRevenuesUpcoming(upcomingEvents);
    addEstimateRevenuesPast(pastEvents);

    let maxAttendanceEvents = maxAttendEvents(upcomingEvents, pastEvents);
    let minAttendanceEvents = minAttendEvents(upcomingEvents, pastEvents);
    let largestEvents = largestEvent(upcomingEvents, pastEvents);

    createStatistics(maxAttendanceEvents, highestAttendance);
    createStatistics(minAttendanceEvents, lowestAttendance);
    createStatistics(largestEvents, largestEvnt);

    statisticsByCategory(categories, upcomingEvents, upcomingStats);
    statisticsByCategory(categories, pastEvents, pastStats);

  } catch (error) {
    console.log(error);
  }
}

getData();