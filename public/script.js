// ======================
// Slideshow + Dropdown Filter Script
// ======================

document.addEventListener("DOMContentLoaded", () => {
  // ---------------------
  // 🔹 SLIDESHOW LOGIC
  // ---------------------
  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.getElementById("dots");

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
      dots[i].classList.toggle("active", i === index);
    });
    slideIndex = index;
  }

  function changeSlide(n) {
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    showSlide(slideIndex);
  }

  // Expose navigation functions globally
  window.changeSlide = changeSlide;

  // Auto slide every 5 seconds
  setInterval(() => changeSlide(1), 5000);

  // Show first slide
  showSlide(0);

  // ---------------------
  // 🔹 FILTER LOGIC
  // ---------------------
  const filterSelect = document.getElementById("departmentFilter");

  if (filterSelect) {
    filterSelect.addEventListener("change", () => {
      const selected = filterSelect.value.toLowerCase();
      const posts = document.querySelectorAll(".news-card");

      posts.forEach(post => {
        const department = post.getAttribute("data-dept").toLowerCase();

        if (selected === "all" || department === selected) {
          post.style.display = "block";
        } else {
          post.style.display = "none";
        }
      });
    });
  }
});



  
 // ======================
// LOGIN PAGE TOGGLE LOGIC
// ======================
document.addEventListener("DOMContentLoaded", () => {
  const adminBtn = document.getElementById("adminBtn");
  const studentBtn = document.getElementById("studentBtn");
  const adminForm = document.getElementById("adminForm");
  const studentForm = document.getElementById("studentForm");

  if (adminBtn && studentBtn && adminForm && studentForm) {
    // Switch to Admin form
    adminBtn.addEventListener("click", () => {
      adminBtn.classList.add("active");
      studentBtn.classList.remove("active");
      adminForm.classList.add("active");
      studentForm.classList.remove("active");
    });

    // Switch to Student form
    studentBtn.addEventListener("click", () => {
      studentBtn.classList.add("active");
      adminBtn.classList.remove("active");
      studentForm.classList.add("active");
      adminForm.classList.remove("active");
    });
  }

  // Optional: basic login simulation
  const adminLogin = document.getElementById("adminLogin");
  const studentLogin = document.getElementById("studentLogin");

  if (adminLogin) {
    adminLogin.addEventListener("click", () => {
      const name = document.getElementById("adminName").value.trim();
      const pass = document.getElementById("adminPass").value.trim();

      if (name === "admin" && pass === "1234") {
        alert("✅ Admin login successful!");
        window.location.href = "admin-dashboard.html"; // example page
      } else {
        alert("❌ Invalid admin credentials!");
      }
    });
  }

  if (studentLogin) {
    studentLogin.addEventListener("click", () => {
      const matric = document.getElementById("studentMatric").value.trim();
      const pass = document.getElementById("studentPass").value.trim();

      if (matric === "CSC1234" && pass === "student") {
        alert("✅ Student login successful!");
        window.location.href = "student-dashboard.html"; // example page
      } else {
        alert("❌ Invalid student credentials!");
      }
    });
  }
});


  // --- REGISTER SIMULATION ---
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Account created successfully!");
      window.location.href = "login.html";
    });
  }

  
  

if (data.role === "admin") window.location.href = "admin.html";
else window.location.href = "index.html";
// 🌟 Slideshow with Arrows + Dots
let slideIndex = 0;
let autoSlideInterval;

function showSlides(n) {
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.getElementById("dots");

  if (!slides.length) return;

  // Create dots only once
  if (!dotsContainer.hasChildNodes()) {
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.addEventListener("click", () => {
        slideIndex = i;
        displaySlide();
      });
      dotsContainer.appendChild(dot);
    });
  }

  // If n is passed, adjust index
  if (n !== undefined) slideIndex += n;

  displaySlide();
}

function displaySlide() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dots span");

  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;

  slides.forEach(slide => slide.style.display = "none");
  dots.forEach(dot => dot.classList.remove("active"));

  slides[slideIndex].style.display = "block";
  dots[slideIndex].classList.add("active");
}

// Auto play every 4s
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    changeSlide(1);
  }, 4000);
}

function changeSlide(n) {
  clearInterval(autoSlideInterval);
  showSlides(n);
  startAutoSlide(); // restart autoplay
}

document.addEventListener("DOMContentLoaded", () => {
  showSlides();
  startAutoSlide();
});
