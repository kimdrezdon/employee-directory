let employees = [];

$.ajax({
    url: 'https://randomuser.me/api/?nat=us&results=12',
    dataType: 'json',
    success: function(response) {
      employees = response.results;
      $.each(employees, function(i, employee) {
        $('#gallery').append(`<div class="card"></div>`);
        $('.card').eq(i).append(`<div class='card-img-container'></div>`);
        $('.card-img-container').eq(i).append(`<img class='card-img' src='${employee.picture.medium}' alt='profile picture'>`);
        $('.card').eq(i).append(`<div class='card-info-container'></div>`);
        $('.card-info-container').eq(i).append(`<h3 id='name' class='card-name cap'>${employee.name.first} ${employee.name.last}</h3>`);
        $('.card-info-container').eq(i).append(`<p class='card-text'>${employee.email}</p>`);
        $('.card-info-container').eq(i).append(`<p class='card-text cap'>${employee.location.city}</p>`);
      })
    }
});

$('body').on('click', '.card', function() {
  const i = $('.card').index(this);
  const employee = employees[i];
  $('body').append(`<div class='modal-container'></div>`);
  $('.modal-container').append(`<div class='modal'></div>`);
  $('.modal').append(`<button type='button' id='modal-close-btn' class='modal-close-btn'><strong>X</strong></button>`);
  $('.modal').append(`<div class='modal-info-container'></div>`);
  $('.modal-info-container').append(`<img class='modal-img' src='${employee.picture.large}' alt='profile picture'>`)
  $('.modal-info-container').append(`<h3 id='name' class='modal-name cap'>${employee.name.first} ${employee.name.last}</h3>`);
  $('.modal-info-container').append(`<p class='modal-text'>${employee.email}</p>`);
  $('.modal-info-container').append(`<p class='modal-text cap'>${employee.location.city}</p>`);
  $('.modal-info-container').append(`<hr>`);
  $('.modal-info-container').append(`<p class='modal-text'>${employee.cell}</p>`);
  $('.modal-info-container').append(`<p class='modal-text'>${employee.location.street} ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>`);
  $('.modal-info-container').append(`<p class='modal-text'>Birthday: ${employee.dob.date}</p>`);
});

$('body').on('click', '#modal-close-btn', function() {
  $('.modal-container').remove();
});