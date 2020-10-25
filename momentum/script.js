// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  button = document.querySelector(".button-two")
  imgNumber = 1;

button.disabled = false;
name.style = "display:inline-block; min-width:10px;"
const zeroPad = (num, places) => String(num).padStart(places, '0');

// Options
const showAmPm = true;
const localArea = "en-us";

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    day = today.getDate(),
    weekDay = today.toLocaleString(localArea, { weekday: 'long' }),
    month = today.toLocaleString(localArea, { month: 'long' });

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  // hour = hour % 12 || 12;

  // set date


  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}<div class="time-day">${weekDay}, ${day} ${month}</div>`;
  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet(imgNumber) {
  let today = new Date(),
    hour = today.getHours();
  imgNumber = imgNumber % 20 + 1;
  if (hour >= 6 && hour <= 12) {
    // Morning
    document.body.style.backgroundImage =
      `url('assets/images/morning/${zeroPad(imgNumber, 2)}.jpg')`;
    greeting.textContent = 'Good Morning, ';
  } else if (hour >= 12 && hour <= 18) {
    // Afternoon
    document.body.style.backgroundImage =
      `url('assets/images/day/${zeroPad(imgNumber, 2)}.jpg')`;
    greeting.textContent = 'Good Afternoon, ';
  } else if (hour >= 18 && hour <= 24) {
    // Evening
    document.body.style.backgroundImage =
      `url('assets/images/evening/${zeroPad(imgNumber, 2)}.jpg')`;
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  } else {
    document.body.style.backgroundImage =
      `url('assets/images/night/${zeroPad(imgNumber, 2)}.jpg')`;
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
  }
  setTimeout(()=>setBgGreet(imgNumber), 60000);
}



// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    if (e.target.innerHTML.trim() == "") {
      e.target.innerHTML = localStorage.getItem('name') || '[Name]'
    }
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    if (e.target.innerHTML.trim() == "") {
      e.target.innerHTML = localStorage.getItem('focus') || '[Name]'
    }
    localStorage.setItem('focus', e.target.innerText);
  }
}

function clearField(e) {
  if (!e.target.innerHTML.match(`${window.getSelection()}`)[0]) {
    console.log(`${window.getSelection()}`);
    e.target.innerHTML = '';
  }
}



name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', clearField);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clearField);
button.addEventListener("click",()=>{
  setBgGreet(imgNumber++);
  button.disabled = true;
  setTimeout(()=>{button.disabled = false}, 1000);
});

// Run
showTime();
setBgGreet(imgNumber);
getName();
getFocus();