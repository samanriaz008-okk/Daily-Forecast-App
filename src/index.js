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

function dailyForecast(response) {
  let apiKey = "9aa8ab264078edftd860c3e0foabbd02";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${response}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast() {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="forecast">
    <div class="forcast-date">${day}</div>
    <div class="forecast-icon">☀️</div>
    <div class="forecast-temperature">
                  <div class="max-temperature">15°C</div>
                  <div class="min-temperature">10°C</div>
                  </div>
                  </div>`;
    let forecastElement = document.querySelector("#weather-forecast");
    forecastElement.innerHTML = forecastHTML;
  });
}
displayForecast();
