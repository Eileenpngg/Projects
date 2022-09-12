"use strict";

const height = 500;
const width = 500;

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

//Create character
//x:, y: current position x-axis,y-axis; frameX, frameY: frame to be cropped;
let player = {
  x: 400,
  y: 100,
  width: 51.25,
  height: 77,
  frameX: 0,
  frameY: 0,
  speed: 5,
  moving: false,
};

const character = new Image();
character.src =
  "https://preview.redd.it/dbtt91sukiy71.png?width=205&format=png&auto=webp&s=b5306ee592e16a942ca2db7ed94e19180a1949cc";

function drawSprite(Img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(Img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate() {
  drawSprite(
    character,
    player.width * player.frameX,
    player.height * player.frameY,
    player.width,
    player.height,
    player.x,
    player.y,
    player.height,
    player.width
  );
}

//Character moves based on keys pressed
window.addEventListener("keydown", function (e) {
  ctx.clearRect(
    player.x,
    player.y,
    player.x + player.width,
    player.y + player.height
  );

  if (e.key === "ArrowUp" && player.y > 40) {
    player.y -= player.speed;
    player.frameY = 3;
  } else if (e.key === "ArrowDown" && player.x > 0) {
    player.y += player.speed;
    player.frameY = 0;
  } else if (e.key === "ArrowLeft") {
    player.x -= player.speed;
    player.frameY = 1;
  } else if (e.key === "ArrowRight") {
    player.x += player.speed;
    player.frameY = 2;
  }
  animate();
});

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
document.querySelector("#start").addEventListener("click", animate);

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
