function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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

  return `${day}, ${hours}:${minutes}`;
}
function formatWeekDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function sun(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<ul class="list-group list-group-flush days-list">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
    <li class="list-group-item">
                    <div class="card days-body">
                      <div class="card-body">
                        <h3 class="week">${formatWeekDay(forecastDay.time)}</h3>
                        <small id="today-temp-min">min ${Math.round(
                          forecastDay.temperature.minimum
                        )} °</small>
                        <span id="today-temp-max">max ${Math.round(
                          forecastDay.temperature.maximum
                        )} °</span>
                        <img
                          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                            forecastDay.condition.icon
                          }.png"
                          alt="Clear"
                          id="today-icon"
                          width="16%"
                        />
                      </div>
                    </div>
                 </li> `;
    }
  });

  forecastHTML = forecastHTML + `</ul>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "1bofa473t945088a54845ded88cb9530";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let pageCity = document.querySelector("#city-name");
  let degrees = document.querySelector("#degree");
  let description = document.querySelector("#weather-description");
  let feelsElement = document.querySelector("#feels_like");
  let humidityElement = document.querySelector("#humidity-value");
  let windElement = document.querySelector("#wind-speed");
  let feelsLike = Math.round(response.data.main.feels_like);
  let displayWind = Math.round(response.data.wind.speed);
  let currentTime = document.querySelector(".city-time");
  let sunriseHours = document.querySelector("#sunrise");
  let sunsetHours = document.querySelector("#sunset");
  let todayMinTemp = document.querySelector("#today-temp-min");
  let todayMaxTemp = document.querySelector("#today-temp-max");
  let iconElement = document.querySelector("#today-icon");

  celsiusTemperature = response.data.main.temp;

  pageCity.innerHTML = response.data.name;
  degrees.innerHTML = Math.round(celsiusTemperature);
  description.innerHTML = response.data.weather[0].main;
  feelsElement.innerHTML = `feels like ${feelsLike} °C`;
  humidityElement.innerHTML = `${response.data.main.humidity} %`;
  windElement.innerHTML = `${displayWind} m/s`;
  currentTime.innerHTML = formatDate(response.data.dt * 1000);
  sunriseHours.innerHTML = sun(response.data.sys.sunrise * 1000);
  sunsetHours.innerHTML = sun(response.data.sys.sunset * 1000);
  todayMinTemp.innerHTML = `min ${Math.round(response.data.main.temp_min)}°`;
  todayMaxTemp.innerHTML = `max ${Math.round(response.data.main.temp_max)}°`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "4a9226e32b5fb3eb0ec3575c32bb69f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let userCity = document.querySelector("#city-input");
  searchCity(userCity.value);
}

let changeButton = document.querySelector("#city-form");
changeButton.addEventListener("submit", showCity);

searchCity("Kyiv");
displayForecast();
