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
  updateValue("population", currentPop);
  updateValue("birthsYear", birthsYear);
  updateValue("deathsYear", deathsYear);
  updateValue("migrationYear", migrationYear);
  updateValue("birthsToday", birthsToday);
  updateValue("deathsToday", deathsToday);
  updateValue("migrationToday", migrationToday);
}

function updateValue(id, newVal) {
  let el = document.getElementById(id);
  let currentVal = el.textContent.replace(/,/g, '');
  if (parseInt(currentVal) !== newVal) {
    el.textContent = newVal.toLocaleString();
    let parent;
    if(window.innerWidth <= 768){
      parent = el.closest('span');
    } else {
      parent = el.closest('pre');
    }
    
    if (parent) {
      parent.classList.remove('updated'); // restart animation
      void parent.offsetWidth; // force reflow
      parent.classList.add('updated');
    }
  }
}

updateStats(); // Initial
setInterval(updateStats, 1000); // Update every second