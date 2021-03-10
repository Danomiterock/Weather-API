//API key for Open Weather
var api_key = "33c4d45a4597dc2f2025c1d244be92c6";
//object targeting form
var form = document.getElementById("search");
// var stateCode = ""
// var weather = currentWeatherURL.value

//add event listener for button and causes search input to be received
form.addEventListener("submit", function (e) {
  e.preventDefault();
  //variables for city
  var cityName = document.getElementById("search-input").value;
  getWeather(cityName)
});
//call function get weather
function getWeather(cityName) {
    //URL for data end point
    var currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`;
    //var targeting the one call url endpoint that contains the 5 day forecast
    var oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
  // function to retrieve data
  fetch(currentWeatherURL)
    .then((data) => data.json())
    .then(function (weather) {
      //if city is not found
      if (weather.cod === "404") {
        alert("City not found");
        return;
      }
      //variables for latitude and longitude
      var lat = weather.coord.lat;
      var lon = weather.coord.lon;
      //push city information from api return to local storage
      //cityName is pushed from the city name retrieved in weather data
      cityName.push(weather.name)
      localStorage.setItem("cityName", JSON.stringify(cityName));
      createCityNameButtons();

      console.log(weather);

    });
}

console.log("Tucson");
