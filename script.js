// 🌙 Theme Toggle
const themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = function () {
  document.body.classList.toggle("dark");
};


// 🔝 Back to Top
const topBtn = document.getElementById("topBtn");

window.onscroll = function () {
  if (window.scrollY > 150) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};

topBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};


// ⏰ Clock
function updateClock() {
  const now = new Date();
  document.getElementById("clock").innerText =
    now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
// =========================================================
// Contact Us, About Us, Teachers Evaluation
// =========================================================

// 1. About Us
const teachersList = document.getElementById('teachersList');
const sortSelect = document.getElementById('sortTeachers');

function setupAboutUs() {
  if (!teachersList) return;


  let cards = Array.from(teachersList.getElementsByClassName('teacher-card'));
  cards.sort(() => Math.random() - 0.5);
  cards.forEach(card => teachersList.appendChild(card));


  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      let sortedCards = Array.from(teachersList.getElementsByClassName('teacher-card'));
      const criteria = this.value;

      sortedCards.sort((a, b) => {
        if (criteria === 'name-asc') return a.dataset.name.localeCompare(b.dataset.name);
        if (criteria === 'name-desc') return b.dataset.name.localeCompare(a.dataset.name);
        if (criteria === 'exp-asc') return parseInt(a.dataset.exp) - parseInt(b.dataset.exp);
        if (criteria === 'exp-desc') return parseInt(b.dataset.exp) - parseInt(a.dataset.exp);
      });
      sortedCards.forEach(card => teachersList.appendChild(card));
    });
  }
}

// 2. Contact Us 
function setupContactUs() {
  const contactForm = document.querySelector('.contact-form-box form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!fullName || !email) {
      alert("Please fill in all fields.");
      return;
    }


    if (!isNaN(fullName[0])) {
      alert("Name cannot start with numbers.");
      return;
    }
    if (fullName.split(' ').length < 2) {
      alert("Please enter FirstName and LastName.");
      return;
    }


    if (!emailRegex.test(email)) {
      alert("Please enter a valid email!");
      return;
    }

    alert(`Confirmation: Thank you ${fullName}, your message has been sent.`);
    contactForm.reset();
  });
}

//3. Teachers Evaluation
function setupEvaluation() {
  const evalForm = document.querySelector('.eval-box-body form');
  if (!evalForm) return;

  evalForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const teacher = document.getElementById('teacherSelect');
    const rating = document.querySelector('input[name="rating"]:checked');
    const feedback = document.getElementById('feedback');


    [teacher, feedback].forEach(el => el.style.border = "");


    if (!teacher.value || !rating || !feedback.value.trim()) {

      if (!teacher.value) teacher.style.border = "2px solid red";
      if (!feedback.value.trim()) feedback.style.border = "2px solid red";

      alert("Missing fields: Please select a teacher, add a rating, and feedback.");
      return;
    }


    if (parseInt(rating.value) >= 4) {
      alert("Thank you for your good rating!");
    } else {
      alert("We apologize for not meeting your expectations.");
    }


    window.location.href = "dashboard.html";
  });
}


window.addEventListener('DOMContentLoaded', () => {
  setupAboutUs();
  setupContactUs();
  setupEvaluation();
});


// ===== More Lessons Button =====
const moreBtn = document.getElementById("moreBtn");

if (moreBtn) {
  moreBtn.onclick = function () {
    const extraLessons = document.querySelectorAll(".extra-lesson");

    for (let i = 0; i < extraLessons.length; i++) {
      extraLessons[i].style.display = "block";
    }

    moreBtn.style.display = "none";
  };
}


// حسابات الريزولت بيج

function calculateScore() {
  let score = 0;

  let q1 = document.querySelector('input[name="q1"]:checked');
  if (!q1) {
    alert("Please answer all questions!");
    return false;
  }
  if (q1.value === "b") score++;

  let q2 = document.querySelector('input[name="q2"]:checked');
  if (!q2) {
    alert("Please answer all questions!");
    return false;
  }
  if (q2.value === "c") score++;

  let q3 = document.querySelector('input[name="q3"]:checked');
  if (!q3) {
    alert("Please answer all questions!");
    return false;
  }
  if (q3.value === "b") score++;

  let q4 = document.querySelector('input[name="q4"]:checked');
  if (!q4) {
    alert("Please answer all questions!");
    return false;
  }
  if (q4.value === "c") score++;

  let q5 = document.querySelector('input[name="q5"]:checked');
  if (!q5) {
    alert("Please answer all questions!");
    return false;
  }
  if (q5.value === "b") score++;

  localStorage.setItem("score", score);

  window.location.href = "result.html";

  return false;
}


