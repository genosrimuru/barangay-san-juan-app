const createCitizen = document.getElementById("submit-citizen")
const population = document.getElementById("Population-tab")
const visualization = document.getElementById("Visualization-tab")
const btnAdd = document.getElementById("btn-add")
const btnbackpopulation = document.getElementById("btn-back-population")
const formclose = document.getElementById("form-close")
const about = document.getElementById("About-tab")


about.addEventListener('click', function(){
  $('#Population-Table').css('display', 'none')
  $('#Index-Table').css('display', 'none')
  $('#hr').css('display', 'none')
  $('.citizen').css('display', 'none')
  $('#btn-add').css('display', 'none')
  $('#buhay').css('display', 'none')
  $('#buhay-label').css('display', 'none')
  $('#purok-label').css('display', 'none')
  $('#zone').css('display', 'none')
  $('#btn-filter').css('display', 'none')
  $('#btn-filter-data').css('display', 'none')
  $('#about').css('display', 'block')
  $('#financial-view').css('display', 'none')
  $('.schedule').css('display', 'none')
})

population.addEventListener('click', function(){
  $('#Population-Table').css('display', 'block')
  $('#Index-Table').css('display', 'none')
  $('#btn-add').css('display', 'block')
  $('#hr').css('display', 'block')
  $('.citizen').css('display', 'none')
  $('#buhay').css('display', 'block')
  $('#buhay-label').css('display', 'block')
  $('#purok-label').css('display', 'block')
  $('#zone').css('display', 'block')
  $('#btn-filter').css('display', 'block')
  $('#btn-filter-data').css('display', 'block')
  $('#about').css('display', 'none')
  $('#financial-view').css('display', 'none')
  $('.schedule').css('display', 'none')
})
btnbackpopulation.addEventListener('click', function(){
  $('#Population-Table').css('display', 'block')
  $('#Index-Table').css('display', 'none')
  $('#btn-add').css('display', 'block')
  $('#hr').css('display', 'block')
  $('.citizen').css('display', 'none')
  $('#buhay').css('display', 'block')
  $('#buhay-label').css('display', 'block')
  $('#purok-label').css('display', 'block')
  $('#zone').css('display', 'block')
  $('#btn-filter').css('display', 'block')
  $('#btn-filter-data').css('display', 'block')
  $('.schedule').css('display', 'none')
})

formclose.addEventListener('click', function(){
  $('#form-edit').css('display', 'none')
})

btnAdd.addEventListener('click', function(){
  $('#Population-Table').css('display', 'none')
  $('#Index-Table').css('display', 'none')
  $('#hr').css('display', 'none')
  $('.citizen').css('display', 'block')
  $('#btn-add').css('display', 'none')
  $('#purok-label').css('display', 'none')
  $('#zone').css('display', 'none')
  $('#btn-filter').css('display', 'none')
  $('#btn-filter-data').css('display', 'none')
  $('#buhay-label').css('display', 'none')
  $('#buhay').css('display', 'none')
  $('.schedule').css('display', 'none')
})

visualization.addEventListener('click', function(){
  fetchVisualization($('#visualization-filter').val())
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
  $('.schedule').css('display', 'none')
  $('#financial-view').css('display', 'none')
})


createCitizen.addEventListener('click', function(){
  event.preventDefault()
    $.ajax({
    url: '/add-citizen',
    method: 'POST',
    data: {
      name: $('#citizen-name').val(),
      age: $('#citizen-age').val(),
      gender: $('#citizen-gender').val(),
      status: $('#citizen-status').val(),
      zone: $('#citizen-zone').val(),
      work: $('#citizen-work').val(),
      income: $('#citizen-income').val(),
      budget: $('#citizen-budget').val(),
      class: $('#citizen-class').val(),
      educational: $('#citizen-educational').val()
    },
    success: function (result) {
      $('#citizen-name').val('')
      $('#citizen-age').val('')
      $('#citizen-gender').val('')
      $('#citizen-status').val('')
      $('#citizen-zone').val('')
      $('#citizen-work').val('')
      $('#citizen-income').val('')
      $('#citizen-budget').val('')
      $('#citizen-class').val('')
      $('#citizen-educational').val('')
      fetchCitizen()
      fetchVisualization($('#visualization-filter').val())
    }

  })
})



