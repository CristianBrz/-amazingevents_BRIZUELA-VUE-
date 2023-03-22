const fragment = document.createDocumentFragment();

// reinicio del formulario al retroceder con el botón "Go Back" en la página details
export const resetForm = () => {
  window.addEventListener("pageshow", () => {
    const form = document.getElementById("form");
    form.reset();
  });
};

// Creo las cards
export const createCards = (array, container) => {
  container.innerHTML = ``;
  array.forEach((event) => {
    let div = document.createElement("article");
    div.className = "col";
    div.innerHTML += `
                      <div class="card h-100 hover">
                        <img
                          src="${event.image}"
                          class="card-img-top h-50"
                          alt="${event.name} image"
                        >
                      
                        <div class="card-body">
                          <h5 class="card-title">${event.name}</h5>
                          <p class="card-text">${event.category}</p>
                        </div>
                        
                        <div class="card-footer d-flex justify-content-between">
                          <p class="m-2">$ ${event.price}</p>
                          <a href="../pages/details.html?id=${event._id}" class="btn btn-outline-danger">
                          See more
                          </a>
                        </div>
                      </div>
                    `;
    fragment.appendChild(div);
  });
  container.appendChild(fragment);
};

// Extraigo las categorias del array original, y elimino los duplicados

export const createCategories = (array) => {
  let categories = array.map((category) => category.category);
  categories = categories.reduce((accum, element) => {
    if (!accum.includes(element)) {
      accum.push(element);
    }
    return accum;
  }, []);
  return categories;
};

/* Otra forma. Ver si esta bien

const createCategories = (array) => {
  let categories = array.map((category) => category.category);
  categories = new Set(categories);
  return categories;
};
/*

/* Creo checkboxes con las categorias extraidas */

export const createCheckbox = (array, container) => {
  array.forEach((category) => {
    let div = document.createElement("div");
    div.className = `form-check px-4 col-12 col-sm-3`;
    div.innerHTML = `
                      <label class="form-check-label" for="${category.toLowerCase()}">
                        <input
                          type="checkbox"
                          name="category"
                          class="form-check-input"
                          value="${category.toLowerCase()}"
                          id="${category.toLowerCase()}">
                        <span class="fw-semibold">${category}</span>
                      </label>
                    `;
    container.appendChild(div);
  });
};

// filtro con checkboxes

export const filterCheckbox = (array, checked) => {
  // const checked = document.querySelectorAll('input[type="checkbox"]:checked');
  const filterCheckboxes = checked;

  if (filterCheckboxes.length > 0) {
    const filteredArray = array.filter((event) =>
      filterCheckboxes.includes(event.category.toLowerCase())
    );
    console.log("filt " + filteredArray);
    return filteredArray;
  } else {
    const filteredArray = array;
    console.log("ffff " + filteredArray);
    return filteredArray;
  }
};

// filtro con el search

export const filterSearch = (array, value) => {
  let filteredArray = array.filter((element) =>
    element.name.toLowerCase().includes(value.toLowerCase())
  );
  return filteredArray;
};

export const notFound = (container) => {
  container.innerHTML = ``;
  let div = document.createElement("article");
  div.className = "col";
  div.innerHTML += `
                    <div class="card h-100 hover">
                    <img
                      src="../assets/img/error.jpg"
                      class="card-img-top h-50"
                      alt="Event not found">
                    <div class="card-body">
                      <h5 class="card-title">Event not found</h5>
                      <p class="card-text">Please, try again</p>
                    </div>
                  `;
  fragment.appendChild(div);
  container.appendChild(fragment);
};

export const filterUpcomingEvents = (array, currentDate) => {
  const upcomingEvents = array.filter((event) => event.date > currentDate);
  return upcomingEvents;
};

export const filterPastEvents = (array, currentDate) => {
  const pastEvents = array.filter((event) => event.date < currentDate);
  return pastEvents;
};

