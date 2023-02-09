// Time

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

function showTemperature(response) {
  console.log(response.data);
  let pageCity = document.querySelector("#shown-city");
  let temperature = Math.round(response.data.main.temp);
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

  pageCity.innerHTML = response.data.name;
  degrees.innerHTML = temperature;
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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

let apiKey = "4a9226e32b5fb3eb0ec3575c32bb69f3";
let units = "metric";
let city = "Paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showTemperature);
