//API key for Open Weather
var api_key = "33c4d45a4597dc2f2025c1d244be92c6";
//variables for city
var city = "";
//object targeting form
var form = document.getElementById("search");

var mainCardDiv = document.getElementById("main-card");
// var stateCode = ""
// var weather = currentWeatherURL.value

//add event listener for button and causes search input to be received
form.addEventListener("submit", function (e) {
  e.preventDefault();
  city = document.getElementById("search-input").value;
  getWeather(city);
});
//call function get weather
function getWeather(cityName) {
  //URL for data end point
  var currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
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
      renderFiveDayCard(weather);
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
function renderMainCard(data) {
  var h1 = document.createElement("h1");
  // console.log(data);
  h1.textContent = data.name;
  // var date = new Date();
  // displayDate = date.toLocaleString('en-US',{month: 'numeric', day:'2-digit', year:'numeric'});
  mainCardDiv.appendChild(h1);

  var h3 = document.createElement("h3");
  var fTemp = (data.main.temp - 273.15) * (9 / 5) + 32;
  h3.textContent = "Temperature: " + fTemp.toFixed() + "°F";
  mainCardDiv.appendChild(h3);

  var h3 = document.createElement("h3");
  h3.textContent = "Humidity: " + data.main.humidity + "%";
  mainCardDiv.appendChild(h3);

  var h3 = document.createElement("h3");
  h3.textContent = "Wind Speed: " + data.wind.speed + "mph";
  mainCardDiv.appendChild(h3);
}
//this function places the Five Day Card information
function renderFiveDayCard(data) {
  // var lat = data.coord.lat;
  // var lon = data.coord.lon;
  //var targeting the one call url endpoint that contains the 5 day forecast
  var fiveDayFore = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`;
  // var fiveDay = oneCallUrl
  var h1 = document.createElement("h1");
  h1 = "5-Day Forecast";
  // function to retrieve data
  fetch(fiveDayFore)
    .then((data) => data.json())
    .then(function (oneCallData) {
      console.log(oneCallData);
      // var UVDisplay = document.querySelector("#UVI");
      // UVDisplay.innerHTML = oneCallData.current.uvi;
      // console.log(oneCallData.current.uvi);
      var fiveDayForecast = document.createElement("h3");
      fiveDayForecast = oneCallData.daily;

      for (let index = 0; index < oneCallData.list.length; index++) {
        if (oneCallData.list[index].dt_txt.includes("12:00:00")) {
          var date = oneCallData.list[index].dt_txt;
          var temp = oneCallData.list[index].main.temp
          var humid = oneCallData.list[index].main.humidity
          var fTemp2 = (temp - 273.15) * (9 / 5) + 32;
          // var fiveDayCont = document.getElementById("five-day");
          var container = document.createElement("div");
          var blk = document.createElement("p");
          container.append(blk, date, humid, fTemp2)
          return(container);
          // fiveDayCont.append(date);
          // fiveDayCont.append("Temperature: " + fTemp2.toFixed() + "°F");
          // fiveDayCont.append("Humidity: " + humid + "%")

        }
      }
    });
}
