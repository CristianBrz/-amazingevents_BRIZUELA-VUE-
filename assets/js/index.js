const { createApp } = Vue;

import {
  resetForm,
  createCards,
  createCategories,
  createCheckbox,
  filterCheckbox,
  filterSearch,
  notFound,
} from "./functions.js";

const url = "/assets/json/amazing.json";

createApp({
  data() {
    return {
      events: [],
      categories: [],
      filteredEvents: [],
      searchValue: "",
      checked: [],
      filterByChecks: undefined
    };
  },

  created() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.events = data.events;
        this.categories = createCategories(this.events);
        this.filteredEvents = this.events;
        this.checked = this.checked;





      })
      .catch((err) => console.log(err));
  },

  methods: {
    filter(){

      this.filteredEvents = filterCheckbox(this.events, this.checked);
      this.filteredEvents = filterSearch(this.filteredEvents, this.searchValue);

      console.table("filteredEvents: " + this.filteredEvents);
    }
  },

  computed: {},
}).mount("#app");



/*
      console.clear();
      console.log("ok");
      console.log("checked: " + this.checked);
      console.log("searchValue: " + this.searchValue);
      console.log("filteredEvents: " + this.filteredEvents);


*/












// const $cards = document.getElementById("cards");
// const $checkboxes = document.getElementById("checkboxes");
// const $search = document.querySelector('input[placeholder="search"]');

// resetForm(); //reinicio el formulario (checkboxes y search)

// let data = [];
// let categories = "";

// async function getData() {
//   try {
//     const apiUrl = "/assets/json/amazing.json";
//     const response = await fetch(apiUrl);
//     data = await response.json();
//     // console.log(data.events);
//     // hideSpinner(); // Escondo el spinner antes de imprimir las cards
//     createCards(data.events, $cards);
//     categories = createCategories(data.events);
//     createCheckbox(categories, $checkboxes);
//   } catch (error) {
//     console.log(error);
//   }
// }
// getData();

// const filterAndPrint = () => {
//   const checked = document.querySelectorAll('input[type="checkbox"]:checked');
//   let dataFiltered = filterCheckbox(data.events, checked);
//   dataFiltered = filterSearch(dataFiltered, $search.value);

//   if (dataFiltered.length === 0) {
//     notFound($cards);
//   } else {
//     createCards(dataFiltered, $cards);
//   }
// };

// $checkboxes.addEventListener("change", () => {
//   filterAndPrint();
// });

// $search.addEventListener("input", () => {
//   filterAndPrint();
// });
