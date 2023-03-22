// import data from "./data.js";

import {
  resetForm,
  filterPastEvents,
  createCards,
  createCategories,
  createCheckbox,
  filterCheckbox,
  filterSearch,
  notFound,
} from "./functions.js";

/***********************************************/

const $cards = document.getElementById("cards");
const $checkboxes = document.getElementById("checkboxes");
const $search = document.querySelector('input[placeholder="search"]');

resetForm(); //reinicio el formulario (checkboxes y search)

let data = [];
let pastEvents = [];
let categories = "";

async function getData() {
  try {
    const apiUrl = "/assets/json/amazing.json";
    const response = await fetch(apiUrl);
    data = await response.json();
    // console.log(data.events);
    // hideSpinner(); // Escondo el spinner antes de imprimir las cards
    pastEvents = filterPastEvents(data.events, data.currentDate);
    createCards(pastEvents, $cards);
    categories = createCategories(data.events);
    createCheckbox(categories, $checkboxes);
  } catch (error) {
    console.log(error);
  }
}

getData();

const filterAndPrint = () => {
  const checked = document.querySelectorAll('input[type="checkbox"]:checked');
  let dataFiltered = filterCheckbox(pastEvents, checked);
  dataFiltered = filterSearch(dataFiltered, $search.value);

  if (dataFiltered.length === 0) {
    notFound($cards);
  } else {
    createCards(dataFiltered, $cards);
  }
};

$checkboxes.addEventListener("change", () => {
  filterAndPrint();
});

$search.addEventListener("input", () => {
  filterAndPrint();
});
