const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

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

// app.get("/", function (req, res) {
//   const apiKey = "28cf63de-3ecf-4168-b31d-63a0c075bce8";
//   const defaultCity = "Kathmandu";
//   const Weather_url =
//     "https://api.airvisual.com/v2/city?city=" +
//     defaultCity +
//     "&state=Central%20Region&country=Nepal&key=" +
//     apiKey;
//   https.get(Weather_url, function (response) {
//     response.on("data", function (data) {
//       const weatherData = JSON.parse(data);
//       const temp = weatherData.data.current.weather.tp;
//       const humidity = weatherData.data.current.weather.hu;
//       const city = weatherData.data.city;
//       res.render("index.ejs", { temp, humidity, city });
//     });
//   });
// });
// app.post("/", function (req, res) {
//   const apiKey = "28cf63de-3ecf-4168-b31d-63a0c075bce8";
//   const currentCity = req.body.city;
//   const Weather_url =
//     "https://api.airvisual.com/v2/city?city=" +
//     currentCity +
//     "&state=Central%20Region&country=Nepal&key=" +
//     apiKey;

//   https.get(Weather_url, function (response) {
//     response.on("data", function (data) {
//       const weatherData = JSON.parse(data);
//       const temp = weatherData.data.current.weather.tp;
//       const humidity = weatherData.data.current.weather.hu;
//       const city = weatherData.data.city;
//       res.render("index.ejs", { temp, humidity, city });
//     });
//   });
// });

// app.get("/pollution", function (req, res) {
//   const defaultCity = "Kathmandu";
//   const apiKey = "28cf63de-3ecf-4168-b31d-63a0c075bce8";
//   const Pollution_url =
//     "https://api.airvisual.com/v2/city?city=" +
//     defaultCity +
//     "&state=Central%20Region&country=Nepal&key=" +
//     apiKey;

//   https.get(Pollution_url, function (response) {
//     response.on("data", function (data) {
//       const pollutionData = JSON.parse(data);
//       const airQualityIndex = pollutionData.data.current.pollution.aqius;
//       res.render("pollution.ejs", { airQualityIndex });
//     });
//   });
// });

// app.post("/pollution", function (req, res) {
//   const currentCity = req.body.city;
//   const apiKey = "28cf63de-3ecf-4168-b31d-63a0c075bce8";
//   const Pollution_url =
//     "https://api.airvisual.com/v2/city?city=" +
//     currentCity +
//     "&state=Central%20Region&country=Nepal&key=" +
//     apiKey;

//   https.get(Pollution_url, function (response) {
//     response.on("data", function (data) {
//       const pollutionData = JSON.parse(data);
//       const airQualityIndex = pollutionData.data.current.pollution.aqius;
//       res.render("pollution.ejs", { airQualityIndex });
//     });
//   });
// });

app.get("/traffic", function (req, res) {
  const defaultCity = "Kathmandu";
  const apiKey = "28cf63de-3ecf-4168-b31d-63a0c075bce8";
  const locationUrl =
    "https://api.airvisual.com/v2/city?city=" +
    defaultCity +
    "&state=Central%20Region&country=Nepal&key=" +
    apiKey;
  https.get(locationUrl, function (response) {
    response.on("data", function (data) {
      const locatonData = JSON.parse(data);
      const lat = locatonData.data.location.coordinates[1];
      const long = locatonData.data.location.coordinates[0];
      res.render("traffic", { lat, long });
    });
  });
});
app.post("/traffic", function (req, res) {
  const currentCity = req.body.city;
  const apiKey = "28cf63de-3ecf-4168-b31d-63a0c075bce8";
  const locationUrl =
    "https://api.airvisual.com/v2/city?city=" +
    currentCity +
    "&state=Central%20Region&country=Nepal&key=" +
    apiKey;
  https.get(locationUrl, function (response) {
    response.on("data", function (data) {
      const locatonData = JSON.parse(data);
      const longlat = {
        lat: locatonData.data.location.coordinates[1],
        long: locatonData.data.location.coordinates[0],
      };
      const lat = longlat.lat;
      const long = longlat.long;
      // console.log(long, lat);

      res.render("traffic", { lat, long });
    });
  });
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});
