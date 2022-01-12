fetchVisualization(0)

$('#visualization-filter-btn').click(function() {
  fetchVisualization($('#visualization-filter').val())
})

function fetchVisualization(filter) {
  $.ajax({
    url: '/visualization',
    method: 'GET',
    success: function(result) {
     
      let poorArr = [], lowArr = [], midArr = [], highArr = [], socialClass = 0
      let maleArr = [], femaleArr = [], gender = 0
      let singleArr = [], marriedArr = [], widowArr = [], separatedArr = [], unknownArr = [], widowerArr = [], civil = 0
      let collegeArr = [], currStudyingArr = [], elemArr = [], nyStudyingArr = [], primArr = [], secArr = [], sUnknownArr = [], educational = 0
      for (var i = 1; i <= 5; i++) {
        let poor = low = mid = high = 0 // Social class
        let male = female = 0 // Gender
        let single = married = widow = widower = unknown = separated = 0 // Civil status
        let college = currStudying = elem = nyStudying = prim = sec = sunknown = 0 // Educational Attainment
        for (var j = 0; j < result.length; j++) {
          if (result[j].Zone == i) {
            // Check social status
            if (result[j].SocialClass > 0 && result[j].SocialClass < 5) socialClass++
            if (result[j].SocialClass == 1) poor++
            else if (result[j].SocialClass == 2) low++
            else if (result[j].SocialClass == 3) mid++
            else if (result[j].SocialClass == 4) high++
            // Check gender
            if (result[j].Gender.toLowerCase() == "male" || result[j].Gender.toLowerCase() == "female") gender++
            if (result[j].Gender.toLowerCase() == "male") male++
            else if(result[j].Gender.toLowerCase() == "female") female++
            // Check civil status
            if (result[j].CivilStatus.toLowerCase() == "single") {
              single++
              civil++
            }
            else if (result[j].CivilStatus.toLowerCase() == "married") {
              married++
              civil++
            }
            else if (result[j].CivilStatus.toLowerCase() == "widow") {
              widow++
              civil++
            }
            else if (result[j].CivilStatus.toLowerCase() == "widower") {
              widower++
              civil++
            }
            else if (result[j].CivilStatus.toLowerCase() == "unknown") {
              unknown++
              civil++
            }
            else if (result[j].CivilStatus.toLowerCase() == "separated") {
              separated++
              civil++
            }
            // Check educational
            if (result[j].EducationalAttainment.toLowerCase() == "college") {
              college++
              educational++
            } else if (result[j].EducationalAttainment.toLowerCase() == "currently studying") {
              currStudying++
              educational++
            } else if (result[j].EducationalAttainment.toLowerCase() == "elementary") {
              elem++
              educational++
            } else if (result[j].EducationalAttainment.toLowerCase() == "not yet studying") {
              nyStudying++
              educational++
            } else if (result[j].EducationalAttainment.toLowerCase() == "primary") {
              prim++
              educational++
            } else if (result[j].EducationalAttainment.toLowerCase() == "secondary") {
              sec++
              educational++
            } else if (result[j].EducationalAttainment.toLowerCase() == "unknown") {
              sunknown++
              educational++
            }
          }
        }
        // Push to array (social)
        poorArr.push(poor)
        lowArr.push(low)
        midArr.push(mid)
        highArr.push(high)
        // Push to array (gender)
        maleArr.push(male)
        femaleArr.push(female)
        // Push to array (civil)
        singleArr.push(single)
        marriedArr.push(married)
        widowArr.push(widow)
        widowerArr.push(widower)
        unknownArr.push(unknown)
        separatedArr.push(separated)
        // Push to array (educational)
        collegeArr.push(college)
        currStudyingArr.push(currStudying)
        elemArr.push(elem)
        nyStudyingArr.push(nyStudying)
        primArr.push(prim)
        secArr.push(sec)
        sUnknownArr.push(sunknown)
      }

      if (filter == 0) {
        var chart = bb.generate({
          data: {
            x: "purok",
            columns: [
                ["purok", "Purok 1", "Purok 2", "Purok 3", "Purok 4", "Purok 5"],
                ["High", highArr[0], highArr[1], highArr[2], highArr[3], highArr[4]],
                ["Middle", midArr[0], midArr[1], midArr[2], midArr[3], midArr[4]],
                ["Low", lowArr[0], lowArr[1], lowArr[2], lowArr[3], lowArr[4]],
                ["Poor", poorArr[0], poorArr[1], poorArr[2], poorArr[3], poorArr[4]]
            ],
            colors: {
                  High: "yellow",
                  Middle: "red",
                  Low: "orange",
                  Poor: "blue"
            },
            type: "bar",
          },
          axis: {
            x: {
              type: "category"
            }
          },
          bindto: "#visualization-chart"
        })

        $('#visualization-table').html(`\
          <tr>\
            <th>Zone</th>\
            <th>Poor</th>\
            <th>Low Income</th>\
            <th>Middle Income</th>\
            <th>High Income</th>\
          </tr>\
          <tr>\
            <th>1</th>\
            <th>${ poorArr[0] }</th>\
            <th>${ lowArr[0] }</th>\
            <th>${ midArr[0] }</th>\
            <th>${ highArr[0] }</th>\
          </tr>\
          <tr>\
            <th>2</th>\
            <th>${ poorArr[1] }</th>\
            <th>${ lowArr[1] }</th>\
            <th>${ midArr[1] }</th>\
            <th>${ highArr[1] }</th>\
          </tr>\
          <tr>\
            <th>3</th>\
            <th>${ poorArr[2] }</th>\
            <th>${ lowArr[2] }</th>\
            <th>${ midArr[2] }</th>\
            <th>${ highArr[2] }</th>\
          </tr>\
          <tr>\
            <th>4</th>\
            <th>${ poorArr[3] }</th>\
            <th>${ lowArr[3] }</th>\
            <th>${ midArr[3] }</th>\
            <th>${ highArr[3] }</th>\
          </tr>\
          <tr>\
            <th>5</th>\
            <th>${ poorArr[4] }</th>\
            <th>${ lowArr[4] }</th>\
            <th>${ midArr[4] }</th>\
            <th>${ highArr[4] }</th>\
          </tr>\
        `)
        $('#visualization-total').html(`\
          <tr>\
            <th>Total</th>\
          </tr>\
          <tr>\
            <td>Poor: ${ poorArr[0] + poorArr[1] + poorArr[2] + poorArr[3] + poorArr[4] }</td>\
          </tr>\
          <tr>\
            <td>Low Income: ${ lowArr[0] + lowArr[1] + lowArr[2] + lowArr[3] + lowArr[4] }</td>\
          </tr>\
          <tr>\
            <td>Middle Income: ${ midArr[0] + midArr[1] + midArr[2] + midArr[3] + midArr[4] }</td>\
          </tr>\
          <tr>\
            <td>High Income: ${ highArr[0] + highArr[1] + highArr[2] + highArr[3] + highArr[4] }</td>\
          </tr>\
        `)
        $('#vtotal-data').text(socialClass)
        $('#visualization-legends').html(`\
          <span id="chart-legend">Social Class</span>\
          <span class="legend-circle circle-yellow"></span>High Income\
          <span class="legend-circle circle-red"></span>Middle Income\
          <span class="legend-circle circle-orange"></span>Low Income\
          <span class="legend-circle circle-blue"></span>Poor\
        `)
      } else if (filter == 1) {
        var chart = bb.generate({
          data: {
            x: "purok",
            columns: [
                ["purok", "Purok 1", "Purok 2", "Purok 3", "Purok 4", "Purok 5"],
                ["Male", maleArr[0], maleArr[1], maleArr[2], maleArr[3], maleArr[4]],
                ["Female", femaleArr[0], femaleArr[1], femaleArr[2], femaleArr[3], femaleArr[4]]
            ],
            colors: {
                  Male: "blue",
                  Female: "red"
            },
            type: "bar",
          },
          axis: {
            x: {
              type: "category"
            }
          },
          bindto: "#visualization-chart"
        })

        $('#visualization-table').html(`\
          <tr>\
            <th>Zone</th>\
            <th>Male</th>\
            <th>Female</th>\
          </tr>\
          <tr>\
            <th>1</th>\
            <th>${ maleArr[0] }</th>\
            <th>${ femaleArr[0] }</th>\
          </tr>\
          <tr>\
            <th>2</th>\
            <th>${ maleArr[1] }</th>\
            <th>${ femaleArr[1] }</th>\
          </tr>\
          <tr>\
            <th>3</th>\
            <th>${ maleArr[2] }</th>\
            <th>${ femaleArr[2] }</th>\
          </tr>\
          <tr>\
            <th>4</th>\
            <th>${ maleArr[3] }</th>\
            <th>${ femaleArr[3] }</th>\
          </tr>\
          <tr>\
            <th>5</th>\
            <th>${ maleArr[4] }</th>\
            <th>${ femaleArr[4] }</th>\
          </tr>\
        `)
        $('#visualization-total').html(`\
          <tr>\
            <th>Total</th>\
          </tr>\
          <tr>\
            <td>Male: ${ maleArr[0] + maleArr[1] + maleArr[2] + maleArr[3] + maleArr[4] }</td>\
          </tr>\
          <tr>\
            <td>Female: ${ femaleArr[0] + femaleArr[1] + femaleArr[2] + femaleArr[3] + femaleArr[4] }</td>\
          </tr>\
        `)
        $('#vtotal-data').text(gender)
        $('#visualization-legends').html(`\
          <span id="chart-legend">Gender</span>\
          <span class="legend-circle circle-blue"></span>Male\
          <span class="legend-circle circle-red"></span>Female\
        `)
      } else if (filter == 2) {
        var chart = bb.generate({
          data: {
            x: "purok",
            columns: [
                ["purok", "Purok 1", "Purok 2", "Purok 3", "Purok 4", "Purok 5"],
                ["Single", singleArr[0], singleArr[1], singleArr[2], singleArr[3], singleArr[4]],
                ["Married", marriedArr[0], marriedArr[1], marriedArr[2], marriedArr[3], marriedArr[4]],
                ["Widow", widowArr[0], widowArr[1], widowArr[2], widowArr[3], widowArr[4]],
                ["Widower", widowerArr[0], widowerArr[1], widowerArr[2], widowerArr[3], widowerArr[4]],
                ["Separated", separatedArr[0], separatedArr[1], separatedArr[2], separatedArr[3], separatedArr[4]],
                ["Unknown", unknownArr[0], unknownArr[1], unknownArr[2], unknownArr[3], unknownArr[4]]
            ],
            colors: {
                  Single: "yellow",
                  Married: "orange",
                  Widow: "red",
                  Widower: "blue",
                  Separated: "green",
                  Unknown: "black"
            },
            type: "bar",
          },
          axis: {
            x: {
              type: "category"
            }
          },
          bindto: "#visualization-chart"
        })

        $('#visualization-table').html(`\
          <tr>\
            <th>Zone</th>\
            <th>Single</th>\
            <th>Married</th>\
            <th>Widow</th>\
            <th>Widower</th>\
            <th>Separated</th>\
            <th>Unknown</th>\
          </tr>\
          <tr>\
            <th>1</th>\
            <th>${ singleArr[0] }</th>\
            <th>${ marriedArr[0] }</th>\
            <th>${ widowArr[0] }</th>\
            <th>${ widowerArr[0] }</th>\
            <th>${ separatedArr[0] }</th>\
            <th>${ unknownArr[0] }</th>\
          </tr>\
          <tr>\
            <th>2</th>\
            <th>${ singleArr[1] }</th>\
            <th>${ marriedArr[1] }</th>\
            <th>${ widowArr[1] }</th>\
            <th>${ widowerArr[1] }</th>\
            <th>${ separatedArr[1] }</th>\
            <th>${ unknownArr[1] }</th>\
          </tr>\
          <tr>\
            <th>3</th>\
            <th>${ singleArr[2] }</th>\
            <th>${ marriedArr[2] }</th>\
            <th>${ widowArr[2] }</th>\
            <th>${ widowerArr[2] }</th>\
            <th>${ separatedArr[2] }</th>\
            <th>${ unknownArr[2] }</th>\
          </tr>\
          <tr>\
            <th>4</th>\
            <th>${ singleArr[3] }</th>\
            <th>${ marriedArr[3] }</th>\
            <th>${ widowArr[3] }</th>\
            <th>${ widowerArr[3] }</th>\
            <th>${ separatedArr[3] }</th>\
            <th>${ unknownArr[3] }</th>\
          </tr>\
          <tr>\
            <th>5</th>\
            <th>${ singleArr[4] }</th>\
            <th>${ marriedArr[4] }</th>\
            <th>${ widowArr[4] }</th>\
            <th>${ widowerArr[4] }</th>\
            <th>${ separatedArr[4] }</th>\
            <th>${ unknownArr[4] }</th>\
          </tr>\
        `)
        $('#visualization-total').html(`\
          <tr>\
            <th>Total</th>\
          </tr>\
          <tr>\
            <td>Single: ${ singleArr[0] + singleArr[1] + singleArr[2] + singleArr[3] + singleArr[4] }</td>\
          </tr>\
          <tr>\
            <td>Married: ${ marriedArr[0] + marriedArr[1] + marriedArr[2] + marriedArr[3] + marriedArr[4] }</td>\
          </tr>\
          <tr>\
            <td>Widow: ${ widowArr[0] + widowArr[1] + widowArr[2] + widowArr[3] + widowArr[4] }</td>\
          </tr>\
          <tr>\
            <td>Widower: ${ widowerArr[0] + widowerArr[1] + widowerArr[2] + widowerArr[3] + widowerArr[4] }</td>\
          </tr>\
          <tr>\
            <td>Separated: ${ separatedArr[0] + separatedArr[1] + separatedArr[2] + separatedArr[3] + separatedArr[4] }</td>\
          </tr>\
          <tr>\
            <td>Unknown: ${ unknownArr[0] + unknownArr[1] + unknownArr[2] + unknownArr[3] + unknownArr[4] }</td>\
          </tr>\
        `)
        $('#vtotal-data').text(civil)
        $('#visualization-legends').html(`\
          <span id="chart-legend">Civil Satus</span>\
          <span class="legend-circle circle-yellow"></span>Single\
          <span class="legend-circle circle-orange"></span>Married\
          <span class="legend-circle circle-red"></span>Widow\
          <span class="legend-circle circle-blue"></span>Widower\
          <span class="legend-circle circle-green"></span>Separated\
          <span class="legend-circle circle-black"></span>Unknown\
        `)
      } else if (filter == 3) {
        var chart = bb.generate({
          data: {
            x: "purok",
            columns: [
                ["purok", "Purok 1", "Purok 2", "Purok 3", "Purok 4", "Purok 5"],
                ["College", collegeArr[0], collegeArr[1], collegeArr[2], collegeArr[3], collegeArr[4]],
                ["Currently_Studying", currStudyingArr[0], currStudyingArr[1], currStudyingArr[2], currStudyingArr[3], currStudyingArr[4]],
                ["Elementary", elemArr[0], elemArr[1], elemArr[2], elemArr[3], elemArr[4]],
                ["Not_Yet_Studying", nyStudyingArr[0], nyStudyingArr[1], nyStudyingArr[2], nyStudyingArr[3], nyStudyingArr[4]],
                ["Primary", primArr[0], primArr[1], primArr[2], primArr[3], primArr[4]],
                ["Secondary", secArr[0], secArr[1], secArr[2], secArr[3], secArr[4]],
                ["Unknown", sUnknownArr[0], sUnknownArr[1], sUnknownArr[2], sUnknownArr[3], sUnknownArr[4]]
            ],
            colors: {
                  College: "yellow",
                  Currently_Studying: "orange",
                  Elementary: "red",
                  Not_Yet_Studying: "blue",
                  Primary: "green",
                  Secondary: "violet",
                  Unknown: "black"
            },
            type: "bar",
          },
          axis: {
            x: {
              type: "category"
            }
          },
          bindto: "#visualization-chart"
        })

        $('#visualization-table').html(`\
          <tr>\
            <th>Zone</th>\
            <th>College</th>\
            <th>Currently Studying</th>\
            <th>Elementary</th>\
            <th>Not Yet Studying</th>\
            <th>Primary</th>\
            <th>Secondary</th>\
            <th>Unknown</th>\
          </tr>\
          <tr>\
            <th>1</th>\
            <th>${ collegeArr[0] }</th>\
            <th>${ currStudyingArr[0] }</th>\
            <th>${ elemArr[0] }</th>\
            <th>${ nyStudyingArr[0] }</th>\
            <th>${ primArr[0] }</th>\
            <th>${ secArr[0] }</th>\
            <th>${ sUnknownArr[0] }</th>\
          </tr>\
          <tr>\
            <th>2</th>\
            <th>${ collegeArr[1] }</th>\
            <th>${ currStudyingArr[1] }</th>\
            <th>${ elemArr[1] }</th>\
            <th>${ nyStudyingArr[1] }</th>\
            <th>${ primArr[1] }</th>\
            <th>${ secArr[1] }</th>\
            <th>${ sUnknownArr[1] }</th>\
          </tr>\
          <tr>\
            <th>3</th>\
            <th>${ collegeArr[2] }</th>\
            <th>${ currStudyingArr[2] }</th>\
            <th>${ elemArr[2] }</th>\
            <th>${ nyStudyingArr[2] }</th>\
            <th>${ primArr[2] }</th>\
            <th>${ secArr[2] }</th>\
            <th>${ sUnknownArr[2] }</th>\
          </tr>\
          <tr>\
            <th>4</th>\
            <th>${ collegeArr[3] }</th>\
            <th>${ currStudyingArr[3] }</th>\
            <th>${ elemArr[3] }</th>\
            <th>${ nyStudyingArr[3] }</th>\
            <th>${ primArr[3] }</th>\
            <th>${ secArr[3] }</th>\
            <th>${ sUnknownArr[3] }</th>\
          </tr>\
          <tr>\
            <th>5</th>\
            <th>${ collegeArr[4] }</th>\
            <th>${ currStudyingArr[4] }</th>\
            <th>${ elemArr[4] }</th>\
            <th>${ nyStudyingArr[4] }</th>\
            <th>${ primArr[4] }</th>\
            <th>${ secArr[4] }</th>\
            <th>${ sUnknownArr[4] }</th>\
          </tr>\
        `)
        $('#visualization-total').html(`\
          <tr>\
            <th>Total</th>\
          </tr>\
          <tr>\
            <td>College: ${ collegeArr[0] + collegeArr[1] + collegeArr[2] + collegeArr[3] + collegeArr[4] }</td>\
          </tr>\
          <tr>\
            <td>Currently Studying: ${ currStudyingArr[0] + currStudyingArr[1] + currStudyingArr[2] + currStudyingArr[3] + currStudyingArr[4] }</td>\
          </tr>\
          <tr>\
            <td>Elementary: ${ elemArr[0] + elemArr[1] + elemArr[2] + elemArr[3] + elemArr[4] }</td>\
          </tr>\
          <tr>\
            <td>Not Yet Studying: ${ nyStudyingArr[0] + nyStudyingArr[1] + nyStudyingArr[2] + nyStudyingArr[3] + nyStudyingArr[4] }</td>\
          </tr>\
          <tr>\
            <td>Primary: ${ primArr[0] + primArr[1] + primArr[2] + primArr[3] + primArr[4] }</td>\
          </tr>\
          <tr>\
            <td>Secondary: ${ secArr[0] + secArr[1] + secArr[2] + secArr[3] + secArr[4] }</td>\
          </tr>\
          <tr>\
            <td>Unknown: ${ sUnknownArr[0] + sUnknownArr[1] + sUnknownArr[2] + sUnknownArr[3] + sUnknownArr[4] }</td>\
          </tr>\
        `)
        $('#vtotal-data').text(educational)
        $('#visualization-legends').html(`\
          <span id="chart-legend">Education</span>\
          <span class="legend-circle circle-yellow"></span>College\
          <span class="legend-circle circle-orange"></span>Currently Studying\
          <span class="legend-circle circle-red"></span>Elementary\
          <span class="legend-circle circle-blue"></span>Not Yet Studying\
          <span class="legend-circle circle-green"></span>Primary\
          <span class="legend-circle circle-violet"></span>Secondary\
          <span class="legend-circle circle-black"></span>Unknown\
        `)
      }
      chart.legend.hide()
    }
  })
}
