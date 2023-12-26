const express = require('express');
const fs = require('fs');
const port = 3002;
let citiesData;

fs.readFile('cities.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err);
    process.exit(1); // Terminate the server on error
  }
  try {
    // Parse the JSON data
    cities = JSON.parse(data);
    citiesData = cities.cities
    // console.log(citiesData);
  

    startServer();
    // console.log(citiesData);
    console.log('server started');
  } catch (error) {
    console.error('Error parsing JSON:', error);
    process.exit(1); // Terminate the server on error
  }
});

  const app = express();
  app.use((req, res, next) => {
    req.citiesData = citiesData;
    next();
  });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json())
  app.use(express.static('public'));

function startServer() {


  // handle home
  app.get('', (req, res) => {
    res.redirect('index.html');
  });

  // handle about
  app.get('/about', (req, res) => {
    res.redirect('about.html');
  });

  // handle help page
  app.get('/help', (req, res) => {
    res.redirect('help.html');
  });

  // handle form user submission
  app.post('/submit-form', async (req, res) => {
    const cityName = req.body.city;
    // console.log(cityName,': cityname');
    console.log(req.body, "req");
    const searchDate = req.body.date;

    try {
      // console.log(citiesData);
      const city = citiesData.find((e) => e.name.toLowerCase().trim() === cityName.toLowerCase());
      if (city) {
        let lng = city.longitude;
        let lat = city.latitude;
        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,precipitation_probability,visibility&timezone=auto`;

        const response = await fetch(URL);
        const weatherData = await response.json();
        console.log(weatherData);
        res.json(weatherData);
      } else {
        res.status(404).json({ error: 'City not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // handle page not found
  app.use((req, res) => {
    res.status(404).redirect('404.html');
  });

  app.listen(port, () => {
    console.log('on: ', port);
  });
}
