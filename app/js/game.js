import Croissant from './croissant';
import SceneryFriend from './scenery-friend';

export default class {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.configureCanvas({ width: 320, height: 240 });

    this.croissant = new Croissant(this.context);
    this.sceneryFriend = new SceneryFriend(this.context);

    this.drawCounter = 0;
    this.score = 0;
  }

  configureCanvas(dimensions) {
    this.canvas.style.backgroundColor = '#66ccff';
    this.canvas.width  = dimensions.width;
    this.canvas.height = dimensions.height;
  }

  update() {
    this.sceneryFriend.update();
    this.croissant.update();
  }

  drawGround() {
    this.context.fillStyle = '#4f8f00';
    this.context.fillRect(0, 220, 320, 20);
  }

  drawScore() {
    this.context.font = "15px 'Lucida Console', Monaco, monospace";
    this.context.fillText(`${this.score} Pizzas`, 10, 25);
  }

  draw() {
    this.drawCounter += 1;
    this.context.clearRect(0, 0, 320, 240);

    this.drawGround();
    this.drawScore();
    this.sceneryFriend.draw();
    this.croissant.draw();
  }
}
