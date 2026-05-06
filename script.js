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
