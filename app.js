const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const password = req.body.password;
    const data = {
        members : [
            {
            email_address: email,
            status:"Success",
            merge_fields:{
                FNAME:firstName,
                LNAME : lastName,
                PASSWORD:password
            }
         }
        ]
    }
    });

    // app.get()

    
// app.listen(3000,function(){
//     console.log("Server started on port 3000");
// });
// =======
const https = require("https");
// const bodyParser = require("body-parser");
// const express = require("express");

// const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/weather", function (req, res) {
  const apiKey = "28cf63de-3ecf-4168-b31d-63a0c075bce8";
  const defaultCity = "Kathmandu";
  const Weather_url =
    "https://api.airvisual.com/v2/city?city=" +
    defaultCity +
    "&state=Central%20Region&country=Nepal&key=" +
    apiKey;
  https.get(Weather_url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.data.current.weather.tp;
      const humidity = weatherData.data.current.weather.hu;
      const city = weatherData.data.city;
      res.render("index.ejs", { temp, humidity, city });
    });
  });
});
app.post("/weather", function (req, res) {
  const apiKey = "28cf63de-3ecf-4168-b31d-63a0c075bce8";
  const currentCity = req.body.city;
  const Weather_url =
    "https://api.airvisual.com/v2/city?city=" +
    currentCity +
    "&state=Central%20Region&country=Nepal&key=" +
    apiKey;

  https.get(Weather_url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.data.current.weather.tp;
      const humidity = weatherData.data.current.weather.hu;
      const city = weatherData.data.city;
      res.render("index.ejs", { temp, humidity, city });
    });
  });
});

app.get("/pollution", function (req, res) {
  const defaultCity = "Kathmandu";
  const apiKey = "28cf63de-3ecf-4168-b31d-63a0c075bce8";
  const Pollution_url =
    "https://api.airvisual.com/v2/city?city=" +
    defaultCity +
    "&state=Central%20Region&country=Nepal&key=" +
    apiKey;

  https.get(Pollution_url, function (response) {
    response.on("data", function (data) {
      const pollutionData = JSON.parse(data);
      const airQualityIndex = pollutionData.data.current.pollution.aqius;
      res.render("pollution.ejs", { airQualityIndex });
    });
  });
});

app.post("/pollution", function (req, res) {
  const currentCity = req.body.city;
  const apiKey = "28cf63de-3ecf-4168-b31d-63a0c075bce8";
  const Pollution_url =
    "https://api.airvisual.com/v2/city?city=" +
    currentCity +
    "&state=Central%20Region&country=Nepal&key=" +
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
      const lat = locatonData.data.location.coordinates[1];
      const long = locatonData.data.location.coordinates[0];
      res.render("traffic", { lat, long });
    });
  });
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});
//  e9ef15d7e3948798f3ad24fa53b5426712a0cb52
