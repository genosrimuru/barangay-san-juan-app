const btnaddschedule = document.getElementById("btn-add-Schedule")
const financial = document.getElementById("Financial-tab")
const createSchedule = document.getElementById("submit-schedule")
const btnbackfinancial = document.getElementById("btn-back-financial")

financial.addEventListener('click', function(){
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
    $('#about').css('display', 'none')
    $('#financial-view').css('display', 'flex')
    $('.schedule').css('display', 'none')
  })

  btnbackfinancial.addEventListener('click', function(){
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
    $('#about').css('display', 'none')
    $('#financial-view').css('display', 'flex')
    $('.schedule').css('display', 'none')
    $('#form-edit-schedule').css('display', 'none')
  })

  btnaddschedule.addEventListener('click', function(){
    $('#Population-Table').css('display', 'none')
    $('#Index-Table').css('display', 'none')
    $('#hr').css('display', 'none')
    $('.citizen').css('display', 'none')
    $('#btn-add').css('display', 'none')
    $('#purok-label').css('display', 'none')
    $('#zone').css('display', 'none')
    $('#btn-filter').css('display', 'none')
    $('#btn-filter-data').css('display', 'none')
    $('#buhay-label').css('display', 'none')
    $('#buhay').css('display', 'none')
    $('.schedule').css('display', 'block')
  })

  fetchSchedule()


  createSchedule.addEventListener('click', function(){ 
    if ( $('#schedule-zone').val()!= "" && $('#schedule-socialclass').val() != "" && $('#schedule-scheduledate').val() != "" && $('#schedule-scheduletime').val() != "" && $('#schedule-amount').val() != ""){
      event.preventDefault()
      $.ajax({
      url: '/add-schedule',
      method: 'POST',
      data: {
        zone: $('#schedule-zone').val(),
        socialclass: $('#schedule-socialclass').val(),
        scheduledate: $('#schedule-scheduledate').val(),
        scheduletime: $('#schedule-scheduletime').val(),
        amount: $('#schedule-amount').val()
      },
      success: function (result) {
        $('#schedule-zone').val('')
        $('#schedule-socialclass').val('')
        $('#schedule-scheduledate').val('')
        $('#schedule-scheduletime').val('')
        $('#schedule-amount').val('')
        fetchSchedule()
        
      }
  
    })  
    }
    
  })

function fetchSchedule(){
  
    $.ajax({
        url: '/fetch-schedule',
        method: 'GET',
        success: function(result) {
            $('#Financial-Table').html('\
              <tr>\
                  <th>Zone</th>\
                  <th>Social Class</th>\
                  <th>Schedule Date</th>\
                  <th>Schedule Time</th>\
                  <th>Amount</th>\
                  <th></th>\
              </tr>\
            ')

            for (var k = 0; k < result.length; k++) {
                $('#Financial-Table').append(`\
                  <tr class="pop-data" Zone="${ result[k].Zone }" social="${ result[k].Socialclass }">\
                      <td>${ result[k].Zone}</td>\
                      <td>${ result[k].Socialclass}</td>\
                      <td>${ result[k].Scheduledate}</td>\
                      <td>${ result[k].Scheduletime}</td>\
                      <td>${ result[k].Amount}</td>\
                      <td> <button class="ud-button" id="edit-${ k }" pop-sched-date="${ result[k].Scheduledate }" pop-sched-time="${ result[k].Scheduletime }" pop-zone="${result[k].Zone}"><i class="fas fa-user-edit"></i></button>

                      <button class="ud-button" id="schedule-${ k }-delete" schedule-zone="${ result[k].Zone }" schedule-socialclass="${ result[k].Socialclass }" schedule-scheduledate="${ result[k].Scheduledate}"schedule-scheduletime="${ result[k].Scheduletime }" schedule-amount="${ result[k].Amount }"><i class="fas fa-trash-alt"></i></button></td>

                    </tr>\
                `)
                const btnedit = document.getElementById("edit")
                const newsched = document.getElementById("new-sched")
                const closesched = document.getElementById("close-form-sched")

                closesched.addEventListener('click', function(){
                  event.preventDefault()
                  $('#form-edit-schedule').css('display', 'none')
                })

                document.getElementById(`edit-${ k }`).addEventListener('click', function(){
                  
                  $('#form-edit-schedule').css('display', 'block')
                 const popzone = $(this).attr('pop-zone')
                 const popdate = $(this).attr('pop-sched-date')
                 const poptime = $(this).attr('pop-sched-time')
                  newsched.addEventListener('click', function(){
                    if ($('#newzone1').val().length > 0) {
                     event.preventDefault()
                   $.ajax({
                     url: '/edit-schedule',
                     method: 'POST',
                     data:{
                       currentzone: popzone,
                       currentdate: popdate,
                       currenttime: poptime,
                       newzone1: $('#newzone1').val(),
                       newsocialclass:$('#newsocialclass').val(),
                       newscheduledate: $('#newscheduledate').val(),
                       newscheduletime: $('#newscheduletime').val(),
                       newamount: $('#newamount').val(),
                     
                     },
                     success: function(result){
                       fetchSchedule()
                     
                     }
                   })
                  }
                 })
               })

               $(`#schedule-${ k }-delete`).click(function() {
                event.preventDefault()
                $.ajax({
                    url: '/delete-schedule',
                    method: 'POST',
                    data: {
                        zone: $(this).attr('schedule-zone'),
                        socialclass: $(this).attr('schedule-socialclass'),
                        scheduledate: $(this).attr('schedule-scheduledate'),
                        scheduletime: $(this).attr('schedule-scheduletime'),
                        amount: $(this).attr('schedule-amount'),
                    },
                    success: function(result) {
                        alert('Deleted')
                        fetchSchedule()
                    }
                })
            })

            }
        }
     })
}
