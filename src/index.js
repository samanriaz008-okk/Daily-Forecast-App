//display input value in place of city name
//display current time
//display current temperature

function displayTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hour = date.getHours();
  let mins = date.getMinutes();

  if (hour < 0) {
    hour = `0${hour}`;
  }
  if (mins < 0) {
    mins = `0${mins}`;
  }

  return `${day} ${hour}:${mins}`;
}

let now = new Date();
let timeElement = document.querySelector("#time");
timeElement.innerHTML = displayTime(now);

function displayTemperature(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  currentTemperature.innerHTML = `${temperature}°C`;
  let cityElement = document.querySelector("h2");
  cityElement.innerHTML = response.data.city;
}
function searchCity(city) {
  let apiKey = "9aa8ab264078edftd860c3e0foabbd02";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function searchInput(event) {
  event.preventDefault();
  let formInput = document.querySelector("#search-input");

  searchCity(formInput.value);
}
let searchForm = document.querySelector("#search-temperature");
searchForm.addEventListener("submit", searchInput);

searchCity("Islamabad");
