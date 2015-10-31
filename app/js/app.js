require("../css/app.css");
import Game from './game';

var canvas = document.createElement('canvas');
var game = new Game(canvas);
var animReq;

document.body.appendChild(canvas)

function main() {
  animReq = window.requestAnimationFrame(main);
  game.update();
  game.draw();
}

function cancelAnimationRequest(e) {
  if (e.keyCode === 67) {
    window.cancelAnimationFrame(animReq);
  }
}

window.addEventListener('keydown', cancelAnimationRequest, false);

main();
