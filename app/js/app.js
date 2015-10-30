require("../css/app.css");
import Game from './game';

var canvas = document.createElement('canvas');
var game = new Game(canvas);

document.body.appendChild(canvas)

function main() {
  window.requestAnimationFrame(main);
  game.update();
  game.draw();
}

main();
