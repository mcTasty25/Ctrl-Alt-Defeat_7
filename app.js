const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/home", function (req, res) {
  const defaultCity = "Kathmandu";
  const apikey = "42f1e37e883f929da0d0e4e0fdbbed9c";
  const unit = "metric";
  const Weather_url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    defaultCity +
    "&appid=" +
    apikey +
    "&units=" +
    unit;

  const locationUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    defaultCity +
    "&appid=" +
    apikey +
    "&units=" +
    unit;

  let temp, city, airQualityIndex, lat, long;

  https.get(Weather_url, function (weatherResponse) {
    weatherResponse.on("data", function (data) {
      const parsedWeatherData = JSON.parse(data);
      const icon = parsedWeatherData.weather[0].icon;
      const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      temp = parsedWeatherData.main.temp;
      city = parsedWeatherData.name;
      humidity = parsedWeatherData.main.humidity;
      windSpeed = parsedWeatherData.wind.speed;

      https.get(locationUrl, function (locationResponse) {
        locationResponse.on("data", function (data) {
          try {
            const parsedLocationData = JSON.parse(data);
            lat = parsedLocationData.coord.lat;
            long = parsedLocationData.coord.lon;
            res.render("home", {
              temp,
              humidity,
              windSpeed,
              city,
              lat,
              long,
              imgUrl,
            });
          } catch (error) {
            console.error("Error processing API response:", error);
            res.status(500).send("Internal Server Error");
          }
        });
      });
    });
  });
});
app.post("/home", function (req, res) {
  const defaultCity = req.body.cityName;
  const apikey = "42f1e37e883f929da0d0e4e0fdbbed9c";
  const unit = "metric";
  const Weather_url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    defaultCity +
    "&appid=" +
    apikey +
    "&units=" +
    unit;

  const locationUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    defaultCity +
    "&appid=" +
    apikey +
    "&units=" +
    unit;

  let temp, city, airQualityIndex, lat, long;

  https.get(Weather_url, function (weatherResponse) {
    weatherResponse.on("data", function (data) {
      const parsedWeatherData = JSON.parse(data);
      const icon = parsedWeatherData.weather[0].icon;
      const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      temp = parsedWeatherData.main.temp;
      city = parsedWeatherData.name;
      humidity = parsedWeatherData.main.humidity;
      windSpeed = parsedWeatherData.wind.speed;

      https.get(locationUrl, function (locationResponse) {
        locationResponse.on("data", function (data) {
          try {
            const parsedLocationData = JSON.parse(data);
            lat = parsedLocationData.coord.lat;
            long = parsedLocationData.coord.lon;

            res.render("home", {
              temp,
              humidity,
              windSpeed,
              city,
              lat,
              long,
              imgUrl,
            });
          } catch (error) {
            console.error("Error processing API response:", error);
            res.status(500).send("Internal Server Error");
          }
        });
      });
    });
  });
});

app.get("/report", function (req, res) {
  res.render("report");
});

app.get("/traffic", function (req, res) {
  const defaultCity = "Kathmandu";
  const apikey = "42f1e37e883f929da0d0e4e0fdbbed9c";
  const unit = "metric";
  const locationUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    defaultCity +
    "&appid=" +
    apikey +
    "&units=" +
    unit;
  let lat, long;

  https.get(locationUrl, function (locationResponse) {
    locationResponse.on("data", function (data) {
      try {
        const parsedLocationData = JSON.parse(data);
        lat = parsedLocationData.coord.lat;
        long = parsedLocationData.coord.lon;

        res.render("traffic", {
          lat,
          long,
        });
      } catch (error) {
        console.error("Error processing API response:", error);
        res.status(500).send("Internal Server Error");
      }
    });
  });
});
app.post("/traffic", function (req, res) {
  const defaultCity = res.body.cityName;
  const apikey = "42f1e37e883f929da0d0e4e0fdbbed9c";
  const unit = "metric";
  const locationUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    defaultCity +
    "&appid=" +
    apikey +
    "&units=" +
    unit;
  let lat, long;

  https.get(locationUrl, function (locationResponse) {
    locationResponse.on("data", function (data) {
      try {
        const parsedLocationData = JSON.parse(data);
        lat = parsedLocationData.coord.lat;
        long = parsedLocationData.coord.lon;

        res.render("traffic", {
          lat,
          long,
        });
      } catch (error) {
        console.error("Error processing API response:", error);
        res.status(500).send("Internal Server Error");
      }
    });
  });
});

app.get("/contacts", function (req, res) {
  res.render("contacts");
});

app.get("/event", function (req, res) {
  res.render("event");
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});
