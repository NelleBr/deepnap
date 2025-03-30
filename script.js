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

document.querySelector(".save-button").addEventListener("click", saveData);

function saveData(event) {
  event.preventDefault();
  let date = document.querySelector("#sleep-date").value;
  let hours = document.querySelector("#sleep-hours").value;

  let sleep = {
    date: date,
    hours: hours,
    quality: selectedSleepQuality,
  };

  localStorage.setItem("sleep", JSON.stringify(sleep));
}
