
const courseTableBody = document.getElementById("courseTableBody");
const courseDetails = document.getElementById("courseDetails");
const totalEnrollment = document.getElementById("totalEnrollment");
const totalCourses = document.getElementById("totalCourses");
const favoriteCount = document.getElementById("favoriteCount");
const searchInput = document.getElementById("searchInput");
const themeBtn = document.getElementById("themeBtn");

const addCourseBtn = document.getElementById("addCourseBtn");
const courseTitle = document.getElementById("courseTitle");
const courseInstructor = document.getElementById("courseInstructor");
const courseEnroll = document.getElementById("courseEnroll");
const courseDesc = document.getElementById("courseDesc");

let courses = [
  {
    id: 1,
    title: "Cyber Security Basics",
    instructor: "Ananya Deshmukh",
    enrollments: 150,
    description: "Learn threats, encryption, authentication, and basic ethical security principles.",
    favorite: false,
    showDesc: false
  },
  {
    id: 2,
    title: "Data Structures in Java",
    instructor: "Vivek Rao",
    enrollments: 115,
    description: "Understand arrays, stacks, queues, linked lists, trees, and sorting techniques.",
    favorite: true,
    showDesc: false
  },
  {
    id: 3,
    title: "Digital Marketing Strategy",
    instructor: "Sana Merchant",
    enrollments: 90,
    description: "Explore SEO, branding, social media promotion, and audience engagement methods.",
    favorite: false,
    showDesc: false
  }
];

function updateStats() {
  totalCourses.textContent = courses.length;
  totalEnrollment.textContent = courses.reduce((sum, c) => sum + Number(c.enrollments), 0);
  favoriteCount.textContent = courses.filter(c => c.favorite).length;
}

function renderCourses(filteredCourses = courses) {
  courseTableBody.innerHTML = "";

  filteredCourses.forEach(course => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <div class="table-course-title">${course.title}</div>
      </td>
      <td>${course.instructor}</td>
      <td>${course.enrollments}</td>
      <td>
        <span class="status-pill ${course.favorite ? "status-favorite" : "status-normal"}">
          ${course.favorite ? "Favorite" : "Regular"}
        </span>
      </td>
      <td>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-primary btn-sm action-btn" onclick="viewDetails(${course.id})">
            <i class="bi bi-eye-fill"></i>
          </button>
          <button class="btn btn-warning btn-sm action-btn" onclick="toggleFavorite(${course.id})">
            <i class="bi bi-heart-fill"></i>
          </button>
          <button class="btn btn-success btn-sm action-btn" onclick="increaseEnrollment(${course.id})">
            <i class="bi bi-person-plus-fill"></i>
          </button>
          <button class="btn btn-danger btn-sm action-btn" onclick="removeCourse(${course.id})">
            <i class="bi bi-trash-fill"></i>
          </button>
        </div>
      </td>
    `;

    courseTableBody.appendChild(tr);
  });

  updateStats();
}

function viewDetails(id) {
  const course = courses.find(c => c.id === id);

  courseDetails.innerHTML = `
    <div class="detail-chip">${course.favorite ? "Favorite Course" : "Course Details"}</div>
    <h3 class="mb-3">${course.title}</h3>
    <p><strong>Instructor:</strong> ${course.instructor}</p>
    <p><strong>Enrollments:</strong> ${course.enrollments}</p>

    <div class="mb-3">
      <button class="btn btn-outline-secondary btn-sm rounded-pill" onclick="toggleDescription(${course.id})">
        ${course.showDesc ? "Hide Description" : "Show Description"}
      </button>
    </div>

    ${
      course.showDesc
        ? `<div class="detail-box"><strong>Description:</strong> ${course.description}</div>`
        : `<p class="text-muted mb-0">Click "Show Description" to view the course description.</p>`
    }
  `;
}

function toggleDescription(id) {
  const course = courses.find(c => c.id === id);
  course.showDesc = !course.showDesc;
  viewDetails(id);
}

function toggleFavorite(id) {
  const course = courses.find(c => c.id === id);
  course.favorite = !course.favorite;
  renderCourses(filterCourses(searchInput.value));

  const currentlyViewedTitle = courseDetails.querySelector("h3");
  if (currentlyViewedTitle && currentlyViewedTitle.textContent === course.title) {
    viewDetails(id);
  }
}

function increaseEnrollment(id) {
  const course = courses.find(c => c.id === id);
  course.enrollments++;
  renderCourses(filterCourses(searchInput.value));

  const currentlyViewedTitle = courseDetails.querySelector("h3");
  if (currentlyViewedTitle && currentlyViewedTitle.textContent === course.title) {
    viewDetails(id);
  }
}

function removeCourse(id) {
  const removed = courses.find(c => c.id === id);
  courses = courses.filter(c => c.id !== id);
  renderCourses(filterCourses(searchInput.value));

  const currentlyViewedTitle = courseDetails.querySelector("h3");
  if (currentlyViewedTitle && currentlyViewedTitle.textContent === removed.title) {
    courseDetails.innerHTML = `
      <div class="empty-state text-center">
        <i class="bi bi-check-circle display-5 mb-3"></i>
        <h5>Course Removed</h5>
        <p class="mb-0">The selected course was removed successfully.</p>
      </div>
    `;
  }
}

function filterCourses(searchText) {
  return courses.filter(course =>
    course.title.toLowerCase().includes(searchText.toLowerCase())
  );
}

searchInput.addEventListener("keyup", function () {
  renderCourses(filterCourses(searchInput.value));
});

addCourseBtn.addEventListener("click", function () {
  const title = courseTitle.value.trim();
  const instructor = courseInstructor.value.trim();
  const enrollments = courseEnroll.value.trim();
  const description = courseDesc.value.trim();

  if (!title || !instructor || !enrollments || !description) {
    alert("Please fill all fields.");
    return;
  }

  const newCourse = {
    id: Date.now(),
    title,
    instructor,
    enrollments: Number(enrollments),
    description,
    favorite: false,
    showDesc: false
  };

  courses.push(newCourse);
  renderCourses(filterCourses(searchInput.value));

  courseTitle.value = "";
  courseInstructor.value = "";
  courseEnroll.value = "";
  courseDesc.value = "";
});

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

renderCourses();
