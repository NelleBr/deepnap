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
  let recentTwo = data.slice(0, 2); // slice => neemt de eerste 2 items uit de array "data"

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

window.addEventListener("load", () => {
  displayRecentSleep();
});