function fetchCitizen() {
    $.ajax({
      url: '/fetch-citizen',
        method: 'GET',
        success: function(result) {
          $('#Population-Table').html('\
            <tr>\
                <th>Name</th>\
                <th>Age</th>\
                <th>Gender</th>\
                <th>Civil Status</th>\
                <th>Zone</th>\
                <th>Work</th>\
                <th>Sourse of Income</th>\
                <th>Budget</th>\
                <th>Social Class</th>\
                <th>Educational Attainment</th>\
                <th>Action</th>\
            </tr>\
          ')

          $('#btn-filter').click(function() {
            const filterByBuhay = $('#buhay').val()
            const filterByZone = $('#zone').val()
            for (var j = 0; j < $('.pop-data').length; j++) {
              if (document.getElementsByClassName('pop-data')[j].getAttribute('zone') == filterByZone && document.getElementsByClassName('pop-data')[j].getAttribute('social') == filterByBuhay) {
                document.getElementsByClassName('pop-data')[j].style.display = 'table-row'
              } else {
                document.getElementsByClassName('pop-data')[j].style.display = 'none'
              }
            }
            
          })

          $('#btn-filter-data').click(function(){
            for (var j = 0; j < $('.pop-data').length; j++) {
              document.getElementsByClassName('pop-data')[j].style.display = 'table-row'
            } 
          })

          for (var i = 0; i < result.length; i++) {
              $('#Population-Table').append(`\
                <tr class="pop-data" zone="${ result[i].Zone }" social="${ result[i].SocialClass }">\
                    <td>${ result[i].Name }</td>\
                    <td>${ result[i].Age}</td>\
                    <td>${ result[i].Gender}</td>\
                    <td>${ result[i].CivilStatus}</td>\
                    <td>${ result[i].Zone}</td>\
                    <td>${ result[i].Work}</td>\
                    <td>${ result[i].Income}</td>\
                    <td>${ result[i].Budget}</td>\
                    <td>${ result[i].SocialClass}</td>\
                    <td>${ result[i].EducationalAttainment }</td>\
                    <td> <button class="ud-button" id="update-${ i }" pop-name="${result[i].Name}"><i class="fas fa-user-edit"></i></button> &nbsp;

                    <button class="ud-button" id="citizen-${ i }-delete" citizen-name="${ result[i].Name }" citizen-age="${ result[i].Age }"><i class="fas fa-trash-alt"></i></button></td>
                </tr>\

              `)


          const btnupdate = document.getElementById("update")
          const newrecord = document.getElementById("new-record")

          document.getElementById(`update-${ i }`).addEventListener('click', function(){
                 $('#form-edit').css('display', 'block')
                const popname = $(this).attr('pop-name')
                 newrecord.addEventListener('click', function(){
                   if ($('#newname').val().length > 0) {
                    event.preventDefault()
                  $.ajax({
                    url: '/edit-record',
                    method: 'POST',
                    data:{
                      currentname: popname,
                      newname: $('#newname').val(),
                      newage:$('#newage').val(),
                      newgender: $('#newgender').val(),
                      newstatus: $('#newstatus').val(),
                      newzone: $('#newzone').val(),
                      newwork: $('#newwork').val(),
                      newincome: $('#newincome').val(),
                      newbudget: $('#newbudget').val(),
                      newclass: $('#newclass').val(),
                      neweducational: $('#neweducational').val()
                    },
                    success: function(result){
                      fetchCitizen()
                      fetchVisualization($('#visualization-filter').val())
                    }
                  })
                 }
                })
              })

              $(`#citizen-${ i }-delete`).click(function() {
                  $.ajax({
                      url: '/delete-citizen',
                      method: 'POST',
                      data: {
                          name: $(this).attr('citizen-name'),
                          age: $(this).attr('citizen-age')
                      },
                      success: function(result) {
                          alert('Deleted')
                          fetchCitizen()
                          fetchVisualization($('#visualization-filter').val())
                      }
                  })
              })

              $(`#citizen-${ i }-update`).click(function() {
                $.ajax({
                    url: '/update-citizen',
                    method: 'POST',
                    data: {
                        name: $(this).attr('citizen-name'),
                        age: $(this).attr('citizen-age'),
                        gender: $(this).attr('citizen-gender'),
                        status: $(this).attr('citizen-status'),
                        zone: $(this).attr('citizen-zone'),
                        work: $(this).attr('citizen-work'),
                        income: $(this).attr('citizen-income'),
                        budget: $(this).attr('citizen-budget'),
                        class: $(this).attr('citizen-class'),
                        educational: $(this).attr('citizen-educational')
                    },
                    success: function(result) {
                        alert('Edit')
                        fetchCitizen()
                        fetchVisualization($('#visualization-filter').val())
                    }
                })
            })
        }
        }
    })
}




$(document).ready(function() {
    fetchCitizen()
})
