const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

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
      res.write(
        "The temperature in " + query + " is " + temp + " Degrees celcius. "
      );
      res.write("The weather is " + weatherData.weather[0].description);
      res.send();
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
      // console.log(pollutionData);
      const airQualityIndex = pollutionData.data.current.pollution.aqius;
      // console.log(airQualityIndex);
      if (airQualityIndex <= 50) {
        res.write("The air quality is Good. ");
        res.write("Current AQI=" + airQualityIndex);
      } else if (airQualityIndex > 50 && airQualityIndex <= 100) {
        res.write("The air quality is Fair. ");
        res.write("Current AQI=" + airQualityIndex);
      } else if (airQualityIndex > 100 && airQualityIndex <= 150) {
        res.write("The air quality is Moderate. ");
        res.write("Current AQI=" + airQualityIndex);
      } else if (airQualityIndex > 150 && airQualityIndex <= 200) {
        res.write("The air quality is Unhelathy. ");
        res.write("Current AQI=" + airQualityIndex);
      } else if (airQualityIndex > 200 && airQualityIndex <= 300) {
        res.write("The air quality is Very Unhealthy. ");
        res.write("Current AQI=" + airQualityIndex);
      } else if (airQualityIndex > 300 && airQualityIndex <= 500) {
        res.write("The air quality is Hazardous. ");
        res.write("Current AQI=" + airQualityIndex);
      }
      res.send();
    });
  });
});
app.get("/traffic", function (req, res) {
  res.sendFile(__dirname + "/traffic.html");
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});
