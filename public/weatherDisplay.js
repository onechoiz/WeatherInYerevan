let cityNameElement = document.getElementById("cityName");
let countryElement = document.getElementById("country");
let temperatureElement = document.getElementById("temperature");
let iconElement = document.getElementById("icon");
let realFeelElement = document.getElementById("real-feel");
let humidityElement = document.getElementById("humidity");
let windSpeedElement = document.getElementById("windSpeed");
let precipitationProbabilityElement = document.getElementById(
  "precipitation_probability"
);
let visibilityElement = document.getElementById("visibility");

console.log("connected");
const weatherStoredData = localStorage.getItem('weatherData')

console.log(weatherStoredData);
// console.log(weatherStoredData,"local");

if(weatherStoredData){
  const {
  timezone: city,
  // country,

  current_units:{

    temperature_2m: tempUnit,
    wind_speed_10m: speedUnit,
    relative_humidity_2m: humidityUnit,
    apparent_temperature: realFeelUnit,
    precipitation_probability: precipitationProbabilityUnit,
    visibility: visibilityUnit
  },
  current: {
    temperature_2m: temp,
    wind_speed_10m: wind,
    relative_humidity_2m: humidity,
    wind_speed_10m: windSpeed,
    apparent_temperature: apparentTemperature,
    precipitation_probability: precipitationProbability,
    visibility,
  },
} = JSON.parse(weatherStoredData);
console.log(city);


cityNameElement.textContent= `${city } `
temperatureElement.textContent = `${temp} ${tempUnit}`
humidityElement.textContent = `${humidity} ${humidityUnit}`
windSpeedElement.textContent = `${windSpeed} ${speedUnit}`
visibilityElement.textContent = `${visibility} ${visibilityUnit}`
realFeelElement.textContent = `${apparentTemperature} ${realFeelUnit}`
precipitationProbabilityElement.textContent = ` ${precipitationProbability} ${precipitationProbabilityUnit}`



}


