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

  for (let i = 1; i <= Object.keys(correctAnswers).length; i++) {
    let q = document.querySelector(`input[name="q${i}"]:checked`);

    if (!q) {
      alert("Please answer all questions!");
      return false;
    }

    if (q.value === correctAnswers[`q${i}`]) {
      score++;
    }
  }
  
let total = Object.keys(correctAnswers).length;
localStorage.setItem("totalQuestions", total);
  
  localStorage.setItem("score", score);
  window.location.href = "result.html";

  return false;
}
// ===== Dashboard =====
var lessons = [
    { key: "lesson1_score", name: "Lesson 1: Network Security",         teacher: "Dr. Sarah Al-Rashid" },
    { key: "lesson2_score", name: "Lesson 2: Malware Analysis",         teacher: "Prof. Khalid Al-Otaibi" },
    { key: "lesson3_score", name: "Lesson 3: Cryptography",             teacher: "Dr. Reem Al-Harbi" },
    { key: "lesson4_score", name: "Lesson 4: Web Application Security", teacher: "Eng. Nada Al-Qahtani" },
    { key: "lesson5_score", name: "Lesson 5: Ethical Hacking",          teacher: "Dr. Faisal Al-Dossari" },
    { key: "lesson6_score", name: "Lesson 6: Digital Forensics",        teacher: "Prof. Hanan Al-Shehri" }
];

function loadScores() {
    var tbody = document.getElementById("scoresBody");
    var section = document.getElementById("scoresSection");

    // If not on dashboard page, stop
    if (!tbody || !section) return;

    var hasScores = false;

    // Loop through each lesson and check localStorage
    for (var i = 0; i < lessons.length; i++) {
        var score = localStorage.getItem(lessons[i].key);

        // Only add a row if a score exists
        if (score != null) {
            hasScores = true;

            // Create a new table row
            var row = document.createElement("tr");

            // Determine pass or fail
            var scoreNum = Number.parseInt(score);
            var status = "";
            var statusClass = "";

            if (scoreNum >= 60) {
                status = "✓ Pass";
                statusClass = "score-pass";
            } else {
                status = "✗ Fail";
                statusClass = "score-fail";
            }

            // Fill the row with data
            row.innerHTML = "<td>" + lessons[i].name + "</td>" +
                            "<td>" + lessons[i].teacher + "</td>" +
                            "<td class='" + statusClass + "'>" + score + "%</td>" +
                            "<td class='" + statusClass + "'>" + status + "</td>";

            // Add row to table
            tbody.appendChild(row);
        }
    }

    // Hide the table section if no scores found
    if (hasScores == false) {
        section.style.display = "none";
    }
}

loadScores();

// ===== My Notes =====

// Load notes array from localStorage
function getNotes() {
    var data = localStorage.getItem("notes");
    if (data != null) {
        return JSON.parse(data);
    }
    return [];
}

// Save notes array to localStorage
function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Display all notes on the page
function displayNotes() {
    var notesList = document.getElementById("notesList");
    if (!notesList) return;

    // Clear current list
    notesList.innerHTML = "";

    var notes = getNotes();

    // Loop through notes and create HTML for each
    for (var i = 0; i < notes.length; i++) {
        var note = notes[i];

        // Set background color based on priority
        var bgColor = "";
        if (note.priority == "1") {
            bgColor = "#ffcccc"; // Red - High
        } else if (note.priority == "2") {
            bgColor = "#fff5cc"; // Yellow - Medium
        } else if (note.priority == "3") {
            bgColor = "#ccffcc"; // Green - Low
        }

        // Priority label
        var priorityLabel = "";
        if (note.priority == "1") priorityLabel = "1 (High)";
        if (note.priority == "2") priorityLabel = "2 (Medium)";
        if (note.priority == "3") priorityLabel = "3 (Low)";

        // Create note item div
        var div = document.createElement("div");
        div.className = "note-item";
        div.style.backgroundColor = bgColor;

        div.innerHTML = "<input type='checkbox' name='deleteNote' value='" + i + "' />" +
                        "<img src='images/note_icon.png' alt='Note' class='note-thumb' />" +
                        "<div class='note-info'>" +
                            "<div class='note-text'>" + note.text + "</div>" +
                            "<div class='note-date'>" + note.date + "</div>" +
                            "<div class='note-priority'>Priority: " + priorityLabel + "</div>" +
                        "</div>";

        notesList.appendChild(div);
    }
}

// Validate and add note to the page only (not saved to localStorage)
function addNote() {
    var text = document.getElementById("noteText").value.trim();
    var priority = document.getElementById("notePriority").value;

    // Check if note text is empty or less than 30 characters
    if (text.length < 30) {
        alert("Note description must be at least 30 characters.");
        return;
    }

    // Check if priority is selected
    if (priority == "") {
        alert("Please select a priority.");
        return;
    }

    // Get current notes and add new one (not saved to localStorage)
    var notes = getNotes();
    var today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    notes.push({ text: text, priority: priority, date: today });

    // Display updated list without saving
    saveNotes(notes);
    displayNotes();

    // Clear the form
    document.getElementById("noteText").value = "";
    document.getElementById("notePriority").value = "";
}

// Validate, save note to localStorage, and clear form
function saveNote() {
    var text = document.getElementById("noteText").value.trim();
    var priority = document.getElementById("notePriority").value;

    // Check if note text is empty or less than 30 characters
    if (text.length < 30) {
        alert("Note description must be at least 30 characters.");
        return;
    }

    // Check if priority is selected
    if (priority == "") {
        alert("Please select a priority.");
        return;
    }

    // Get current notes and add new one
    var notes = getNotes();
    var today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    notes.push({ text: text, priority: priority, date: today });

    // Save to localStorage
    saveNotes(notes);

    // Refresh the displayed list
    displayNotes();

    // Clear the form
    document.getElementById("noteText").value = "";
    document.getElementById("notePriority").value = "";
}

// Delete selected notes
function deleteSelected() {
    var checkboxes = document.querySelectorAll("input[name='deleteNote']:checked");

    // Alert if no note is selected
    if (checkboxes.length == 0) {
        alert("Please select at least one note.");
        return;
    }

    // Ask for confirmation before deleting
    var confirmed = confirm("Are you sure you want to delete the selected notes?");
    if (!confirmed) return;

    // Collect indexes to delete
    var notes = getNotes();
    var toDelete = [];
    for (var i = 0; i < checkboxes.length; i++) {
        toDelete.push(Number.parseInt(checkboxes[i].value));
    }

    // Build new array without deleted notes
    var newNotes = [];
    for (var i = 0; i < notes.length; i++) {
        if (toDelete.indexOf(i) == -1) {
            newNotes.push(notes[i]);
        }
    }

    // Save updated notes and refresh display
    saveNotes(newNotes);
    displayNotes();
}

// Load notes when page opens
displayNotes();
