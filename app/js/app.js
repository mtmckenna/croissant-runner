require('../css/app.css');
import Game from './game';

const canvas = document.getElementById('game');
const game = new Game(canvas);
let animReq;

function gameLoop() {
  animReq = window.requestAnimationFrame(gameLoop);
  game.update();
  game.draw();
}

function cancelAnimationRequest(e) {
  if (e.keyCode === 67) {
    window.cancelAnimationFrame(animReq);
  }
}

function resizeCanvas() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  let canvasClass = 'tall-canvas';

  if ((width / height) > (game.width / game.height)) {
    canvasClass = 'wide-canvas';
  }

  canvas.className = canvasClass;
}

window.addEventListener('keydown', cancelAnimationRequest, false);
window.addEventListener('resize', resizeCanvas, false);

resizeCanvas();
gameLoop();
