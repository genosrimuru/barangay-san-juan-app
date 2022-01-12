$('#all-pages').css('display', 'none')
$('#logout-button').css('display', 'none')

$('#login-user').click(() => {
  $.ajax({
    url: '/login',
    method: 'POST',
    data: {
      username: $('#username').val(),
      password: $('#password').val()
    },
    success: function(result) {
      if (result.success) {
        $('#all-pages').css('display', 'block')
        $('#login-form').css('display', 'none')
        $('#logout-button').css('display', 'block')
        fetchVisualization(0)
      } else {
        alert('Wrong username or password')
      }
    }
  })
})

$('#logout-button').click(() => {
  $('#all-pages').css('display', 'none')
  $('#login-form').css('display', 'block')
  $('#logout-button').css('display', 'none')

  $('#Population-Table').css('display', 'none')
  $('#Index-Table').css('display', 'block')
  $('#hr').css('display', 'none')
  $('.citizen').css('display', 'none')
  $('#btn-add').css('display', 'none')
  $('#buhay').css('display', 'none')
  $('#buhay-label').css('display', 'none')
  $('#purok-label').css('display', 'none')
  $('#zone').css('display', 'none')
  $('#btn-filter').css('display', 'none')
  $('#btn-filter-data').css('display', 'none')
  $('#about').css('display', 'none')
  $('#financial-view').css('display', 'none')
  $('.schedule').css('display', 'none')
})
