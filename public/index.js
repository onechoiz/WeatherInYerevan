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
    let usrInpt = document.querySelector(".usr-inpt").value;
    //    post request to the seerver to send the user input
    try {
      let res = await fetch("/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ usrInpt }),
      });

      if (res) {
        let data = await res.json();
        console.log(data.current);
      }else {
            // Handle the error based on the response status
            console.log('Server returned an error:', res.status);
        }
    } catch (error) {
      console.log(error);
    }
    // }
    //          const response = fetch('/submit-form',{
    //             method:'POST',
    //             headers:{
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             },
    //             body: new URLSearchParams({usrInpt})
    //          }).then(res =>res.json()).then(data => console.log(data.current)).
    //          catch(err =>{
    //             console.log('front- error',err);
    //          })

    console.log("Form submitted!");
    console.log(usrInpt);
    if (cityTxt && usrInpt) {
      let cityName =
        usrInpt.trim().slice(0, 1).toUpperCase() + usrInpt.trim().slice(1);
      cityTxt.textContent = `city: ${cityName}`;
    }
  });
}
