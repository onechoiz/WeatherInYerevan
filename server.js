const express = require('express');
const fs = require('fs')
const port = 3002;
const  citiesData = []

const lng = "";
const lat = "";


// geet weather from API
const key = ``;
const URL = `https://api.open-meteo.com/v1/forecast?latitude=40.1811&longitude=44.5136&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,precipitation_probability,visibility&timezone=auto`;



fs.readFile('cities.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err);
    process.exit(1); // Terminate the server on error
  }

  try {
    // Parse the JSON data
    citiesData = JSON.parse(data);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    process.exit(1); // Terminate the server on error
  }
});


// handle express
const app = express();
app.use((req,res,next)=>{
  req.citiesData = citiesData
  next()
})
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
   res.status(500).json({msg: "some went wrong: we only check for  weather in Yerevan"})
}
  

});













// handle page not found
app.use((req, res) => {
  res.status(404).redirect("404.html");
});












app.listen(port, () => {
  console.log("on: ", port);
});
