//API key for Open Weather
var api_key = "33c4d45a4597dc2f2025c1d244be92c6";
//object targeting form
var form = document.getElementById("search");

var mainCardDiv = document.getElementById("main-card");
// var stateCode = ""
// var weather = currentWeatherURL.value

//add event listener for button and causes search input to be received
form.addEventListener("submit", function (e) {
  e.preventDefault();
  //variables for city
  var cityName = document.getElementById("search-input").value;
  getWeather(cityName);
});
//call function get weather
function getWeather(cityName) {
  //URL for data end point
  var currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`;
  //variables for latitude and longitude
  // function to retrieve data
  fetch(currentWeatherURL)
    .then((data) => data.json())
    .then(function (weather) {
      //if city is not found
      if (weather.cod === "404") {
        alert("City not found");
        return;
      }
      renderMainCard(weather);
      //push city information from api return to local storage
      //cityName is pushed from the city name retrieved in weather data
      cityName = weather.name;
      localStorage.setItem("cityName", JSON.stringify(cityName));
      // createCityNameButtons();

      //This variable contains the information for the Five Day forcast
      var fiveDayCard = "";

      localStorage.setItem("fiveDayCard", JSON.stringify(fiveDayCard));

      console.log(weather);
    });
}
// render maincard for city, date, weather, etc
function renderMainCard(weatherData) {
  var h1 = document.createElement("h1");
  h1.textContent = weatherData.name;
  // var date = new Date();
  // displayDate = date.toLocaleString('en-US',{month: 'numeric', day:'2-digit', year:'numeric'});
  mainCardDiv.appendChild(h1);

  var h3 = document.createElement("h3");
  var fTemp = (weatherData.main.temp - 273.15) * (9 / 5) + 32;
  h3.textContent = "Temperature: " + fTemp.toFixed() + "°F";
  mainCardDiv.appendChild(h3);

  var h3 = document.createElement("h3");
  h3.textContent = "Humidity: " + weatherData.main.humidity + "%";
  mainCardDiv.appendChild(h3);

  var h3 = document.createElement("h3");
  h3.textContent = "Wind Speed: " + weatherData.wind.speed + "mph";
  mainCardDiv.appendChild(h3);

  renderMainCard(weatherData);
}
//this function places the Five Day Card information
function renderFiveDayCard(weatherData) {
  var lat = weatherData.coord.lat;
  var lon = weatherData.coord.lon;
  //var targeting the one call url endpoint that contains the 5 day forecast
  var oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
  // var fiveDay = oneCallUrl
  var h1 = document.createElement("h1");
  h1 = "5-Day Forecast";
  // function to retrieve data
  fetch(oneCallURL);
  then((data) => data.json());
  then(function (oneCallData) {
    console.log(oneCallData);
    var UVDisplay = document.querySelector("#UVI");
    UVDisplay = oneCallData.current.uvi;

    var fiveDayForecast = document.createElement("h3");
    fiveDayForecast = oneCallData.daily;

    renderFiveDayCard(oneCallData);
  });
}
