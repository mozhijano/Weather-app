function getToday(d) {
  let day = d.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let today = days[day];

  let hours = d.getHours();
  let minutes = d.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${today} ${hours}:${minutes}`;
}

let currentDay = document.getElementById("current-day");
currentDay.innerHTML = getToday(new Date());

let search = document.getElementById("search");
let currentLocation = document.getElementById("current");
let city = document.querySelector("#city-name");
let weatherDegree = document.getElementById("weather-degree");
let humidityPercent = document.getElementById("humidity");
let citySearchName = document.getElementById("name");
let weatherDesc = document.querySelector("#weather-description");
let windSpeed = document.querySelector("#weather-wind");

let apiKey = "a78075e9e54bb7f4634858f9d04d965c";
let lat, lon;
let apiUrl;

function showCurrentWeather(response) {
  let temp = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  weatherDesc.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  weatherDegree.innerHTML = temp;
  humidityPercent.innerHTML = response.data.main.humidity;
}

search.addEventListener("click", (e) => {
  e.preventDefault();
  let cityName = citySearchName.value;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentWeather);

  citySearchName.value = "";
});

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

currentLocation.addEventListener("click", (e) => {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
});
