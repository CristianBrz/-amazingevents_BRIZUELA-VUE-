// import data from "./data.js";

import {eventDetail} from "./functions.js";

const $container = document.getElementById("detailCard");
const $back = document.getElementById("buttonBack");

let data = [];

async function getData() {
  try {
    const apiUrl = "/assets/json/amazing.json";
    const response = await fetch(apiUrl);
    data = await response.json();
    // hideSpinner(); // Escondo el spinner antes de imprimir las cards
		const queryString = location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    const event = data.events.find((event) => event._id == id);
		eventDetail(event, $container);
  } catch (error) {
    console.log(error);
  }
}

getData();


$back.addEventListener('click', () => {
	window.history.back();
});
