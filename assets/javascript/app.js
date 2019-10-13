/*
  * When adding trains, administrators should be able to submit the following:
    * Train Name
    * Destination
    * First Train Time -- in military time
    * Frequency -- in minutes
  * Code this app to calculate when the next train will arrive; this should be relative to the current time.
  * Users from many different machines must be able to view same train times.
  */

// will need to add fireBase
// need a function or click event to accept the data from the form
// takes that data and stores it in to firebase
// need a function that takes data and creates the data dynamically to HTML


// grabs the values from Add train form
document.getElementById('submitBtn').addEventListener('click', e => {
  e.preventDefault()
  e.target.id  

  const train = document.getElementById('trainName').value
  const destination = document.getElementById('destination').value
  const frequency = document.getElementById('frequency').value
  const trainTime = document.getElementById('trainTime').value
  const timeNow = moment().unix()
  

let originals = moment(trainTime, 'kk:mm').unix()

  // pass original date in seconds (unix) and rate in minutes
  const getNext = (original, rate) => {

    const rateInSeconds = rate * 60

    const now = moment().unix()

    let lapse = original

    while (lapse < now) {
      lapse += rateInSeconds
    }

    return moment((lapse + rate), 'X').format('hh:mm a')
  }

  let nextArr = getNext(originals, parseInt(frequency))
  let nextSec = moment(nextArr, 'hh:mm a').unix()
  let minutesAway = moment(nextSec - timeNow, 'X').format('mm')

 

  // function to create td to Current train schedule
  const createRow = function () {
    let oldRow = document.getElementById('addTrain')
    let newRow = oldRow.insertRow()
    newRow.innerHTML = `
    <td>${train}</td>
    <td>${destination}</td>
    <td>${frequency}</td>
    <td>${nextArr}</td>
    <td>${minutesAway}</td>
    `
  }
  createRow()

})
// pass original date in seconds (unix) and rate in minutes
// function to calculate 
// first train time minus

