// De recente slaapmomenten laten zien

function displayRecentSleep() {
  let recentContainer = document.querySelector(".recent-container");

  // als recent-container nog niet bestaat dan wordt er een nieuwe gemaakt
  if (!recentContainer) {
    recentContainer = document.createElement("div");
    recentContainer.classList.add("recent-container");
    document.body.insertBefore(
      recentContainer,
      document.querySelector(".add-button")
    ); //insertBefore zet de nieuwe recent vanboven dus als eerst
  }

  // de container leegmaken
  recentContainer.innerHTML = "";

  // alle slaapdata ophalen
  let data = JSON.parse(localStorage.getItem("sleepData")) || [];

  if (data.length === 0) {
    recentContainer.innerHTML = "<p>No recent sleep data</p>";
    return;
  }

  // de datums sorteren (de nieuwste moet eerst staan)
  data.sort((a, b) => new Date(b.date) - new Date(a.date));

  // er mogen maar 2 recents worden getoont
  let recentTwo = data.slice(0, 3); // slice => neemt de eerste 3 items uit de array "data"

  recentTwo.forEach((entry) => {
    let div = document.createElement("div");
    div.classList.add("recent");

    if (entry.quality === "Very bad") {
      div.style.backgroundColor = "#890101"; // rood
    } else if (entry.quality === "Oké") {
      div.style.backgroundColor = "#C77800"; // oranje
    } else if (entry.quality === "Very well") {
      div.style.backgroundColor = "#03831B"; // groen
    }

    // datum volledig uitgeschreven tonen
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let formattedDate = new Date(entry.date).toLocaleDateString(
      "en-US",
      options
    );

    div.innerHTML = `<span>${formattedDate}</span><span>${entry.hours}h</span>`;
    recentContainer.appendChild(div);
  });
}

// de slaap uren tonen op de grafiek (de balken)
function updateBars() {
  let bars = document.querySelectorAll(".chart .bar");
  let data = JSON.parse(localStorage.getItem("sleepData")) || [];

  // elke entry in een lijst met de datum erbij, zodat het later makkelijk terug te vinden is
  let dataMap = {};
  data.forEach((entry) => {
    dataMap[entry.date] = entry;
  });

  // bepaal de startdatum dan de huidige week (maandag)
  let today = new Date();
  let dayOfWeek = today.getDay(); // Zondag = 0, maandag = 1 ...  -> javascript ziet zondag als de eerste dag van de week
  let difference;
  if (dayOfWeek === 0) {
    difference = -6; // zondag, dus 6 dagen terug naar maandag
  } else {
    difference = 1 - dayOfWeek; // bijvoorbeeld: woensdag (3) -> 1 - 3 = -2 dagen terug
  }
  let monday = new Date(today);
  monday.setDate(today.getDate() + difference);

  // loop over de 7 dagen van deze week (ma tot zo)
  for (let i = 0; i < 7; i++) {
    let date = new Date(monday);
    date.setDate(monday.getDate() + i);

    // de datum volledig uitschrijven
    let yyyy = date.getFullYear();
    let mm = (date.getMonth() + 1).toString().padStart(2, "0"); // padStart -> zorgt dat de maand altijd uit twee cijfers bestaat, bijvoorbeeld "01" in plaats van "1"
    let dd = date.getDate().toString().padStart(2, "0");
    let dateStr = `${yyyy}-${mm}-${dd}`;

    let bar = bars[i];

    // checken of er data is voor deze datum
    if (dataMap[dateStr]) {
      let entry = dataMap[dateStr];
      // Hoogte: max 100px, 10px per uur (max 10 uur) -> Math.min(entry.hours * 10, 100) dit zorgt ervoor dat het niet boven 100 gaat
      let height = Math.min(entry.hours * 10, 100);
      bar.style.height = `${height}px`;

      // kleuren
      if (entry.quality === "Very bad") {
        bar.style.backgroundColor = "#890101";
      } else if (entry.quality === "Oké") {
        bar.style.backgroundColor = "#C77800";
      } else if (entry.quality === "Very well") {
        bar.style.backgroundColor = "#03831B";
      } else {
        bar.style.backgroundColor = "#010E73";
      }
    } else {
      // geen data = dan is er een klein blauw balkje
      bar.style.height = "5px";
      bar.style.backgroundColor = "#010E73";
    }
  }
}

window.addEventListener("load", () => {
  displayRecentSleep();
  updateBars();
});
