
  // Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: 'AIzaSyBuASw4iulitrX_92Zs0cer2e00HGIgcCU',
  authDomain: 'paul-cc9aa.firebaseapp.com',
  databaseURL: 'https://paul-cc9aa.firebaseio.com',
  projectId: 'paul-cc9aa',
  storageBucket: 'paul-cc9aa.appspot.com',
  messagingSenderId: '854269964466',
  appId: '1:854269964466:web:e95de63e2603f769bb99ab',
  measurementId: 'G-LZHLC7WCPC'
}
// Initialize Firebase
 firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

// grabs the values from Add train form
document.getElementById('submitBtn').addEventListener('click', e => {
  e.preventDefault()
  e.target.id  

  let trainName = document.getElementById('trainName').value
  let destination = document.getElementById('destination').value
  let frequency = document.getElementById('frequency').value
  let trainTime = document.getElementById('trainTime').value
    
  const timeNow = moment().unix()
  const originals = moment(trainTime, 'kk:mm').unix()


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
  // function to get the nextArr
  const nextArr = getNext(originals, parseInt(frequency))
  // to get value of nextArr in seconds
  const nextSec = moment(nextArr, 'hh:mm a').unix()
  // takes nextSec to calculate the minutes away
  const minutesAway = moment(nextSec - timeNow, 'X').format('mm')

  const train = {
   trainName: document.getElementById('trainName').value,
   destination: document.getElementById('destination').value,
   frequency: document.getElementById('frequency').value,
   trainTime: document.getElementById('trainTime').value,
   nextArrival: nextArr,
   minutesAwy: minutesAway
}

db.collection('trainScedule')
.doc(train.trainName)
.set(train)

// clear out the form
  document.getElementById('trainName').value = ''
  document.getElementById('destination').value = ''
  document.getElementById('frequency').value = ''
  document.getElementById('trainTime').value = ''
})

db.collection('trainScedule')
  .onSnapshot(({ docs }) => {
    docs.forEach(doc => {
      const { trainName, destination, frequency, trainTime, nextArrival, minutesAwy } = doc.data()
      const oldRow = document.getElementById('addTrain')
      const newRow = oldRow.insertRow()
      newRow.setAttribute('id', 'display')
      newRow.innerHTML = `
    <td>${trainName}</td>
    <td>${destination}</td>
    <td>${frequency}</td>
    <td>${nextArrival}</td>
    <td>${minutesAwy}</td>
    `
    })
  })
