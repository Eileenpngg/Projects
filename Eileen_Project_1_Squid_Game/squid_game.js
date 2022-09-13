"use strict";

const height = 500;
const width = 500;

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Create character
//x:, y: current position x-axis,y-axis; frameX, frameY: frame to be cropped;
let player = {
  x: 400,
  y: 200,
  width: 53,
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
    26,
    22
  );
}

let keyPressed = false;
//Character moves based on keys pressed
window.addEventListener("keydown", function (e) {
  ctx.clearRect(
    player.x,
    player.y,
    player.x + player.width,
    player.y + player.height
  );

  if (e.key === "ArrowUp" && player.y > 100) {
    player.y -= player.speed;
    player.frameY = 3;
    keyPressed = true;
  } else if (e.key === "ArrowDown") {
    player.y += player.speed;
    player.frameY = 0;
    keyPressed = true;
  } else if (e.key === "ArrowLeft") {
    player.x -= player.speed;
    player.frameY = 1;
    keyPressed = true;
  } else if (e.key === "ArrowRight") {
    player.x += player.speed;
    player.frameY = 2;
    keyPressed = true;
  }
  animate();
  handlePlayerFrame();
  gameOver();
});

function handlePlayerFrame() {
  if (player.frameX < 3) player.frameX++;
  else player.frameX = 0;
}

//Timer countdown
let counter = 0;
let timeLeft = 30;
const timer = document.querySelector(".timer");

function countdown() {
  timer.innerText = timeLeft;

  function timeIt() {
    counter++;
    timer.innerText = timeLeft - counter;
    if (counter === timeLeft) {
      clearInterval(interval);
      counter = 0;
      timeLeft = 0;
    }
  }
  const interval = setInterval(timeIt, 2000);
}

//Traffic light change
const lights = document.querySelectorAll(".light");
let activeLight = 0;

function changeLight() {
  lights[activeLight].className = "light";
  activeLight--;
  console.log(activeLight);

  if (activeLight < 0) {
    activeLight = 2;
  }

  const currentLight = lights[activeLight];

  currentLight.classList.add(currentLight.getAttribute("color"));
}
// Interval between light change
function startTraffic() {
  setInterval(() => {
    changeLight();
  }, 1000);
}

//Removes start button
function removestart(e) {
  document.querySelector("#start").remove();
}

//Display Win or Game over
function gameOver() {
  let gameOver = document.getElementById("gameOver");
  let restart = document.getElementById("restart");
  if (player.y === 100 && timeLeft !== 0) {
    const win = document.getElementById("win");
    win.style.display = "block";
  } else if (
    (timeLeft === 0 && player.y !== 100) ||
    (activeLight === 0 && keyPressed === true && player.y !== 100)
  ) {
    gameOver.style.display = "block";
    restart.style.display = "block";
  }
}

//Refreshes page
function refreshPage() {
  window.location.reload();
}

//Start game
document.querySelector("#start").addEventListener("click", countdown);
document.querySelector("#start").addEventListener("click", removestart);
document.querySelector("#start").addEventListener("click", startTraffic);
document.querySelector("#start").addEventListener("click", animate);
document.querySelector("#restart").addEventListener("click", refreshPage);
