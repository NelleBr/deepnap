let selectedSleepQuality = "Not selected";

function setSleepQuality(quality) {
  selectedSleepQuality = quality;
}

document.querySelector(".red").addEventListener("click", () => {
  setSleepQuality("Very bad");
});

document.querySelector(".orange").addEventListener("click", () => {
  setSleepQuality("Oké");
});

document.querySelector(".green").addEventListener("click", () => {
  setSleepQuality("Very well");
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
});