"use strict";

//Timer countdown
var counter = 0;
const timeLeft = 30;
const timer = document.querySelector(".timer");

function countdown() {
  timer.innerText = timeLeft;

  function timeIt() {
    counter++;
    timer.innerText = timeLeft - counter;
    if (counter === timeLeft) {
      clearInterval(interval);
      counter = 0;
    }
  }
  const interval = setInterval(timeIt, 1000);
}

//Removes start button
function removestart(e) {
  document.querySelector("#start").remove();
}

document.querySelector("#start").addEventListener("click", countdown);
document.querySelector("#start").addEventListener("click", removestart);
document.querySelector("#start").addEventListener("click", startTraffic);

//Traffic light interval time
const lights = document.querySelectorAll(".light");
let activeLight = 2;

function changeLight() {
  lights[activeLight].className = "light";
  activeLight--;

  if (activeLight < 0) {
    activeLight = 2;
  }

  const currentLight = lights[activeLight];

  currentLight.classList.add(currentLight.getAttribute("color"));
}

function startTraffic() {
  setInterval(() => {
    changeLight();
  }, 1000);
}

const character = document.getElementsByClassName("character");

// window.addEventListener("keyup", (event) => {
//   switch (event.key) {
//     case "ArrowUp":
//       character.style.marginTop =
//         parseInt(character.style.marginTop) - 10 + "px";
//       break;
//     case "ArrowDown":
//       character.style.MarginTop =
//         parseInt(character.style.marginTop) + 10 + "px";
//       break;
//   }
// });
