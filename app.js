const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const fetch = require("node-fetch");

const app = express();

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", function (req, res) {
  res.render("home", {
    "home": true,
  });
});

app.get("/dynamic", function (req, res) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=d7bc0236fd6170a8fde5d741a511b1fd",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      res.render("dynamic", {
        "temp": data.main.temp,
        "desc": data.weather[0].description,
      });
    });
});

app.listen(3000);
