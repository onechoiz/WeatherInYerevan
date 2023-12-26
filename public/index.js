// const { response } = require("express");

let searchBtn = document.querySelector(".search");

let form = document.querySelector("form");
let navDiv = document.querySelectorAll(".nav-container");
let cityTxt = document.querySelector("#location");
let temperature = document.querySelector("#temperature");

// inject navigatition bar into ultiple html files
document.addEventListener("DOMContentLoaded", () => {
  fetch("nav.html")
    .then((res) => res.text())
    .then((data) => {
      navDiv.forEach((el) => {
        el.innerHTML = data;
      });
    })

    .catch((Err) => {
      console.log("erorr:", Err);
    });
});

// cheeckif there is form and if there is handle the submission
if (form) {
  form.addEventListener("submit", async (e) => {
    // prevent the page from default reloading upon submission
    e.preventDefault();
    
     try {
     let cityVal = document.getElementById('usr-input').value;
  console.log(cityVal); 

 const resp = await fetch("/submit-form",{
    method: 'POST',
    headers:{
        'Content-Type':'application/json' 
    },
    body: JSON.stringify({
        city: cityVal
    })
  })
   
  const rep = await resp.json()
    console.log(rep);

  sessionStorage.setItem('weatherData', JSON.stringify(rep));
  window.location.href= "weatherDisplay.html"
  } catch (error) {
    console.log(error);
  }
 

    console.log("Form submitted!");
    // console.log(usrInpt);
    // if (cityTxt && usrInpt) {
    //   let cityName =
    //     usrInpt.trim().slice(0, 1).toUpperCase() + usrInpt.trim().slice(1);
    //   cityTxt.textContent = `city: ${cityName}`;
    // }
  });
}
