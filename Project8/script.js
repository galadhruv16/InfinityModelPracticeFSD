document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const reservationForm = document.getElementById("reservationForm");
  const resetBtn = document.getElementById("resetBtn");
  const activityLog = document.getElementById("activityLog");
  const searchInput = document.getElementById("trainSearch");
  const searchResult = document.getElementById("searchResult");
  const trainCards = document.querySelectorAll(".train-card");
  const trainSelect = document.getElementById("trainName");

  const formFields = document.querySelectorAll(
    "#reservationForm input, #reservationForm select"
  );

  const trains = [
    {
      name: "Rajdhani Express",
      route: "Mumbai - Delhi",
      class: "1A / 2A / 3A"
    },
    {
      name: "Shatabdi Express",
      route: "Ahmedabad - Mumbai",
      class: "CC / Executive"
    },
    {
      name: "Duronto Express",
      route: "Pune - Kolkata",
      class: "Sleeper / 3A / 2A"
    },
    {
      name: "Garib Rath",
      route: "Surat - Jaipur",
      class: "3A"
    }
  ];

  function addLog(message) {
    const time = new Date().toLocaleTimeString();
    const item = document.createElement("li");
    item.className = "list-group-item";
    item.textContent = `[${time}] ${message}`;
    activityLog.prepend(item);

    if (activityLog.children.length > 8) {
      activityLog.removeChild(activityLog.lastChild);
    }
  }

  function applyTheme(theme) {
    if (theme === "light") {
      body.classList.add("light-mode");
      body.classList.remove("dark-mode");
      themeToggle.checked = false;
    } else {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
      themeToggle.checked = true;
    }
  }

  function renderResults(results, query) {
    if (!query) {
      searchResult.textContent = "Start typing to search trains...";
      return;
    }

    if (results.length === 0) {
      searchResult.innerHTML = `<div class="small">No trains found for "<strong>${query}</strong>"</div>`;
      return;
    }

    searchResult.innerHTML = results
      .map(function (train) {
        return `
          <div class="border rounded p-2 mb-2">
            <div><strong>${train.name}</strong></div>
            <div class="small text-muted">Route: ${train.route}</div>
            <div class="small text-muted">Class: ${train.class}</div>
          </div>
        `;
      })
      .join("");
  }

  const savedTheme = localStorage.getItem("railway-theme") || "dark";
  applyTheme(savedTheme);

  themeToggle.addEventListener("change", function () {
    const theme = themeToggle.checked ? "dark" : "light";
    applyTheme(theme);
    localStorage.setItem("railway-theme", theme);
    addLog(`Theme switched to ${theme} mode`);
  });

  trainCards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      addLog(`Hovered over ${card.dataset.train}`);
    });

    card.addEventListener("mouseleave", function () {});

    card.addEventListener("click", function () {
      trainCards.forEach(function (c) {
        c.classList.remove("active-card");
      });

      card.classList.add("active-card");
      trainSelect.value = card.dataset.train;
      addLog(`${card.dataset.train} selected from train cards`);
    });
  });

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
      renderResults([], "");
      return;
    }

    const filteredTrains = trains.filter(function (train) {
      return (
        train.name.toLowerCase().includes(query) ||
        train.route.toLowerCase().includes(query)
      );
    });

    renderResults(filteredTrains, searchInput.value.trim());
    addLog(`Searching trains for "${searchInput.value.trim()}"`);
  });

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      const query = searchInput.value.trim().toLowerCase();

      if (query === "") {
        renderResults([], "");
        addLog("Enter pressed on empty train search");
        return;
      }

      const filteredTrains = trains.filter(function (train) {
        return (
          train.name.toLowerCase().includes(query) ||
          train.route.toLowerCase().includes(query)
        );
      });

      renderResults(filteredTrains, searchInput.value.trim());
      addLog(`Train search submitted with keyboard: ${searchInput.value.trim()}`);
    }
  });

  formFields.forEach(function (field) {
    field.addEventListener("focus", function () {
      field.classList.add("input-focus");
      addLog(`Focused on ${field.name || field.id}`);
    });

    field.addEventListener("blur", function () {
      field.classList.remove("input-focus");

      const value = field.value.trim();

      if (field.hasAttribute("required") && value === "") {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
      } else if (value !== "") {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
      }
    });
  });

  reservationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    formFields.forEach(function (field) {
      const value = field.value.trim();

      if (field.hasAttribute("required") && value === "") {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        isValid = false;
      } else {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
      }
    });

    const seats = document.getElementById("seats").value;

    if (Number(seats) < 1 || Number(seats) > 6) {
      document.getElementById("seats").classList.add("is-invalid");
      isValid = false;
    }

    if (!isValid) {
      addLog("Ticket reservation blocked due to invalid or missing fields");
      alert("Please fill all required fields correctly.");
      return;
    }

    const passengerName = document.getElementById("passengerName").value;
    const trainName = document.getElementById("trainName").value;
    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;
    const journeyDate = document.getElementById("journeyDate").value;

    addLog(
      `Ticket booked for ${passengerName} on ${trainName} from ${source} to ${destination} on ${journeyDate}`
    );

    alert("Ticket reserved successfully.");

    reservationForm.reset();

    formFields.forEach(function (field) {
      field.classList.remove("is-valid", "is-invalid", "input-focus");
    });

    trainCards.forEach(function (card) {
      card.classList.remove("active-card");
    });

    renderResults([], "");
  });

  resetBtn.addEventListener("click", function () {
    formFields.forEach(function (field) {
      field.classList.remove("is-valid", "is-invalid", "input-focus");
    });

    trainCards.forEach(function (card) {
      card.classList.remove("active-card");
    });

    renderResults([], "");
    addLog("Reservation form reset");
  });
});