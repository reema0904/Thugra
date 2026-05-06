// =============================================
// Theme Toggle
// =============================================
var themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = function () {
    document.body.classList.toggle("dark");
};

// =============================================
// Back to Top
// =============================================
var topBtn = document.getElementById("topBtn");

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

// =============================================
// Clock
// =============================================
function updateClock() {
    var clockEl = document.getElementById("clock");
    if (!clockEl) return;
    var now = new Date();
    clockEl.innerText = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);

// =============================================
// About Us
// =============================================
function setupAboutUs() {
    var teachersList = document.getElementById("teachersList");
    var sortSelect = document.getElementById("sortTeachers");
    if (!teachersList) return;

    // Display teachers in random order
    var cards = Array.from(teachersList.getElementsByClassName("teacher-card"));
    cards.sort(function () { return Math.random() - 0.5; });
    cards.forEach(function (card) { teachersList.appendChild(card); });

    // Sort teachers when dropdown changes
    if (sortSelect) {
        sortSelect.addEventListener("change", function () {
            var sortedCards = Array.from(teachersList.getElementsByClassName("teacher-card"));
            var criteria = this.value;

            sortedCards.sort(function (a, b) {
                if (criteria === "name-asc") return a.dataset.name.localeCompare(b.dataset.name);
                if (criteria === "name-desc") return b.dataset.name.localeCompare(a.dataset.name);
                if (criteria === "exp-asc") return parseInt(a.dataset.exp) - parseInt(b.dataset.exp);
                if (criteria === "exp-desc") return parseInt(b.dataset.exp) - parseInt(a.dataset.exp);
            });

            sortedCards.forEach(function (card) { teachersList.appendChild(card); });
        });
    }
}

// =============================================
// Contact Us
// =============================================
function setupContactUs() {
    var contactForm = document.querySelector(".contact-form-box form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        var fullName = document.getElementById("fullName").value.trim();
        var email = document.getElementById("email").value.trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check empty fields
        if (!fullName || !email) {
            alert("Please fill in all fields.");
            return;
        }

        // Name cannot start with a number
        if (!isNaN(fullName[0])) {
            alert("Name cannot start with numbers.");
            return;
        }

        // Name must be full name
        if (fullName.split(" ").length < 2) {
            alert("Please enter your First Name and Last Name.");
            return;
        }

        // Email must be valid
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        alert("Confirmation: Thank you " + fullName + ", your message has been sent.");
        contactForm.reset();
    });
}

// =============================================
// Teachers Evaluation
// =============================================
function setupEvaluation() {
    var evalForm = document.querySelector(".eval-box-body form");
    if (!evalForm) return;

    evalForm.addEventListener("submit", function (e) {
        e.preventDefault();

        var teacher = document.getElementById("teacherSelect");
        var rating = document.querySelector("input[name='rating']:checked");
        var feedback = document.getElementById("feedback");

        // Reset borders
        teacher.style.border = "";
        feedback.style.border = "";

        // Check empty fields
        if (!teacher.value || !rating || !feedback.value.trim()) {
            if (!teacher.value) teacher.style.border = "2px solid red";
            if (!feedback.value.trim()) feedback.style.border = "2px solid red";
            alert("Please select a teacher, add a rating, and write feedback.");
            return;
        }

        // Show message based on rating
        if (parseInt(rating.value) >= 4) {
            alert("Thank you for your good rating!");
        } else {
            alert("We apologize for not meeting your expectations.");
        }

        // Go to dashboard
        window.location.href = "dashboard.html";
    });
}

// =============================================
// More Lessons Button
// =============================================
var moreBtn = document.getElementById("moreBtn");

if (moreBtn) {
    moreBtn.onclick = function () {
        var extraLessons = document.querySelectorAll(".extra-lesson");
        for (var i = 0; i < extraLessons.length; i++) {
            extraLessons[i].style.display = "block";
        }
        moreBtn.style.display = "none";
    };
}

// =============================================
// Quiz Score Calculation
// =============================================
function calculateScore() {
    var score = 0;
    var total = Object.keys(correctAnswers).length;

    for (var i = 1; i <= total; i++) {
        var q = document.querySelector("input[name='q" + i + "']:checked");

        // Check all questions are answered
        if (!q) {
            alert("Please answer all questions!");
            return false;
        }

        // Check if answer is correct
        if (q.value === correctAnswers["q" + i]) {
            score++;
        }
    }

    // Calculate percentage
    var percentage = Math.round((score / total) * 100);

    // Save score and total to localStorage
    localStorage.setItem("score", score);
    localStorage.setItem("totalQuestions", total);

    // Save current quiz page name for result page
    localStorage.setItem("lastQuiz", window.location.pathname);

    // Get lesson key from page URL
    var page = window.location.pathname;
    var lessonKey = "lesson1_score";

    if (page.indexOf("lesson2") !== -1) lessonKey = "lesson2_score";
    if (page.indexOf("lesson3") !== -1) lessonKey = "lesson3_score";
    if (page.indexOf("lesson4") !== -1) lessonKey = "lesson4_score";
    if (page.indexOf("lesson5") !== -1) lessonKey = "lesson5_score";
    if (page.indexOf("lesson6") !== -1) lessonKey = "lesson6_score";

    // Save best score for this lesson
    var prevBest = localStorage.getItem(lessonKey);
    if (prevBest === null || percentage > Number.parseInt(prevBest)) {
        localStorage.setItem(lessonKey, percentage);
    }

    // Go to result page
    window.location.href = "result.html";
    return false;
}