export const eventDetail = (event, container) => {
  let div = document.createElement("article");
  div.className = "row g-0 heigthCard";

  const assistanceEstimate = event.hasOwnProperty("assistance")
    ? `<li class="list-group-item">Assistance: ${event.assistance} </li>`
    : `<li class="list-group-item">Estimate: ${event.estimate} </li>`;

  div.innerHTML = `
										<div class="col-lg-7">
											<img
												src="${event.image}"
												class="rounded w-100 h-100"
												alt="${event.name} image">
										</div>
										<div class="col-lg-5">
											<div class="card-body">
												<h5 class="card-title">${event.name}</h5>
												<div class="card-text">
													<ul class="list-group list-group-flush">
														<li class="list-group-item">${event.date}</li>
														<li class="list-group-item">${event.description}</li>
														<li class="list-group-item">Categoty: ${event.category}</li>
														<li class="list-group-item">Place: ${event.place}</li>
														<li class="list-group-item">Capacity: ${event.capacity}</li>
														${assistanceEstimate}															
														<li class="list-group-item">Price: $ ${event.price}</li>
													</ul>
												</div>
											</div>
										</div>
									`;
  container.appendChild(div);
};

export const addEstimateRevenuesUpcoming = (upcomingEvents) => {
  let newUpcoming = upcomingEvents.forEach((upcomingEvents) => {
    upcomingEvents.attendance = Number(
      ((upcomingEvents.estimate / upcomingEvents.capacity) * 100).toFixed(1)
    );
    upcomingEvents.revenues = upcomingEvents.estimate * upcomingEvents.price;
  });
  return newUpcoming;
};

export const addEstimateRevenuesPast = (pastEvents) => {
  pastEvents.forEach((pastEvents) => {
    pastEvents.attendance = Number(
      ((pastEvents.assistance / pastEvents.capacity) * 100).toFixed(1)
    );
    pastEvents.revenues = pastEvents.assistance * pastEvents.price;
  });
};


export const maxAttendEvents = (upcoming, past) => {
  let array = upcoming.concat(past);

  array.sort((a, b) => b.attendance - a.attendance);

  const maxAttendance = array[0].attendance;

  return array.filter((event) => event.attendance === maxAttendance);
};

export const minAttendEvents = (upcoming, past) => {
  let array = upcoming.concat(past);

  array.sort((a, b) => a.attendance - b.attendance);

  const minAttendance = array[0].attendance;

  return array.filter((event) => event.attendance === minAttendance);
};

export const largestEvent = (upcoming, past) => {
  let array = upcoming.concat(past);

  array.sort((a, b) => b.capacity - a.capacity);

  const capacity = array[0].capacity;

  return array.filter((event) => event.capacity === capacity);
};

export const createStatistics = (array, container) => {
  array.forEach((attendance) => {
    let div = document.createElement("li");
    div.innerHTML = `
                    ${attendance.name}
                    `;
    fragment.appendChild(div);
  });
  container.appendChild(fragment);
};

export const statisticsByCategory = (categories, events, container) => {
  categories.sort();
  categories.forEach((category) => {
    let revenuesTotal = 0;
    let attendanceTotal = 0;
    let capacityTotal = 0;
    let assistTotal = 0;

    let eventsByCategory = events.filter(
      (event) => event.category === category
    );

    eventsByCategory.forEach((event) => {
      revenuesTotal += event.revenues;

      event.hasOwnProperty("assistance")
        ? (assistTotal += event.assistance)
        : (assistTotal += event.estimate);

      capacityTotal += event.capacity;

      attendanceTotal = Number(
        ((assistTotal / capacityTotal) * 100).toFixed(0)
      );

    });

      let div = document.createElement("tr");
      div.className = "row m-0";
      div.innerHTML = `
                        <td class="col-4">${category}</td>
                        <td class="col-4 text-end">$ ${revenuesTotal.toLocaleString()}</td>
                        <td class="col-4 text-center">${attendanceTotal}%</td>
                      `;
      fragment.appendChild(div);
    container.appendChild(fragment);

    // console.log(category);
    // console.log(revenuesTotal);
  });
};
