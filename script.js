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
