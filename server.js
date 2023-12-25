const express = require("express");

// const cities = require('cities')
// const loc = require('city-lat-long-map')

const port = 3002;

// console.log(loc['New York, NY']);

// getting city's lat, long from cities npm to feed te api

const lng = "";
const lat = "";
// only for USA
// const getLngLot = (city, state) =>{
//     //  console.log(cities.findByCityAndState(cityname))
// // console.log(cities.filter((e)=> e.city === cityname));
// (cities.findByCityAndState(city, state))
// }

// geet weather from API
const key = ``;
const URL = `https://api.open-meteo.com/v1/forecast?latitude=40.1811&longitude=44.5136&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,precipitation_probability,visibility&timezone=auto`;



// handle express
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// handle home
app.get("", (req, res) => {
  // res.sendFile(path.resolve('public/index.html'))
  res.redirect("index.html");
});
// handle about
app.get("/about", (req, res) => {
  res.redirect("about.html");
});

// handle help page
app.get("/help", (req, res) => {
  res.redirect("help.html");
});

// handle form user submission
app.post("/submit-form", (req, res) => {
  const userInputCity = req.body.usrInpt;
  if (userInputCity.toLowerCase() === "yerevan") {
    try{
      fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(" api call:", data);
       res.send(data)
    })
    .catch((err) => {
       console.log(err);
    })

    }
    catch(err){
      console.log(err);
    }
  
}else{
  console.log("something went  wrong ");
   res.status(500).json({msg: "some went wrong"})
}
  
    // console.log('weather data :',weatherData);
    // res.send(weatherData);

});

// handle page not found
app.use((req, res) => {
  res.status(404).redirect("404.html");
});

app.listen(port, () => {
  console.log("on: ", port);
});
