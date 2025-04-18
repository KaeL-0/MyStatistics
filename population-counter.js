let startPopulation = 117734094;
let startDate = new Date(2025, 0, 1);

let birthsPerSec = 7725 / 86400;
let deathsPerSec = 2158 / 86400;
let migrationPerSec = -468 / 86400;

let previousPopulation = startPopulation;

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

  updateValue("population", currentPop, currentPop < previousPopulation);
  updateValue("birthsYear", birthsYear, false);
  updateValue("deathsYear", deathsYear, true);  
  updateValue("migrationYear", migrationYear, migrationYear < 0);
  updateValue("birthsToday", birthsToday, false);
  updateValue("deathsToday", deathsToday, true);
  updateValue("migrationToday", migrationToday, migrationToday < 0);
  
  previousPopulation = currentPop;
}

function updateValue(id, newVal, isNegative) {
  let elem = document.getElementById(id);
  let currentVal = elem.textContent.replace(/,/g, '');
  
  if (parseInt(currentVal) !== newVal || elem.textContent === "loading data....") {
    elem.textContent = newVal.toLocaleString();
    
    let parent;
    if(window.innerWidth <= 768){
      parent = elem.closest('span');
    } else {
      parent = elem.closest('pre');
    }
    
    if (parent) {
      parent.classList.remove('updated');
      parent.classList.remove('updated-negative');
      
      void parent.offsetWidth;
      
      if (isNegative) {
        parent.classList.add('updated-negative');
      } else {
        parent.classList.add('updated');
      }
    }
  }
}

updateStats(); 
setInterval(updateStats, 1000); 