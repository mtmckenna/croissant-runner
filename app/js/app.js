require("../css/app.css");

var croissant = new Image();
croissant.src = require('../images/croissant.png');
croissant.width = 100;
croissant.height = 100;
croissant.alt = 'croissant';
croissant.currentFrame = 0;
croissant.jumpVelocity = -20;
croissant.vel = { y: 0 }
croissant.pos = { x: 50, y: 200 };

var counter = 0;
var gravity = 1;
var groundLevel = 200.0;

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

canvas.tabIndex = '1';
canvas.style.backgroundColor = '#66ccff';
canvas.width  = 320;
canvas.height = 240;

document.body.appendChild(canvas)

window.addEventListener('keydown', jump, false);
window.addEventListener('touchstart', jump, false);

function jump() {
  if (croissant.pos.y < groundLevel) { return; }
  croissant.vel.y = croissant.jumpVelocity;
}

function main() {
  window.requestAnimationFrame(main);
  counter += 1;

  ctx.clearRect(0, 0, 320, 240);

  ctx.fillStyle = '#808000';
  ctx.fillRect(0, 220, 320, 20);

  croissant.vel.y = croissant.vel.y + gravity;
  croissant.pos.y = croissant.pos.y + croissant.vel.y;

  if (croissant.pos.y > groundLevel) {
    croissant.vel.y = 0.0;
    croissant.pos.y = groundLevel;
  };

  ctx.drawImage(croissant,
                croissant.currentFrame * 31, 0,
                29, 32,
                croissant.pos.x, croissant.pos.y,
                29, 32);

  if (!!(counter % 30)) { return; }

  croissant.currentFrame = (croissant.currentFrame + 1) % 2;
}

main();
