//API key for Open Weather
var api_key = "33c4d45a4597dc2f2025c1d244be92c6";
//variables for city
var city = "";
//object targeting form
var form = document.getElementById("search");

var mainCardDiv = document.getElementById("main-card");
var fiveDayDiv = document.getElementById("five-day")
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
          var img = oneCallData.list[index].main.weather
          var temp = oneCallData.list[index].main.temp;
          var humid = oneCallData.list[index].main.humidity;
          var fTemp2 = (temp - 273.15) * (9 / 5) + 32;
          // var fiveDayCont = document.getElementById("five-day");
          // var container = document.createElement("div");
          // var blk = document.createElement("p");
          // container.append(blk, date, humid, fTemp2)
          // return(container);
          // fiveDayCont.append(date);
          // fiveDayCont.append("Temperature: " + fTemp2.toFixed() + "°F");
          // fiveDayCont.append("Humidity: " + humid + "%")
          var container = document.createElement("div");
          var dayof5 = document.createElement("div");
          var blk = document.createElement("p");
          dayof5.textContent = blk.append(date, img, fTemp2, humid);
          container.append(dayof5);
          return container;
        }
      }
    });
}

// Global Variables


//Uses moment.js to get out current date. Format is numerical Day/Month/Year. ex 03/11/2021
// var currentDate = moment().format("L");

// var results = $("#results");
//Our city array where we will store our search history.
// var cityList = [];

//Event Listeners

// Turns our history list items into clickable buttons.
// $("#search-history").on("click","li.history-btn", function(e) {
//   e.preventDefault()
  // imitates the search bar being filled out by grabbing our data attribute
  // var userInput = $(this).data("value");
  // runs the weather API call
//   getWeather(userInput);
// })

// Prevents the enter button from resetting the page when typing in the search bar
// $("#city-search").keydown(function (e) {
//   if (e.keyCode == 13) {
//     e.preventDefault();
//     return false;
//   }
// });

//When the submit button element is clicked, we call the getWeather function
// $("#submitBtn").on("click", function (e) {
//   e.preventDefault();
  //Pulls the text content of our search bar
  // var userInput = $("#city-search").val().trim();
  // getWeather(userInput);
  // Runs our function to save the input to local storage
  // saveHistory(userInput);
  // Clears out our search bar after submit
//   $("#city-search").val("");
// });

//Function to call OpenWeatherMap API for specific data on a city
// function getWeather(userInput) {
  // Guard clause to make sure that the user input tried to input a city before searching
  // if (userInput === "") {
  //   alert("Please input a city before submitting");
  //   return;
  // }
  // Empties our 5-day forecast between searches
  // $("#forecast-append").empty();
  //OpenWeatherMaps "Current Weather Data" API call so we can get Latitude and Longitude to pass forward
  // var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}`;
  //Calls the current weather API
  // fetch(currentWeatherUrl)
  //convers the response into a JSON object so we can utilize it
  // .then((data) => data.json())
  // .then(function (weather) {
    // Guard clause to make sure the user input is a targetable city
    // if (weather.cod === "404") {
    //   alert("City not found");
    //   return;
    // }
    //Sets our towns name + date in the current day section
    // $("#current-city").text(weather.name + " | " + currentDate);
    // var lat = weather.coord.lat;
    // var lon = weather.coord.lon;
    
    //Main API, this requires Latitude and Longitude to function. Contains all weather information for an area. Currently displays in MPH, and Fahrenheit
//     var onecallAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${apiKey}`;
//     fetch(onecallAPI)
//     .then((data) => data.json())
//     .then(function (onecallData) {
//       printResults(onecallData);
//     });
//   });
// }
  //Prints the results of our API call to the page
