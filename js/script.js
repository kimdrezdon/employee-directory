let employees = [];
let employeeIndex = 0;

fetch('https://randomuser.me/api/?nat=us&results=12')
  .then(response => response.json())
  .then(function (json) {
    employees = json.results;
    
    for(let i=0; i < employees.length; i++) {
      const cardDiv = addElement('div', 'card', document.querySelector('#gallery'));
      
      const cardImgDiv = addElement('div', 'card-img-container', cardDiv);
    
      const cardImg = addImage('card-img', cardImgDiv, employees[i].picture.medium);
      
      const cardInfoDiv = addElement('div', 'card-info-container', cardDiv);
      
      const name = addElement('h3', 'card-name cap', cardInfoDiv);
      name.setAttribute('id', 'name');
      name.textContent = `${employees[i].name.first} ${employees[i].name.last}`;
      
      const email = addElement('p', 'card-text', cardInfoDiv);
      email.textContent = employees[i].email;
      
      const location = addElement('p', 'card-text cap', cardInfoDiv);
      location.textContent = employees[i].location.city;
    }
    
    createSearch();
    
    const cards = document.querySelectorAll('.card');
    cards.forEach((employee, i) => {
      employee.addEventListener('click', () => createModal(i));
    });
  })
  .catch(err => console.log(err));
    
function createSearch() { 
  const searchContainer = document.querySelector('.search-container');
  
  const searchForm = document.createElement('form');
  searchForm.setAttribute('action', '#');
  searchForm.setAttribute('method', 'get');
  searchContainer.appendChild(searchForm);

  const searchInput = addElement('input', 'search-input', searchForm);
  searchInput.setAttribute('type', 'search');
  searchInput.setAttribute('id', 'search-input');
  searchInput.setAttribute('placeholder', 'Search...');
 
  const searchSubmit = addElement('input', 'search-submit', searchForm);
  searchSubmit.setAttribute('type', 'submit');
  searchSubmit.setAttribute('id', 'search-submit');
  searchSubmit.setAttribute('value', '\ud83d\udd0d');
}

function addElement(tagName, className, parent) {
  const newElement = document.createElement(tagName);
  newElement.className = className;
  parent.appendChild(newElement);
  return newElement;
}

function addButton(className, parent, id, innerHTML) {
  const newButton = addElement('button', className, parent);
  newButton.setAttribute('type', 'button');
  newButton.setAttribute('id', id);
  newButton.innerHTML = innerHTML;
}

function addImage(className, parent, src){
  const newImage = addElement('img', className, parent);
  newImage.setAttribute('src', src);
  newImage.setAttribute('alt', 'profile picture');
  return newImage;
}

function createModal (i) {
  employeeIndex = i;
  
  const employee = employees[i];
    
  const modalContainer = addElement('div', 'modal-container', document.querySelector('body'));

  const modalDiv = addElement('div', 'modal', modalContainer);

  const closeButton = addButton('modal-close-btn', modalDiv, 'modal-close-btn', '<strong>X</strong>');

  const modalInfo = addElement('div', 'modal-info-container', modalDiv);

  const modalImg = addImage('modal-img', modalInfo, employees[i].picture.large);

  const name = addElement('h3', 'modal-name cap', modalInfo);
  name.setAttribute('id', 'name');
  name.textContent = `${employees[i].name.first} ${employees[i].name.last}`;
  
  const email = addElement('p', 'modal-text', modalInfo);
  email.textContent = employees[i].email;

  const location = addElement('p', 'modal-text cap', modalInfo);
  location.textContent = employees[i].location.city;

  modalInfo.appendChild(document.createElement('hr'));

  const phone = addElement('p', 'modal-text', modalInfo);
  phone.textContent = employees[i].cell;

  const address = addElement('p', 'modal-text cap', modalInfo);
  address.textContent = `${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;

  const birthday = addElement('p', 'modal-text', modalInfo);
  birthday.textContent = `Birthday: ${employee.dob.date.slice(5,7)}/${employee.dob.date.slice(8,10)}/${employee.dob.date.slice(0,4)}`;

  const modalButtonDiv = addElement('div', 'modal-btn-container', modalContainer);

  const prevButton = addButton('modal-prev btn', modalButtonDiv, 'modal-prev', 'Prev');

  const nextButton = addButton('modal-next btn', modalButtonDiv, 'modal-next', 'Next');
}

$('body').on('click', '#modal-close-btn', function() {
  document.querySelector('body').removeChild(document.querySelector('.modal-container'));
});

$('body').on('click', '#modal-prev', function() {
  console.log('prev button clicked');
  console.log(this)
});

$('body').on('click', '#modal-next', function() {
  console.log('next button clicked');
});