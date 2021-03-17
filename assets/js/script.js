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
var cityStorage = [];
//variable for main and five card divs
var mainCardDiv = document.getElementById("main-card");
var fiveDayDiv = document.getElementById("five-day");
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
  // function to retrieve data
  fetch(currentWeatherURL)
    .then((data) => data.json())
    .then(function (weather) {
      //if city is not found
      if (weather.cod === "404") {
        alert("City not found");
        return;
      }
      console.log(weather);

      renderMainCard(weather);
      renderFiveDayCard(weather);

      if (cityStorage.indexOf(city) === -1) {
        cityStorage.push(city);
      }

      //push city information from api return to local storage
      localStorage.setItem("cityName", JSON.stringify(cityStorage));

      diplayRecent(cityStorage);

      //This variable contains the information for the Five Day forcast
      var fiveDayCard = "";

      localStorage.setItem("fiveDayCard", JSON.stringify(fiveDayCard));

      console.log(weather);
    });
}
// render maincard for city, date, weather, etc
function renderMainCard(data) {
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

  // var h3 = document.createElement("h3");
  // h3.textContent = "UVI Index: " + data.uvi;
  // mainCardDiv.appendChild(h3);
}

//this function places the Five Day Card information
function renderFiveDayCard(data) {
  //var targeting the one call url endpoint that contains the 5 day forecast
  var fiveDayFore = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`;
  // var fiveDay = oneCallUrl
  var h1 = document.createElement("h1");
  h1.innerText = "5-Day Forecast";
  // function to retrieve data
  fetch(fiveDayFore)
    .then((data) => data.json())
    .then(function (oneCallData) {
      console.log(oneCallData);
      // var UVDisplay = document.querySelector("#UVI");
      // UVDisplay.innerHTML = oneCallData.current.uvi;
      // console.log(oneCallData.current.uvi);
      
     

      for (let index = 0; index < oneCallData.list.length; index++) {
        if (oneCallData.list[index].dt_txt.includes("12:00:00")) {
          var fiveDayCard = document.createElement("div");

          var date = oneCallData.list[index].dt_txt;
          var dateEl = document.createElement("p");
          dateEl.innerText = date;
          fiveDayCard.append(dateEl);

          var img = oneCallData.list[index].weather[0].icon;
          var imgEl = document.createElement("img");
          imgEl.setAttribute("src", "https://openweathermap.org/img/w/" + img + ".png");
          fiveDayCard.append(imgEl);

          var temp = oneCallData.list[index].main.temp;
          var humid = oneCallData.list[index].main.humidity;
          var fTemp2 = (temp - 273.15) * (9 / 5) + 32;

          fiveDayDiv.append(fiveDayCard)

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
    });
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
