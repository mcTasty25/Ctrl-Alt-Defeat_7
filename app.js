const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/home", function (req, res) {
  const apiKey = "28cf63de-3ecf-4168-b31d-63a0c075bce8";
  const defaultCity = "Kathmandu";

  const Weather_url =
    "https://api.airvisual.com/v2/city?city=" +
    defaultCity +
    "&state=Central%20Region&country=Nepal&key=" +
    apiKey;

  const Pollution_url =
    "https://api.airvisual.com/v2/city?city=" +
    defaultCity +
    "&state=Central%20Region&country=Nepal&key=" +
    apiKey;

  const locationUrl =
    "https://api.airvisual.com/v2/city?city=" +
    defaultCity +
    "&state=Central%20Region&country=Nepal&key=" +
    apiKey;

  let temp, city, airQualityIndex, lat, long;

  https.get(Weather_url, function (weatherResponse) {
    let weatherData = "";

    weatherResponse.on("data", function (data) {
      weatherData += data;
    });

    weatherResponse.on("end", function () {
      const parsedWeatherData = JSON.parse(weatherData);
      temp = parsedWeatherData.data.current.weather.tp;
      city = parsedWeatherData.data.city;
      humidity = parsedWeatherData.data.current.weather.hu;
      windSpeed = parsedWeatherData.data.current.weather.ws;

      https.get(Pollution_url, function (pollutionResponse) {
        let pollutionData = "";

        pollutionResponse.on("data", function (data) {
          pollutionData += data;
        });

        pollutionResponse.on("end", function () {
          const parsedPollutionData = JSON.parse(pollutionData);
          airQualityIndex = parsedPollutionData.data.current.pollution.aqius;

          https.get(locationUrl, function (locationResponse) {
            let locationData = "";

            locationResponse.on("data", function (data) {
              locationData += data;
            });

            locationResponse.on("end", function () {
              try {
                const parsedLocationData = JSON.parse(locationData);

                if (parsedLocationData?.data?.location?.coordinates) {
                  lat = parsedLocationData.data.location.coordinates[1];
                  long = parsedLocationData.data.location.coordinates[0];
                } else {
                  lat = 27.7;
                  long = 85.31;
                }

                res.render("home", {
                  temp,
                  humidity,
                  windSpeed,
                  city,
                  airQualityIndex,
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
      });
    });
  });
});
app.post("/home", function (req, res) {
  const apiKey = "28cf63de-3ecf-4168-b31d-63a0c075bce8";
  const defaultCity = req.body.cityName;

  const Weather_url =
    "https://api.airvisual.com/v2/city?city=" +
    defaultCity +
    "&state=Central%20Region&country=Nepal&key=" +
    apiKey;

  const Pollution_url =
    "https://api.airvisual.com/v2/city?city=" +
    defaultCity +
    "&state=Central%20Region&country=Nepal&key=" +
    apiKey;

  const locationUrl =
    "https://api.airvisual.com/v2/city?city=" +
    defaultCity +
    "&state=Central%20Region&country=Nepal&key=" +
    apiKey;

  let temp, city, airQualityIndex, lat, long;

  https.get(Weather_url, function (weatherResponse) {
    let weatherData = "";

    weatherResponse.on("data", function (data) {
      weatherData += data;
    });

    weatherResponse.on("end", function () {
      const parsedWeatherData = JSON.parse(weatherData);
      temp = parsedWeatherData.data.current.weather.tp;
      city = parsedWeatherData.data.city;
      humidity = parsedWeatherData.data.current.weather.hu;
      windSpeed = parsedWeatherData.data.current.weather.ws;

      https.get(Pollution_url, function (pollutionResponse) {
        let pollutionData = "";

        pollutionResponse.on("data", function (data) {
          pollutionData += data;
        });

        pollutionResponse.on("end", function () {
          const parsedPollutionData = JSON.parse(pollutionData);
          airQualityIndex = parsedPollutionData.data.current.pollution.aqius;

          https.get(locationUrl, function (locationResponse) {
            let locationData = "";

            locationResponse.on("data", function (data) {
              locationData += data;
            });

            locationResponse.on("end", function () {
              try {
                const parsedLocationData = JSON.parse(locationData);

                if (parsedLocationData?.data?.location?.coordinates) {
                  lat = parsedLocationData.data.location.coordinates[1];
                  long = parsedLocationData.data.location.coordinates[0];
                } else {
                  lat = 27.7;
                  long = 85.31;
                }

                res.render("home", {
                  temp,
                  humidity,
                  windSpeed,
                  city,
                  airQualityIndex,
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
      });
    });
  });
});

app.listen(5000, function () {
  console.log("Server started at port 5000");
});
