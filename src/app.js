const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getGeoLoc = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

console.log(path.join(__dirname, "../template/partials"));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    name: "Lukas",
    title: "HOME"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Lukas",
    title: "ABOUT"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Lukas",
    title: "HELP"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({ error: "Provide a city name to search" });
  getGeoLoc(req.query.address, (error, { lat, long, name } = {}) => {
    if (error) return res.send({ error });
    forecast(lat, long, (error, data) => {
      if (error) return res.send({ error });
      res.send({
        location: name,
        forecast: data,
        search: req.query.address
      });
    });
  });
});
app.get("/help/*", (req, res) => {
  res.render("notFound", {
    title: "HELP PAGE NOT FOUND"
  });
});
app.get("*", (req, res) => {
  res.render("notFound", {
    title: "PAGE NOT FOUND"
  });
});
app.listen(3000, () => console.log("Server is running"));
