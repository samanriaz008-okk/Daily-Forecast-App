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

function displayTemperature(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("h2");
  let city = response.data.city;

  let weatherCondition = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;
  timeElement.innerHTML = displayTime(date);
  cityElement.innerHTML = city;
  currentTemperature.innerHTML = `${temperature}°C`;
  weatherCondition.innerHTML = `, Condition: ${response.data.condition.description}`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  dailyForecast(response.data.city);
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

function dailyForecast(city) {
  let apiKey = "9aa8ab264078edftd860c3e0foabbd02";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return day[date.getDay()];
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="forecast" id="forecast">
    <div class="forcast-date">${formatDate(day.time)}</div>
    <img src="${day.condition.icon_url}" class="forecast-icon" />
    <div class="forecast-temperature">
                  <div class="max-temperature">${Math.round(
                    day.temperature.maximum
                  )}°C</div>
                  <div class="min-temperature">${Math.round(
                    day.temperature.minimum
                  )}°C</div>
                  </div>
                  </div>
                   `;
    }
    let forecastElement = document.querySelector("#weather-forecast");
    forecastElement.innerHTML = forecastHTML;
  });
}
displayForecast();
