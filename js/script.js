$.ajax({
    url: 'https://randomuser.me/api/?nat=us&results=12',
    dataType: 'json',
    success: function(response) {
      $.each(response.results, function(i, employee) {
        $('#gallery').append(`<div class="card"></div>`);
        $('.card').eq(i).append(`<div class='card-img-container'></div>`);
        $('.card-img-container').eq(i).append(`<img class='card-img' src='${employee.picture.large}' alt='profile picture'>`);
        $('.card').eq(i).append(`<div class='card-info-container'></div>`);
        $('.card-info-container').eq(i).append(`<h3 id='name' class='card-name cap'>${employee.name.first} ${employee.name.last}</h3>`);
        $('.card-info-container').eq(i).append(`<p class='card-text'>${employee.email}</p>`);
        $('.card-info-container').eq(i).append(`<p class='card-text cap'>${employee.location.city}, ${employee.location.state}</p>`);
      })
    }
});