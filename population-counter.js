let startPopulation = 117734094;
let startDate = new Date(2025, 0, 1);

let birthsPerSec = 7725 / 86400;
let deathsPerSec = 2158 / 86400;
let migrationPerSec = -468 / 86400;

function updateStats() {
  let now = new Date();
  let secondsElapsed = Math.floor((now - startDate) / 1000);

  let birthsYear = Math.floor(birthsPerSec * secondsElapsed);
  let deathsYear = Math.floor(deathsPerSec * secondsElapsed);
  let migrationYear = Math.floor(migrationPerSec * secondsElapsed);
  let currentPop = startPopulation + birthsYear - deathsYear + migrationYear;

  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let secondsToday = Math.floor((now - today) / 1000);

  let birthsToday = Math.floor(birthsPerSec * secondsToday);
  let deathsToday = Math.floor(deathsPerSec * secondsToday);
  let migrationToday = Math.floor(migrationPerSec * secondsToday);

  // Update HTML
  document.getElementById("population").textContent = currentPop.toLocaleString();
  document.getElementById("birthsYear").textContent = birthsYear.toLocaleString();
  document.getElementById("deathsYear").textContent = deathsYear.toLocaleString();
  document.getElementById("migrationYear").textContent = migrationYear.toLocaleString();
  document.getElementById("birthsToday").textContent = birthsToday.toLocaleString();
  document.getElementById("deathsToday").textContent = deathsToday.toLocaleString();
  document.getElementById("migrationToday").textContent = migrationToday.toLocaleString();
}

updateStats(); // Initial
setInterval(updateStats, 1000); // Update every second