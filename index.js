const locationInput = document.getElementById("location-input");
const button = document.getElementById("button");
const cityName = document.getElementById("title-text");
const temprature = document.getElementById("temprature");
const display = document.getElementById("picture-display");
const weatherDescription = document.getElementById("weather-description");
const toggle = document.getElementById("celcius-toggle");

const geocodeApiKey = "65fa47d3931a3517084361bune5a288";
const openWeatherApiKey = "01d54155ab7c730a05cdbd85326bd430";

let latitude;
let longitude;
let tempFahrenheit;
let tempCelcius;

function getGeocodeData() {
    const geocodeUrl = `https://geocode.maps.co/search?q=${locationInput.value}&api_key=${geocodeApiKey}`;

    fetch(geocodeUrl) 
    .then(response => {
        if (!response.ok) {
            throw new Error("Response not ok")
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        latitude = data[0].lat;
        longitude = data[0].lon;
        cityName.innerText = data[0].display_name.split(",")[0];
        getLocationData();
    })
    .catch(error => {
        console.error("Error", error);
    })
};

function getLocationData() {
    const openWeatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}`;

    fetch(openWeatherUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error("Response not ok")
        }
        return response.json();
    })
    .then(data => {
        const temp = localStorage.getItem("tempratrue");
        const tempFahrenheit = Math.round(1.8 * (temp - 273) + 32);
        const tempCelcius = Math.round(temp - 273.15);
        const weatherIcon = data.current.weather[0].icon;

        localStorage.setItem("tempratrue", data.current.temp);
        console.log(data)
        temprature.innerText = tempFahrenheit + "°F";
        weatherDescription.innerText = data.current.weather[0].description;
        display.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"
         alt="a graphic of the current weather">`
         toggle.addEventListener("click", toggleTemps);
    })
};

function getWeather() {
    getGeocodeData();
};

// function toggleTemps() {
//     if (!toggle.checked) {
//         temprature.innerText = tempCelcius + "°F";
//     } else {
//         temprature.innerText = tempFahrenheit + "°c";
//     };
// };

button.addEventListener("click", getWeather);
