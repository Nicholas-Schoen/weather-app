const locationInput = document.getElementById("location-input");
const button = document.getElementById("button");
const cityName = document.getElementById("title-text");
const tempature = document.getElementById("tempature");
const display = document.getElementById("picture-display");
const weatherDescription = document.getElementById("weather-description");
const toggle = document.getElementById("toggle-switch");
let latitude;
let longitude;

const geocodeApiKey = "65fa47d3931a3517084361bune5a288";

const openWeatherApiKey = "01d54155ab7c730a05cdbd85326bd430";
/*
const openWeatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}`;
*/
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
        console.log("Latitude: ", data[0].lat);
        console.log("Longitude: ", data[0].lon);
        latitude = data[0].lat;
        longitude = data[0].lon;
    })
    .catch(error => {
        console.error("Error", error);
    })
};

function getLocationData() {};

button.addEventListener("click", getGeocodeData);