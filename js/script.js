let employees = [];
let employeeIndex = 0;

/**
 * Fetches data from the API for 12 students. Creates 12 card divs displaying some
 * basic info for each employee. Calls the createSearch function to create a search
 * component. Calls the cardEventListener function to attach an event listener to
 * each card div.
 */

fetch("https://randomuser.me/api/?nat=us&results=12")
  .then(response => response.json())
  .then(function(json) {
    employees = json.results;

    for (let i = 0; i < employees.length; i++) {
      const cardDiv = addElement("div", "card", document.querySelector("#gallery"));

      const cardImgDiv = addElement("div", "card-img-container", cardDiv);

      addImage("card-img", cardImgDiv, employees[i].picture.large);

      const cardInfoDiv = addElement("div", "card-info-container", cardDiv);

      const name = addElement("h3", "card-name cap", cardInfoDiv, `${employees[i].name.first} ${employees[i].name.last}`);
      name.setAttribute("id", "name");

      addElement("p", "card-text", cardInfoDiv, employees[i].email);

      addElement("p", "card-text cap", cardInfoDiv, employees[i].location.city);
    }

    createSearch();

    cardEventListener();
  })
  .catch(err => console.log(err));

/**
 * Attaches an event listener to each card div. When an employee's card
 * is clicked, the createModal function is called and a modal window opens.
 */
function cardEventListener() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((employee, i) => {
    employee.addEventListener("click", () => createModal(i));
  });
}

/**
 * Creates a search component. Attaches an event listener to the search button that
 * calls the filter function to filter the employee list.
 */
function createSearch() {
  const searchContainer = document.querySelector(".search-container");

  const searchForm = document.createElement("form");
  searchForm.setAttribute("action", "#");
  searchForm.setAttribute("method", "get");
  searchContainer.appendChild(searchForm);

  const searchInput = addElement("input", "search-input", searchForm);
  searchInput.setAttribute("type", "search");
  searchInput.setAttribute("id", "search-input");
  searchInput.placeholder = "Search employees...";

  const searchSubmit = addElement("input", "search-submit", searchForm);
  searchSubmit.setAttribute("type", "submit");
  searchSubmit.setAttribute("id", "search-submit");
  searchSubmit.setAttribute("value", "\ud83d\udd0d");

  searchInput.addEventListener("keyup", e => {
    filter();
  })

  searchSubmit.addEventListener("click", e => {
    e.preventDefault();
    filter();
  });
}

/**
 * Filters the employee list according to the user's input.
 */
function filter() {
  const searchInput = document.querySelector("#search-input");
  const userInput = searchInput.value.toUpperCase();
  const cards = document.querySelectorAll(".card");
  const employeeNames = document.querySelectorAll("h3");

  cards.forEach((employee, i) => {
    if (employeeNames[i].textContent.toUpperCase().includes(userInput)) {
      employee.style.display = "";
    } else {
      employee.style.display = "none";
    }
  });
}

/**
 * Adds a new element to the DOM
 */
function addElement(tagName, className, parent, text) {
  const newElement = document.createElement(tagName);
  newElement.className = className;
  if (text) {
    newElement.textContent = text;
  }
  parent.appendChild(newElement);
  return newElement;
}

/**
 * Adds a new button to the DOM
 */
function addButton(className, parent, id, innerHTML) {
  const newButton = addElement("button", className, parent);
  newButton.setAttribute("type", "button");
  newButton.setAttribute("id", id);
  newButton.innerHTML = innerHTML;
}

/**
 * Adds a new image to the DOM
 */
function addImage(className, parent, src) {
  const newImage = addElement("img", className, parent);
  newImage.setAttribute("src", src);
  newImage.setAttribute("alt", "profile picture");
  return newImage;
}

/**
 * Creates a modal window displaying more information about the employee who's card was
 * clicked on. Adds event listener to the modal close button. Calls the prevEventListener
 * and nextEventListener functions to add event listeners to the prev and next buttons
 * allowing user to toggle through the displayed employees without exiting the modal window.
 */
