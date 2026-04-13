document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const appointmentForm = document.getElementById("appointmentForm");
  const resetBtn = document.getElementById("resetBtn");
  const activityLog = document.getElementById("activityLog");
  const searchInput = document.getElementById("patientSearch");
  const searchResult = document.getElementById("searchResult");
  const departmentCards = document.querySelectorAll(".department-card");
  const departmentSelect = document.getElementById("department");

  const formFields = document.querySelectorAll(
    "#appointmentForm input, #appointmentForm select, #appointmentForm textarea"
  );

  const patients = [
    { name: "Rahul Sharma", department: "Cardiology" },
    { name: "Priya Mehta", department: "Neurology" },
    { name: "Amit Patel", department: "Orthopedics" },
    { name: "Neha Verma", department: "Pediatrics" },
    { name: "Arjun Singh", department: "Cardiology" },
    { name: "Sneha Joshi", department: "Neurology" },
    { name: "Karan Desai", department: "Orthopedics" },
    { name: "Riya Nair", department: "Pediatrics" }
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
      searchResult.textContent = "Start typing to search patients...";
      return;
    }

    if (results.length === 0) {
      searchResult.innerHTML = `<div class="small">No patients found for "<strong>${query}</strong>"</div>`;
      return;
    }

    searchResult.innerHTML = results
      .map(function (patient) {
        return `
          <div class="border rounded p-2 mb-2">
            <div><strong>${patient.name}</strong></div>
            <div class="small text-muted">Department: ${patient.department}</div>
          </div>
        `;
      })
      .join("");
  }

  const savedTheme = localStorage.getItem("healthcare-theme") || "dark";
  applyTheme(savedTheme);

  themeToggle.addEventListener("change", function () {
    const theme = themeToggle.checked ? "dark" : "light";
    applyTheme(theme);
    localStorage.setItem("healthcare-theme", theme);
    addLog(`Theme switched to ${theme} mode`);
  });

  departmentCards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      card.style.transform = "translateY(-5px)";
      addLog(`Hovered over ${card.dataset.department}`);
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "translateY(0)";
    });

    card.addEventListener("click", function () {
      departmentCards.forEach(function (c) {
        c.classList.remove("active-card");
      });

      card.classList.add("active-card");
      departmentSelect.value = card.dataset.department;
      addLog(`${card.dataset.department} selected from department cards`);
    });
  });

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
      renderResults([], "");
      return;
    }

    const filteredPatients = patients.filter(function (patient) {
      return (
        patient.name.toLowerCase().includes(query) ||
        patient.department.toLowerCase().includes(query)
      );
    });

    renderResults(filteredPatients, searchInput.value.trim());
    addLog(`Searching patients for "${searchInput.value.trim()}"`);
  });

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      const query = searchInput.value.trim().toLowerCase();

      if (query === "") {
        renderResults([], "");
        addLog("Enter pressed on empty patient search");
        return;
      }

      const filteredPatients = patients.filter(function (patient) {
        return (
          patient.name.toLowerCase().includes(query) ||
          patient.department.toLowerCase().includes(query)
        );
      });

      renderResults(filteredPatients, searchInput.value.trim());
      addLog(`Patient search submitted with keyboard: ${searchInput.value.trim()}`);
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

  appointmentForm.addEventListener("submit", function (event) {
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

    if (!isValid) {
      addLog("Form submission blocked due to missing required fields");
      alert("Please fill all required fields.");
      return;
    }

    const patientName = document.getElementById("patientName").value;
    const selectedDepartment = document.getElementById("department").value;
    const appointmentDate = document.getElementById("appointmentDate").value;

    addLog(
      `Appointment booked for ${patientName} in ${selectedDepartment} on ${appointmentDate}`
    );

    alert("Appointment submitted successfully.");

    appointmentForm.reset();

    formFields.forEach(function (field) {
      field.classList.remove("is-valid", "is-invalid", "input-focus");
    });

    departmentCards.forEach(function (card) {
      card.classList.remove("active-card");
    });

    renderResults([], "");
  });

  resetBtn.addEventListener("click", function () {
    formFields.forEach(function (field) {
      field.classList.remove("is-valid", "is-invalid", "input-focus");
    });

    departmentCards.forEach(function (card) {
      card.classList.remove("active-card");
    });

    renderResults([], "");
    addLog("Appointment form reset");
  });
});