const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.style.width = window.innerWidth;
canvas.style.height = window.innerHeight;

const rope = document.getElementById("rope");

const character1 = new Image();
character1.src =
  "https://rpgmaker.net/media/content/users/59811/locker/squid_game_BB.png";

let character1var = {
  x: 80,
  y: 45,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 2,
  speed: 5,
  moving: false,
};

function drawSprite(Img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(Img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate() {
  drawSprite(
    character1,
    character1var.width * character1var.frameX,
    character1var.height * character1var.frameY,
    character1var.width,
    character1var.height,
    character1var.x,
    character1var.y,
    20,
    15
  );
}

//Gets cssproperty
function getCssProperty(element, property) {
  return window.getComputedStyle(element, null).getPropertyValue(property);
}

function handlePlayerFrame() {
  if (character1var.frameX < 2) character1var.frameX++;
  else character1var.frameX = 0;
}

//Character and rope moves when space is pressed
window.addEventListener("keydown", function (e) {
  ctx.clearRect(
    character1var.x,
    character1var.y,
    character1var.x + character1var.width,
    character1var.y + character1var.height
  );
  if (e.key === " ") {
    character1var.frameY = 2;
    character1var.x -= 10;

    let ropeLeft = getCssProperty(rope, "left");
    let newRope = Number(ropeLeft.slice(0, -2));
    newRope = newRope - 10;
    rope.style.left = newRope + "px";
  }
  animate();
  handlePlayerFrame();
  gameOver();
});

//Elements that move when pulling starts
function move() {
  //Moves rope to the right
  let ropeLeft = getCssProperty(rope, "left");
  let newRope = Number(ropeLeft.slice(0, -2));
  newRope = newRope + 20;
  rope.style.left = newRope + "px";
  console.log(ropeLeft);
  //Moves character together with the rope
  ctx.clearRect(
    character1var.x,
    character1var.y,
    character1var.x + character1var.width,
    character1var.y + character1var.height
  );
  character1var.x += 10;
  animate();
}
function startPull() {
  setInterval(() => {
    move();
  }, 1000);
}

//Removes start button
function removestart(e) {
  document.querySelector("#start").remove();
}

//Timer countdown
let counter = 0;
let timeLeft = 4;
const timer = document.querySelector("#timer");

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

//When to display YOU WIN/GAME OVER

function gameOver() {
  const gameOver = document.getElementById("gameOver");
  const win = document.getElementById("win");
  let ropeLeft = getCssProperty(rope, "left");
  ropeLeft = Number(ropeLeft.slice(0, -2));
  if (timeLeft === 0 && ropeLeft > 4 && win.style.display !== "block") {
    gameOver.style.display = "block";
  } else if (
    timeLeft === 0 &&
    ropeLeft < 4 &&
    gameOver.style.display !== "block"
  ) {
    win.style.display = "block";
  }
}

document.querySelector("#start").addEventListener("click", countdown);
document.querySelector("#start").addEventListener("click", animate);
document.querySelector("#start").addEventListener("click", startPull);
document.querySelector("#start").addEventListener("click", removestart);
