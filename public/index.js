const form = document.getElementById("form");

// cheeckif there is form and if there is handle the submission

if (form) {
  form.addEventListener("submit", async (e) => {
    // prevent the page from default reloading upon submission
    e.preventDefault();

    try {
      let cityVal = document.getElementById("usr-input").value;
      console.log(cityVal, "city val");

      const resp = await fetch("/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: cityVal,
        }), 
      });
     if(!resp.ok){
      throw new error({error: "HTTP error!"})
     }
      const weatherdata = await resp.json();
      console.log("resp",weatherdata.current);

      localStorage.setItem("weatherData", JSON.stringify(weatherdata));
      window.location.href = "weatherDisplay.html";
      localStorage.clear()
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
