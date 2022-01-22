const createCitizen = document.getElementById("submit-citizen")
const population = document.getElementById("Population-tab")
const visualization = document.getElementById("Visualization-tab")
const btnAdd = document.getElementById("btn-add")
const btnbackpopulation = document.getElementById("btn-back-population")
const formclose = document.getElementById("form-close")
const about = document.getElementById("About-tab")
const btnSearch = document.getElementById("Search")


let socialclass = 0
  let budget = ""
  let socialClass = 0


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
  $('#Search').css('display', 'none')
  $('#Search-input').css('display', 'none')
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
  $('#Search').css('display', 'block')
  $('#Search-input').css('display', 'block')

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
  $('#Search').css('display', 'block')
  $('#Search-input').css('display', 'block')
})

formclose.addEventListener('click', function(){
  $('#form-edit').css('display', 'none')
  event.preventDefault()
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
  $('#Search').css('display', 'none')
  $('#Search-input').css('display', 'none')

  $('#budget').change(function() {
    socialclass = $('#budget').val()
    $('#fillclass').val(socialclass)
    console.log($('#fillclass').val())
    switch ($('#budget').val()) {
      case 'poor': budget = '< 5000'
      socialClass = 1
      break
      case 'low': budget = '5000 - 10000'
      socialClass = 2
      break
      case 'middle': budget = '10001 - 20000'
      socialClass = 3
      break
      case 'high': budget = '> 20000'
      socialClass = 4
      break
    }
   })
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
  $('#Search').css('display', 'none')
  $('#Search-input').css('display', 'none')
})


btnSearch.addEventListener('click', function(){
  for(var i = 0 ; i < $('.pop-data').length ; i++)
  {
    if(document.getElementsByClassName('pop-data')[i].getAttribute('citizen-name').toLowerCase().includes($('#Search-input').val().toLowerCase()) ){
      document.getElementsByClassName('pop-data')[i].style.display='table-row'
    }
    else
    document.getElementsByClassName('pop-data')[i].style.display='none'
  }
})


createCitizen.addEventListener('click', function(){
  if ( $('#zitizen-name').val()!= "" && $('#citizen-age').val() != "" && $('#selectgender').val() != "" && $('#selectcivilstatus').val() != "" && $('#selectzone').val() != "" && $('#citizen-work').val() != "" && $('#selectincome').val() != "" && $('#budget').val() != "" && $('#selecteducation').val() != ""){
  event.preventDefault()

  $('#Confirmation').css('display', 'block')
  $('#confirmation-message').text('Add this data?')

  $('#confirmation-accept').click(function() {
    $('#Confirmation').css('display', 'none')
    $.ajax({
      url: '/add-citizen',
      method: 'POST',
      data: {
        name: $('#citizen-name').val(),
        age: $('#citizen-age').val(),
        gender: $('#selectgender').val(),
        status: $('#selectcivilstatus').val(),
        zone: parseInt($('#selectzone').val()),
        work: $('#citizen-work').val(),
        income: $('#selectincome').val(),
        budget: budget,
        class: parseInt(socialClass),
        educational: $('#selecteducation').val()
      },
      success: function (result) {
        $('#citizen-name').val('')
        $('#citizen-age').val('')
        $('#selectgender').val('')
        $('#selectcivilstatus').val('')
        $('#selectzone').val('')
        $('#citizen-work').val('')
        $('#selectincome').val('')
        $('#budget').val('')
        $('#selecteducation').val('')
        fetchCitizen()
        fetchVisualization($('#visualization-filter').val())
      }
  
    })
  })
  $('#confirmation-cancel').click(function() {
    $('#Confirmation').css('display', 'none')
  })
  }
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
                <th>Source of Income</th>\
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
                <tr citizen-name="${result[i].Name}" class="pop-data" zone="${ result[i].Zone }" social="${ result[i].SocialClass }">\
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
                 const splitCount = $(this).attr('id')
                 const countLoop = splitCount.split('update-')

                  $('#newname').val(result[countLoop[1]].Name),
                  $('#newage').val(result[countLoop[1]].Age),
                  $('#newgender').val(result[countLoop[1]].Gender),
                  $('#newstatus').val(result[countLoop[1]].CivilStatus),
                  $('#newzone').val(result[countLoop[1]].Zone),
                  $('#newwork').val(result[countLoop[1]].Work),
                  $('#newincome').val(result[countLoop[1]].Income),
                  $('#newbudget').val(result[countLoop[1]].Budget),
                  $('#newclass').val(result[countLoop[1]].SocialClass),
                  $('#neweducational').val(result[countLoop[1]].EducationalAttainment)

                const popname = $(this).attr('pop-name')
                 newrecord.addEventListener('click', function(){
                   if ($('#newname').val().length > 0) {
                    event.preventDefault()

                    $('#Confirmation').css('display', 'block')
                    $('#confirmation-message').text('Update this data?')
                  
                    $('#confirmation-accept').click(function() {
                      $('#Confirmation').css('display', 'none')
                      $('#form-edit').css('display', 'none')
                      
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

                    })
                    $('#confirmation-cancel').click(function() {
                      $('#Confirmation').css('display', 'none')
                    })

                 
                 }
                })
              })

              $(`#citizen-${ i }-delete`).click(function() {
                const citizenName = $(this).attr('citizen-name')
                const citizenAge =  $(this).attr('citizen-age')
                event.preventDefault()
                $('#Confirmation').css('display', 'block')
                $('#confirmation-message').text('Delete this data?')
              
                $('#confirmation-accept').click(function() {
                  $('#Confirmation').css('display', 'none')
                  $.ajax({
                    url: '/delete-citizen',
                    method: 'POST',
                    data: {
                        name: citizenName,
                        age: citizenAge
                    },
                    success: function(result) {
                        fetchCitizen()
                        fetchVisualization($('#visualization-filter').val())
                    }
                })
                })
                $('#confirmation-cancel').click(function() {
                  $('#Confirmation').css('display', 'none')
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
