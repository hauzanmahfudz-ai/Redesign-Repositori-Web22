// 1. Render Icon Feather Icons
feather.replace();

// 2. Element Selector
const navbarNav = document.querySelector(".navbar-nav");
const hamburgerMenu = document.querySelector("#hamburger-menu");
const searchForm = document.querySelector(".search-form");
const searchBtn = document.querySelector("#search-button");
const searchBox = document.querySelector("#search-box");

// 3. Toggle Hamburger Menu
if (hamburgerMenu) {
  hamburgerMenu.onclick = (e) => {
    e.preventDefault();
    navbarNav.classList.toggle("active");
  };
}

// 4. Toggle Search Form
if (searchBtn) {
  searchBtn.onclick = (e) => {
    e.preventDefault();
    searchForm.classList.toggle("active");
    if (searchBox) searchBox.focus(); // Kursor otomatis masuk ke kolom input
  };
}

// 5. Klik di Luar Element untuk Menutup Navbar & Search Box
document.addEventListener("click", function (e) {
  // Sembunyikan Nav Menu jika klik di luar
  if (hamburgerMenu && navbarNav) {
    if (!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
      navbarNav.classList.remove("active");
    }
  }

  // Sembunyikan Search Form jika klik di luar
  if (searchBtn && searchForm) {
    if (!searchBtn.contains(e.target) && !searchForm.contains(e.target)) {
      searchForm.classList.remove("active");
    }
  }
});

// 6. Fetching Data Courses dari Gist
const gistUrl =
  "https://gist.githubusercontent.com/fanhdt/c79a84879456e2832d88bf3e1020895a/raw/0c38afd136e1176bdc6de54e06ee3a1bd5f6049d/course.json";

async function getCourses() {
  try {
    const response = await fetch(gistUrl);
    if (!response.ok) {
      throw new Error("Gagal mengambil data");
    }
    const courses = await response.json();
    displayCourses(courses);
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayCourses(courses) {
  const courseList = document.querySelector("#course-list");
  if (!courseList) return;

  courseList.innerHTML = "";

  courses.forEach((course) => {
    courseList.innerHTML += `
    <div class="menu-card">
        <img src="${course.image}" alt="${course.title}">
        <div class="menu-card-content">
            <span>${course.category}</span>
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <small>Mentor: ${course.mentor}</small>
            <strong>${course.price}</strong>
            <a href="course.html?slug=${course.slug}">
            Lihat Kelas
            </a>
        </div>
    </div>
    `;
  });
}

// Jalankan Fetch Data
getCourses();
