// REST API version: fetch weather for multiple cities using Open-Meteo REST API
// Uses geocoding to get latitude/longitude for city, then fetches weather

const API_GEOCODE = "https://geocoding-api.open-meteo.com/v1/search?name=";
const API_WEATHER =
  "https://api.open-meteo.com/v1/forecast?current_weather=true";

const weatherList = document.getElementById("weather-list");
const cityForm = document.getElementById("city-form");
const cityInput = document.getElementById("city-input");
const toggleModeBtn = document.getElementById("toggle-mode");
const mainBody = document.getElementById("main-body");
const weatherCard = document.getElementById("weather-card");
const navbar = document.querySelector(".navbar");

let cities = [{ name: "Mumbai" }, { name: "Delhi" }, { name: "London" }];

function createWeatherCard(city, weather) {
  if (!weather) {
    return `<div class="col-12 col-md-6 col-lg-4">
            <div class="card weather-city-card border-danger border-2">
                <div class="card-body text-center">
                    <h5 class="card-title mb-2">${city.name}</h5>
                    <div class="text-danger">Weather data unavailable.</div>
                </div>
            </div>
        </div>`;
  }
  return `<div class="col-12 col-md-6 col-lg-4">
        <div class="card weather-city-card">
            <div class="card-body text-center">
                <h5 class="card-title mb-2">${city.name}</h5>
                <div class="mb-2"><strong>Temperature:</strong> ${weather.temperature}°C</div>
                <div class="mb-2"><strong>Wind Speed:</strong> ${weather.windspeed} km/h</div>
                <div class="mb-2"><strong>Weather Code:</strong> ${weather.weathercode}</div>
                <div class="mb-2"><strong>Time:</strong> ${weather.time}</div>
            </div>
        </div>
    </div>`;
}

async function fetchWeatherForCity(city) {
  // 1. Geocode city to get lat/lon
  try {
    const geoRes = await fetch(API_GEOCODE + encodeURIComponent(city.name));
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) return null;
    const { latitude, longitude } = geoData.results[0];
    // 2. Fetch weather for lat/lon
    const weatherRes = await fetch(
      `${API_WEATHER}&latitude=${latitude}&longitude=${longitude}`,
    );
    const weatherData = await weatherRes.json();
    return weatherData.current_weather || null;
  } catch (e) {
    return null;
  }
}

async function renderWeatherList() {
  weatherList.innerHTML =
    '<div class="text-center w-100 py-4"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';
  const weatherResults = await Promise.all(
    cities.map(async (city) => {
      const weather = await fetchWeatherForCity(city);
      return createWeatherCard(city, weather);
    }),
  );
  weatherList.innerHTML = weatherResults.join("");
}

cityForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cityName = cityInput.value.trim();
  if (!cityName) return;
  if (cities.some((c) => c.name.toLowerCase() === cityName.toLowerCase())) {
    cityInput.value = "";
    return;
  }
  cities.push({ name: cityName });
  cityInput.value = "";
  await renderWeatherList();
});

// Light/Dark mode toggle
function setDarkMode(isDark) {
  if (isDark) {
    mainBody.classList.add("dark-mode");
    weatherCard.classList.add("dark-mode");
    navbar.classList.add("dark-mode");
    toggleModeBtn.textContent = "Light Mode";
  } else {
    mainBody.classList.remove("dark-mode");
    weatherCard.classList.remove("dark-mode");
    navbar.classList.remove("dark-mode");
    toggleModeBtn.textContent = "Dark Mode";
  }
}

let darkMode = false;
toggleModeBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  setDarkMode(darkMode);
});

// Initial render
renderWeatherList();
