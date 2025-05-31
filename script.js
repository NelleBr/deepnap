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

function limitDatePickerToThisWeek() {
  let dateInput = document.querySelector("#sleep-date");
  let today = new Date();
  let dayOfWeek = today.getDay(); // zondag = 0, maandag = 1, ... -> javascript ziet zondag als de eerste dag van de week

  // maandag berekenen
  let difference;
  if (dayOfWeek === 0) {
    difference = -6; // zondag, dus 6 dagen terug naar maandag
  } else {
    difference = 1 - dayOfWeek; // bijvoorbeeld: woensdag (3) -> 1 - 3 = -2 dagen terug
  }
  let monday = new Date(today);
  monday.setDate(today.getDate() + difference);

  // zondag berekenen
  let sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  // de datum schrijven zoals dit -> yyyy-mm-dd
  let formatDate = (date) => {
    let yyyy = date.getFullYear();
    let mm = (date.getMonth() + 1).toString().padStart(2, "0"); // padStart -> zorgt dat de maand altijd uit twee cijfers bestaat, bijvoorbeeld "01" in plaats van "1"
    let dd = date.getDate().toString().padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  dateInput.min = formatDate(monday);
  dateInput.max = formatDate(sunday);
}

// zorgt dat het wordt uitgevoerd
limitDatePickerToThisWeek();
