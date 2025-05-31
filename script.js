let selectedSleepQuality = "Not selected";

function setSleepQuality(quality, button) {
  selectedSleepQuality = quality;

  // verwijder class selected van alle buttons
  document.querySelectorAll(".button-container button").forEach((btn) => {
    btn.classList.remove("selected");
  });

  // selected toevoegen aan de knop die geselcteerd is
  button.classList.add("selected");
}

document.querySelector(".red").addEventListener("click", (event) => {
  setSleepQuality("Very bad", event.target);
});

document.querySelector(".orange").addEventListener("click", (event) => {
  setSleepQuality("Oké", event.target);
});

document.querySelector(".green").addEventListener("click", (event) => {
  setSleepQuality("Very well", event.target);
});

document.querySelector(".save-button").addEventListener("click", (e) => {
  e.preventDefault();

  let date = document.querySelector("#sleep-date").value;
  let hours = document.querySelector("#sleep-hours").value;

  let sleep = {
    date: date,
    hours: hours,
    quality: selectedSleepQuality,
  };

  let sleepData = JSON.parse(localStorage.getItem("sleepData")) || [];

  // Checken of deze datum al bestaat in mijn local storage
  let index = sleepData.findIndex((entry) => entry.date === date);

  if (index !== -1) {
    // Als datum bestaat dan wordt deze overschreven
    sleepData[index] = sleep;
  } else {
    // Zo niet dan wordt er een nieuwe toegevoegd
    sleepData.push(sleep);
  }

  localStorage.setItem("sleepData", JSON.stringify(sleepData));

  // Terug naar index.html
  window.location.href = "index.html";
});