// =============================================
// Dashboard - Load Scores
// =============================================
var lessons = [
    { key: "lesson1_score", name: "Lesson 1: Network Security",          teacher: "Dr. Sarah Al-Rashid" },
    { key: "lesson2_score", name: "Lesson 2: Malware Analysis",          teacher: "Prof. Khalid Al-Otaibi" },
    { key: "lesson3_score", name: "Lesson 3: Cryptography",              teacher: "Dr. Reem Al-Harbi" },
    { key: "lesson4_score", name: "Lesson 4: Web Application Security",  teacher: "Eng. Nada Al-Qahtani" },
    { key: "lesson5_score", name: "Lesson 5: Ethical Hacking",           teacher: "Dr. Faisal Al-Dossari" },
    { key: "lesson6_score", name: "Lesson 6: Digital Forensics",         teacher: "Prof. Hanan Al-Shehri" }
];

function loadScores() {
    var tbody = document.getElementById("scoresBody");
    var section = document.getElementById("scoresSection");
    if (!tbody || !section) return;

    var hasScores = false;

    for (var i = 0; i < lessons.length; i++) {
        var score = localStorage.getItem(lessons[i].key);

        if (score != null) {
            hasScores = true;

            var row = document.createElement("tr");
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

            row.innerHTML = "<td>" + lessons[i].name + "</td>" +
                            "<td>" + lessons[i].teacher + "</td>" +
                            "<td class='" + statusClass + "'>" + score + "%</td>" +
                            "<td class='" + statusClass + "'>" + status + "</td>";

            tbody.appendChild(row);
        }
    }

    // Hide table if no scores
    if (hasScores == false) {
        section.style.display = "none";
    }
}

// =============================================
// My Notes
// =============================================

// Get notes from localStorage
function getNotes() {
    var data = localStorage.getItem("notes");
    if (data != null) {
        return JSON.parse(data);
    }
    return [];
}

// Save notes to localStorage
function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Display all notes on the page
function displayNotes() {
    var notesList = document.getElementById("notesList");
    if (!notesList) return;

    notesList.innerHTML = "";
    var notes = getNotes();

    for (var i = 0; i < notes.length; i++) {
        var note = notes[i];

        // Background color based on priority
        var bgColor = "";
        if (note.priority == "1") bgColor = "#ffcccc";
        if (note.priority == "2") bgColor = "#fff5cc";
        if (note.priority == "3") bgColor = "#ccffcc";

        // Priority label
        var priorityLabel = "";
        if (note.priority == "1") priorityLabel = "1 (High)";
        if (note.priority == "2") priorityLabel = "2 (Medium)";
        if (note.priority == "3") priorityLabel = "3 (Low)";

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

// Add note (display only)
function addNote() {
    var text = document.getElementById("noteText").value.trim();
    var priority = document.getElementById("notePriority").value;

    if (text.length < 30) {
        alert("Note description must be at least 30 characters.");
        return;
    }

    if (priority == "") {
        alert("Please select a priority.");
        return;
    }

    var notes = getNotes();
    var today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    notes.push({ text: text, priority: priority, date: today });

    saveNotes(notes);
    displayNotes();

    document.getElementById("noteText").value = "";
    document.getElementById("notePriority").value = "";
}

// Save note to localStorage
function saveNote() {
    var text = document.getElementById("noteText").value.trim();
    var priority = document.getElementById("notePriority").value;

    if (text.length < 30) {
        alert("Note description must be at least 30 characters.");
        return;
    }

    if (priority == "") {
        alert("Please select a priority.");
        return;
    }

    var notes = getNotes();
    var today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    notes.push({ text: text, priority: priority, date: today });

    saveNotes(notes);
    displayNotes();

    document.getElementById("noteText").value = "";
    document.getElementById("notePriority").value = "";
}

// Delete selected notes
function deleteSelected() {
    var checkboxes = document.querySelectorAll("input[name='deleteNote']:checked");

    if (checkboxes.length == 0) {
        alert("Please select at least one note.");
        return;
    }

    var confirmed = confirm("Are you sure you want to delete the selected notes?");
    if (!confirmed) return;

    var notes = getNotes();
    var toDelete = [];

    for (var i = 0; i < checkboxes.length; i++) {
        toDelete.push(Number.parseInt(checkboxes[i].value));
    }

    var newNotes = [];
    for (var i = 0; i < notes.length; i++) {
        if (toDelete.indexOf(i) == -1) {
            newNotes.push(notes[i]);
        }
    }

    saveNotes(newNotes);
    displayNotes();
}

// =============================================
// Run on page load
// =============================================
window.addEventListener("DOMContentLoaded", function () {
    updateClock();
    setupAboutUs();
    setupContactUs();
    setupEvaluation();
    loadScores();
    displayNotes();
});
