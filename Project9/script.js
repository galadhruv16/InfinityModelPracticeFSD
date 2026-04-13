const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=19.07&longitude=72.87&current_weather=true";

const weatherInfo = document.getElementById("weather-info");
const fetchXhrBtn = document.getElementById("fetch-xhr");
const fetchFetchBtn = document.getElementById("fetch-fetch");
const toggleModeBtn = document.getElementById("toggle-mode");
const mainBody = document.getElementById("main-body");
const weatherCard = document.getElementById("weather-card");
const navbar = document.querySelector(".navbar");

function displayWeather(data) {
  if (!data || !data.current_weather) {
    weatherInfo.innerHTML =
      '<span class="text-danger">Weather data unavailable.</span>';
    return;
  }
  const w = data.current_weather;
  weatherInfo.innerHTML = `
        <div class="mb-2"><strong>Temperature:</strong> ${w.temperature}°C</div>
        <div class="mb-2"><strong>Wind Speed:</strong> ${w.windspeed} km/h</div>
        <div class="mb-2"><strong>Weather Code:</strong> ${w.weathercode}</div>
        <div class="mb-2"><strong>Time:</strong> ${w.time}</div>
    `;
}

function showLoading() {
  weatherInfo.innerHTML = `<div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;
}

fetchXhrBtn.addEventListener("click", () => {
  showLoading();
  const xhr = new XMLHttpRequest();
  xhr.open("GET", API_URL, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        displayWeather(data);
      } else {
        weatherInfo.innerHTML =
          '<span class="text-danger">Failed to fetch data (XHR).</span>';
      }
    }
  };
  xhr.send();
});

fetchFetchBtn.addEventListener("click", () => {
  showLoading();
  fetch(API_URL)
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => displayWeather(data))
    .catch(() => {
      weatherInfo.innerHTML =
        '<span class="text-danger">Failed to fetch data (Fetch).</span>';
    });
});

// Initial load
showLoading();
fetch(API_URL)
  .then((res) => res.json())
  .then((data) => displayWeather(data))
  .catch(() => {
    weatherInfo.innerHTML =
      '<span class="text-danger">Failed to fetch data.</span>';
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