// function printResults(onecallData) {
//   var current = onecallData.current;

  //Current Day Section
  // Populates our current day section with the relevant info.
  // $("#current-temp").text("Temperature: " + current.temp + "°F");
  // $("#current-humidity").text("Humidity: " + current.humidity + "%");
  // $("#current-wind-speed").text("Wind Speed: " + current.wind_speed + " MPH");
  // $("#current-uvi").text(current.uvi);

  //Converts the onecallapi's data from a string to a number so we can compare it
  // var uvicomp = parseInt(current.uvi);
  //rounds UVI Comp so it matches it's closest class
  // uvicomp = Math.round(uvicomp);
  //Sets our UVI elements background to reflect the severity of the current UV strength
  //if UV index is less than or equal to 2, adds green background. removes yellow/red
  // if (uvicomp <= 2) {
  //   $("#current-uvi").addClass("bg-success").removeClass("bg-warning bg-danger");
  // }
  //if UV Index is between 3 and 5, adds yellow background removes green/red
  // else if (uvicomp >= 3 && uvicomp <= 5) {
  //   $("#current-uvi").addClass("bg-warning").removeClass("bg-success bg-danger");
  // }
  //else adds a red background. removed green/yellow
  // else {
  //   $("#current-uvi").addClass("bg-danger").removeClass("bg-warning bg-success");
  // }

  //Forecast Section

  // For loop, starts at 1 so that our 5 day forecast doesn't have duplicate data from current day section
  // for (let i = 1; i < 6; i++) {
    // variable to iterate through the daily objects
    // var forecast = onecallData.daily[i];
 
    // our base div we build off of
    // var forecastAppend = $("#forecast-append");

    //Sets divs overall spacing to be 1/6th of the width available
    // var col2 = $("<div>").appendTo(forecastAppend);
    // col2.addClass("col-2");

    // White text, blue background
    // var card = $("<div>").appendTo(col2);
    // card.addClass("card bg-primary text-light");

    // var cardBody = $("<div>").appendTo(card);
    // cardBody.addClass("card-body");

    // prints date at top.
    // var forecastDate = $("<h5>").appendTo(cardBody);
    // forecastDate.addClass("card-title");
    // forecastDate.text(moment.unix(forecast.dt).format("L"));

    // //adds an icon equal to the areas weathers
    // var forecastIMG = $("<img>").appendTo(cardBody);
    // forecastIMG.attr(
    //   "src",
    //   "https://openweathermap.org/img/wn/" +
    //     forecast.weather[0].icon +
    //     "@2x.png"
    // );
    //sets alt text for our icon
    // forecastIMG.attr("alt", "Forecast Icon");

    //Creates a P tag on our card and prints the temp to it
    // var forecastTemp = $("<p>").appendTo(cardBody);
    // forecastTemp.addClass("card-text");
    // forecastTemp.text("Temp: " + forecast.temp.day + "°F");

    //creates a P tag on our card and prints the humidity to it
  //   var forecastHumidity = $("<p>").appendTo(cardBody);
  //   forecastHumidity.addClass("card-text");
  //   forecastHumidity.text("Humidity: " + forecast.humidity + "%");
  // }
  //displays the results section
//   results.removeClass("hidden");
// }

//Adds our input into the array if it doesn't exist already
// function saveHistory(userInput) {
//   if (userInput) {
    
    // if userInput is not contained within the cityList Index
    // if (cityList.indexOf(userInput) === -1) {
      // add new city to array
      // cityList.push(userInput);
      //Generate the search history LIs which displays + saves to local storage
  //     generateLI();
  //   }}
  // }

//Generates our search history LI "buttons"
// function generateLI() {
//   var sh = $("#search-history")
  //Clears old LI elements
//  sh.empty();
 //generates new LI for each item in our array
  // cityList.forEach(function (city) {
    // variable to create our elements
    // var searchHistoryLI = $("<li>");
    // adds classes to our newly made variables
    // searchHistoryLI.addClass("list-group-item history-btn")
    // sets a data-value attribute equal to the city name
    // searchHistoryLI.attr("data-value", city);
    // prints the name of the city
    // searchHistoryLI.text(city);
    // adds it to the top of the list (Newest at top, oldest at bottom)
  //   sh.prepend(searchHistoryLI);
  // });
  // pushes to local storage
//   localStorage.setItem("cities", JSON.stringify(cityList));
// }

//Pulls from local storage
// function showHistory() {
  // if our local storage exists
  // if (localStorage.getItem("cities")) {
    // pull the local storage and parse it into a JS object
    // cityList = JSON.parse(localStorage.getItem("cities"));
    // runs our LI generator function
    // generateLI();
    // if our array has key:value pairs inside
    // if (cityList.length !== 0) {
      // grabs the length of our array and subtracts 1 to get to the final index
      // var lastVisited = cityList.length - 1;
      // runs the weather function with our last searched info
//      getWeather(cityList[lastVisited]);
//     }
//   }
// }

// Loads our local storage history on page load
// showHistory()