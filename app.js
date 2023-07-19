const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set("view-engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  const query = "London";
  const apikey = "42f1e37e883f929da0d0e4e0fdbbed9c";
  const unit = "metric";
  const Weather_url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=" +
    unit;
  https.get(Weather_url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      res.render("index.ejs", { query, temp, weatherDescription });
    });
  });
});

app.get("/pollution", function (req, res) {
  const London = {
    lat: 51.5072,
    long: 0.1276,
  };
  const apiKey = "28cf63de-3ecf-4168-b31d-63a0c075bce8";
  const Pollution_url =
    "https://api.airvisual.com/v2/city?city=Los%20Angeles&state=California&country=USA&key=" +
    apiKey;

  https.get(Pollution_url, function (response) {
    response.on("data", function (data) {
      const pollutionData = JSON.parse(data);
      const airQualityIndex = pollutionData.data.current.pollution.aqius;
      res.render("pollution.ejs", { airQualityIndex });
    });
  });
});
app.get("/traffic", function (req, res) {
  res.render("traffic.ejs");
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});
