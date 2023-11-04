function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let dayIndex = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[dayIndex];

    return day + " " + (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
}

function displayWeatherCondition(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    celsiusTemperature =  Math.round(response.data.main.temp);
    document.querySelector("#temperature").innerHTML = celsiusTemperature;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt",response.data.weather[0].description);

getForecast(response.data.city);
}


function searchCity(city) {
    let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

    axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
}

function searchLocation(position) {
    let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + apiKey + "&units=metric";

    axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheitTemperature(event) {
    event.preventDefault();
    celsiuslink.classList.remove("active");
    fahrenheitlink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertTocelsiusTemperature(event) {
    event.preventDefault();
    celsiuslink.classList.add("active");
    fahrenheitlink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);;
}

let celsiusTemperature = null

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click",convertToFahrenheitTemperature);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click",convertTocelsiusTemperature);


function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function displayforecast(response){ 

let forecastHyml = ""; 

response.data.daily.forEach(function (day, index) {
    if (index < 5){
    forecastHyml = forecastHyml +`
<div class="weather-forecast-day">
                <div class="weather-forecast-date">${formatDay(day.time)}</div>
                <img src="${day.condition.icon_url}" class="weather-forecast-icon">/>
                <div class="weather-forecasttemperatures">
                    <div class="weather-forecast-temperature">
                        <strong>${Math.round(day.temperature.maximum)}°</strong>
                    </div>
                    <div class="weather-forecast-temperature">
                    ${Math.round(day.temperature.minimum)}°</div>
                </div>
            </div>
`;
    }
});

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHyml;
}
function getForecast(city) {
    let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`;
    axios(apiUrl).then(displayforecast);
}