function createModal(i) {
  employeeIndex = i;

  const employee = employees[i];

  const modalContainer = addElement(
    "div",
    "modal-container",
    document.querySelector("body")
  );

  const modalDiv = addElement("div", "modal", modalContainer);

  addButton(
    "modal-close-btn",
    modalDiv,
    "modal-close-btn",
    "<strong>X</strong>"
  );

  const modalInfo = addElement("div", "modal-info-container", modalDiv);

  addImage("modal-img", modalInfo, employees[i].picture.large);

  const name = addElement("h3", "modal-name cap", modalInfo, `${employees[i].name.first} ${employees[i].name.last}`);
  name.setAttribute("id", "name");

  addElement("p", "modal-text", modalInfo, employees[i].email);

  addElement("p", "modal-text cap", modalInfo, employees[i].location.city);

  modalInfo.appendChild(document.createElement("hr"));

  addElement("p", "modal-text", modalInfo, employees[i].cell);

  addElement("p", "modal-text cap", modalInfo, `${employee.location.street.number} ${employee.location.street.name} \u00A0 ${employee.location.city}, ${employee.location.state} \u00A0 ${employee.location.postcode}`);

  addElement("p", "modal-text", modalInfo, `Birthday: ${employee.dob.date.slice(5,7)}/${employee.dob.date.slice(8, 10)}/${employee.dob.date.slice(0, 4)}`);

  const modalButtonDiv = addElement("div", "modal-btn-container", modalContainer);

  addButton("modal-prev btn", modalButtonDiv, "modal-prev", "Prev");

  addButton("modal-next btn", modalButtonDiv, "modal-next", "Next");

  document
    .querySelector("#modal-close-btn")
    .addEventListener("click", () => removeModal());

  prevEventListener();

  nextEventListener();
}

/**
 * Removes the modal window.
 */
function removeModal() {
  document
    .querySelector("body")
    .removeChild(document.querySelector(".modal-container"));
}

/**
 * Adds an event listener to the Prev button in the modal window. Allows the user to
 * toggle through the displayed employees without exiting the modal window.
 */
function prevEventListener() {
  document.querySelector("#modal-prev").addEventListener("click", () => {
    removeModal();

    const employeeCards = document.querySelectorAll(".card");
    let employee = employeeCards[employeeIndex];
    if (employeeIndex !== 0) {
      employeeIndex -= 1;
      employee = employeeCards[employeeIndex];
    } else {
      employeeIndex = employeeCards.length - 1;
      employee = employeeCards[employeeIndex];
    }
    while (employee.style.display === "none") {
      if (employeeIndex !== 0) {
        employeeIndex -= 1;
        employee = employeeCards[employeeIndex];
      } else {
        employeeIndex = employeeCards.length - 1;
        employee = employeeCards[employeeIndex];
      }
    }
    createModal(employeeIndex);
  });
}

/**
 * Adds an event listener to the Next button in the modal window. Allows the user to
 * toggle through the displayed employees without exiting the modal window.
 */
function nextEventListener() {
  document
    .querySelector("#modal-next")
    .addEventListener("click", () => {
      removeModal();

      const employeeCards = document.querySelectorAll(".card");
      let employee = employeeCards[employeeIndex];
      if (employeeIndex !== employeeCards.length - 1) {
        employeeIndex += 1;
        employee = employeeCards[employeeIndex];
      } else {
        employeeIndex = 0;
        employee = employeeCards[employeeIndex];
      }
      while (employee.style.display === "none") {
        if (employeeIndex !== employeeCards.length - 1) {
          employeeIndex += 1;
          employee = employeeCards[employeeIndex];
        } else {
          employeeIndex = 0;
          employee = employeeCards[employeeIndex];
        }
      }
      createModal(employeeIndex);
    });
}
