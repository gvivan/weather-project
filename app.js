//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "edf349e7e8ce9567a1389b2e730e8b4a";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response) {
      console.log(response.statusCode);

      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<p>The weather is currently " + description + "<p>");
        res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius.</h1>")
        res.write("<img src=" + iconURL + ">");
        res.send();
      })
    })
})

app.listen(3000, function(){
  console.log("server started on port 3000");
})
