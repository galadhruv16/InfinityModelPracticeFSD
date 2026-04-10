const menuGrid = document.getElementById("menuGrid");
const menuSearch = document.getElementById("menuSearch");
const clearSearch = document.getElementById("clearSearch");
const menuCount = document.getElementById("menuCount");
const orderCount = document.getElementById("orderCount");
const specialText = document.getElementById("specialText");
const contactForm = document.getElementById("contactForm");
const contactAlert = document.getElementById("contactAlert");
const navLinks = document.querySelectorAll(".nav-links a");

const menuItems = Array.from(document.querySelectorAll(".menu-item"));
let cartTotal = 0;

const specials = [
  "Buy 1 Get 1 Free Pizza!",
  "Free drink with any burger combo!",
  "20% off on Pasta Alfredo today!",
  "Dessert on the house with any main dish!",
];

function updateMenuCount(visibleCount) {
  menuCount.textContent = `${visibleCount} item${visibleCount === 1 ? "" : "s"}`;
}

function addActionButtons() {
  menuItems.forEach((item) => {
    const body = item.querySelector(".item-body");
    if (!body || body.querySelector(".item-actions")) {
      return;
    }

    const actions = document.createElement("div");
    actions.className = "item-actions";

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "add-btn";
    addBtn.textContent = "Add to Order";

    addBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      cartTotal += 1;
      orderCount.textContent = cartTotal;
      addBtn.textContent = "Added!";
      addBtn.disabled = true;
      setTimeout(() => {
        addBtn.textContent = "Add to Order";
        addBtn.disabled = false;
      }, 900);
    });

    actions.appendChild(addBtn);
    body.appendChild(actions);
  });
}

function bindMenuHighlights() {
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuItems.forEach((card) => card.classList.remove("highlight"));
      item.classList.add("highlight");
    });
  });
}

function filterMenu(query) {
  const term = query.trim().toLowerCase();
  let visible = 0;

  menuItems.forEach((item) => {
    const title = item.querySelector("h5")?.textContent.toLowerCase() || "";
    const desc = item.querySelector("p")?.textContent.toLowerCase() || "";
    const matches = title.includes(term) || desc.includes(term);

    item.style.display = matches ? "block" : "none";
    if (matches) {
      visible += 1;
    }
  });

  updateMenuCount(visible);
}

function cycleSpecials() {
  let index = 0;
  setInterval(() => {
    index = (index + 1) % specials.length;
    specialText.textContent = specials[index];
  }, 3500);
}

function setupNavLinks() {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
}

function setupContactForm() {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();

    if (!name) {
      contactAlert.textContent = "Please enter your name before sending.";
      return;
    }

    contactAlert.textContent = `Thanks, ${name}! We will get back to you shortly.`;
    contactForm.reset();
  });
}

menuSearch.addEventListener("input", (event) => {
  filterMenu(event.target.value);
});

clearSearch.addEventListener("click", () => {
  menuSearch.value = "";
  filterMenu("");
});

addActionButtons();
bindMenuHighlights();
setupNavLinks();
setupContactForm();
updateMenuCount(menuItems.length);
cycleSpecials();
