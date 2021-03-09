//API key for Open Weather
var api_key = "33c4d45a4597dc2f2025c1d244be92c6";
//URL for data end point
var currentWeatherURL = `api.openweathermap.org/data/2.5/weather?q=${city name},${state code}&appid=${API key}`
//function to retrieve data
fetch(currentWeatherURL)
    .then((data) => data.json{))
    .then(function (weather){

    })

Starting point
    var city = "Temecula";
var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
fetch(currentWeatherUrl)
  .then((data) => data.json())
  .then(function (weather) {
    console.log(weather);
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
    fetch(onecallURL)
      .then((data) => data.json())
      .then(function (oneCallData) {
        //   oneCallData has all the information that we need
        console.log(oneCallData);
      });
  });
