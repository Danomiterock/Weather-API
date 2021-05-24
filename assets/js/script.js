//API key for Open Weather
var api_key = "33c4d45a4597dc2f2025c1d244be92c6";
//variables for city
var city = "";
console.log(city);
//object targeting form
var form = document.getElementById("submit");
//format moment.js
var currentDate = moment().format("LL");
//array for storing city history
var cityStorage = JSON.parse(localStorage.getItem("cityName")) || [];
//variable for main and five card divs
var mainCardDiv = document.getElementById("main-card");
var fiveDayDiv = document.getElementById("five-day");

diplayRecent(cityStorage);
//defining weather as the current value of weather
// var weather = ""
//cityName is pushed from the city name retrieved in weather data
// var cityName = weather.name;
//add event listener for button and causes search input to be received
$(form).on("click", function (e) {
  e.preventDefault();
  city = document.getElementById("userInput").value;
  getWeather(city);
});

//call function get weather
function getWeather(city) {
  //URL for data end point
  var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  // function to retrieve data on our city
  fetch(currentWeatherURL)
    .then((data) => data.json())
    .then(function (weather) {
      //if city is not found return from our function early
      if (weather.cod === "404") {
        alert("City not found");
        return;
      }

      // Destructure our lat and lon values from the weather object
      const {
        coord: { lat, lon },
      } = weather;

      // Construct our onecallurl using template literals
      var oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&exclude=hourly,minutely`;

      fetch(oneCallURL)
        .then((data) => data.json())
        .then(function (oneCallResponse) {
          console.log("ONE CALL:", oneCallResponse);
          // oneCallResponse.current goes to our main card
          renderMainCard(weather, oneCallResponse.current.uvi);

          renderFiveDayCard(oneCallResponse);
        });

      if (cityStorage.indexOf(city) === -1) {
        cityStorage.push(city);
      }

      //push city information from api return to local storage
      localStorage.setItem("cityName", JSON.stringify(cityStorage));

      diplayRecent(cityStorage);

      //This variable contains the information for the Five Day forcast
      var fiveDayCard = "";

      localStorage.setItem("fiveDayCard", JSON.stringify(fiveDayCard));
    });
}
// render maincard for city, date, weather, etc
function renderMainCard(data, uvi) {
  mainCardDiv.innerHTML = "";
  var h1 = document.createElement("h1");
  // console.log(data);
  h1.textContent = data.name + " " + currentDate;
  // var date = newDate();
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

  //cannot find target for UVI index

  var h3 = document.createElement("h3");
  h3.innerHTML = "UVI Index: ";

  var span = document.createElement("span");
  span.textContent = uvi;

  span.classList.add("uvi");

  if (uvi < 5) {
    span.classList.add("green");
  } else {
    span.classList.add("red");
  }

  h3.append(span);

  mainCardDiv.appendChild(h3);
}

//this function places the Five Day Card information
function renderFiveDayCard(oneCallData) {
  //var targeting the one call url endpoint that contains the 5 day forecast
  // var fiveDay = oneCallUrl
  var h1 = document.createElement("h1");
  h1.innerText = "5-Day Forecast";
  console.log(oneCallData);
  // var UVDisplay = document.querySelector("#UVI");
  // UVDisplay.innerHTML = oneCallData.current.uvi;
  // console.log(oneCallData.current.uvi);

  for (let index = 1; index < 6; index++) {
    var day = oneCallData.daily[index];
    var fiveDayCard = document.createElement("div");

    // Need to format Date
    var date = day.dt;
    var dateEl = document.createElement("p");
    dateEl.innerText = date;
    fiveDayCard.append(dateEl);

    var img = day.weather[0].icon;
    var imgEl = document.createElement("img");
    imgEl.setAttribute(
      "src",
      "https://openweathermap.org/img/w/" + img + ".png"
    );
    fiveDayCard.append(imgEl);

    var temp = day.temp.day;
    var fTemp2 = (temp - 273.15) * (9 / 5) + 32;
    fTemp2 = Math.round(fTemp2);
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temperature: " + fTemp2;
    fiveDayCard.append(tempEl);

    var humid = day.humidity;
    var humidEl = document.createElement("p");
    humidEl.textContent = "Humidity: " + humid;
    fiveDayCard.append(humidEl);

    fiveDayDiv.append(fiveDayCard);

    // var fiveDayCont = document.getElementById("five-day");
    // var container = document.createElement("div");
    // var blk = document.createElement("p");
    // container.append(blk, date, humid, fTemp2)
    // return(container);
    // fiveDayCont.append(date);
    // fiveDayCont.append("Temperature: " + fTemp2.toFixed() + "°F");
    // fiveDayCont.append("Humidity: " + humid + "%")
    // var container = document.createElement("div");
    // var dayof5 = document.createElement("div");
    // var blk = document.createElement("p");
    // dayof5.textContent = blk.append(date, img, fTemp2, humid);
    // container.append(dayof5);
    // return container;
  }
}

function diplayRecent(array) {
  var listGroup = document.querySelector(".display-recent");
  listGroup.innerHTML = "";
  for (const element of array) {
    var listGroupItem = document.createElement("li");
    var linkName = document.createElement("a");
    listGroupItem.classList.add("list-group-item");
    linkName.setAttribute("href", "#");
    linkName.textContent = element;
    listGroup.append(listGroupItem);
    listGroupItem.append(linkName);
  }
}