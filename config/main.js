// CONFIG
var subtext = "Qwerto Games"; // set the subtext
var serverUrl1 = "https://gms.parcoil.com";
document.title = "Google";
let gamesData = [];

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set subtitle
  const subtitleEl = document.getElementById("subtitle");
  if (subtitleEl) subtitleEl.innerHTML = subtext;

  // Set up search input listener
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearchInput);
  }

  // Fetch games data
  fetch("./config/games.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load games.json");
      return response.json();
    })
    .then((data) => {
      gamesData = data;
      displayFilteredGames(data);
    })
    .catch((error) => console.error("Error fetching games:", error));
});

// Display games
function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  if (!gamesContainer) return;

  gamesContainer.innerHTML = "";

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const gameImage = document.createElement("img");
    gameImage.src = `${serverUrl1}/${game.url}/${game.image}`;
    gameImage.alt = game.name;
    gameImage.onclick = () => {
      window.location.href = `play.html?gameurl=${game.url}/`;
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

// Handle search input
function handleSearchInput() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  const searchInputValue = searchInput.value.toLowerCase();
  const filteredGames = gamesData.filter((game) =>
    game.name.toLowerCase().includes(searchInputValue)
  );
  displayFilteredGames(filteredGames);
}


