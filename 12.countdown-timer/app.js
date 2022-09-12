const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');
console.log(items);

let tempDate = new Date();  // get current Date Mon Sep 12 2022 11:06:08 GMT+0630 (Myanmar Time)
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth(); // months is zero index based
let tempDay = tempDate.getDate(); // get current date(e.g., 12 of september) 

//console.log("Today Date : ", tempDay);

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0); // current_day + 10 days ahead
//console.log("Expired Date : ", futureDate.getDate());

// To check expired date of deadline element
//let futureDate = new Date(2020, 3, 24, 11, 30, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];

const weekday = weekdays[futureDate.getDay()];// get weekday of expired date, zero index based (e.g., Thursday is index no. 4)
const date = futureDate.getDate();
giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes} AM`;

const futureTime = futureDate.getTime(); //get milli-seconds
//console.log(futureTime);

let getRemainingTime = () => {
  const today = new Date().getTime();
  const diffTime = futureTime - today;
  //console.log(diffTime);

  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60min
  // 1d = 24hr

  // values in ms
  const oneDay = 24 * 60 * 60 * 1000; // 86400000 ms in oneDay
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // calculate all values
  let days = diffTime / oneDay; // get total day from today
  days = Math.floor(days);

  let hours = Math.floor((diffTime % oneDay) / oneHour);
  let minutes = Math.floor((diffTime % oneHour) / oneMinute);
  let seconds = Math.floor((diffTime % oneMinute) / 1000);

  // set values in array
  const values = [days, hours, minutes, seconds];

  // if all values are under 10
  let format = item => {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  };

  items.forEach((item, index) => {
    //console.log(item); // NodeList(4) [h4.days, h4.hours, h4.minutes, h4.seconds]
    //console.log(index); // 0 1 2 3
    item.innerHTML = format(values[index]);
  });

  // if futureTime is time-out
  if (diffTime < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">Sorry! This giveaway has expired.</h4>`;
  }
  
};

// countdown with setInterval
let countdown = setInterval(getRemainingTime, 1000);

// set initial values
getRemainingTime();

