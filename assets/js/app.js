import { getForecast, searchCities } from "./weather.js";
import { renderWeather, showCityChoices, showLoading, showMessage, showWelcome } from "./ui.js";

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const locationForm = document.getElementById("location-form");
let matchingCities = [];

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const cityName = cityInput.value.trim();

  if (!cityName) {
    showMessage("Enter a city to get started", "Type a city name in the search box, then try again.", "empty");
    cityInput.focus();
    return;
  }

  await findCity(cityName);
});

locationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const selectedIndex = Number(document.getElementById("location-select").value);
  const city = matchingCities[selectedIndex];
  if (city) await loadForecast(city);
});

async function findCity(cityName) {
  showLoading(`Searching for ${cityName}…`);

  try {
    matchingCities = await searchCities(cityName);
    if (!matchingCities.length) {
      showMessage("No cities found", `We couldn’t find “${cityName}”. Check the spelling or try another city.`, "empty");
      return;
    }

    if (matchingCities.length > 1) {
      showCityChoices(matchingCities);
      return;
    }

    await loadForecast(matchingCities[0]);
  } catch (error) {
    showMessage("We couldn’t load that search", error.message || "Check your internet connection and try again.");
  }
}

async function loadForecast(city) {
  showLoading(`Getting the forecast for ${city.name}…`);

  try {
    const forecast = await getForecast(city.latitude, city.longitude);
    renderWeather(city, forecast);
  } catch (error) {
    showMessage("We couldn’t load the forecast", error.message || "Check your internet connection and try again.");
  }
}

showWelcome();
