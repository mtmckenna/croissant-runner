import Croissant from './croissant';

export default class {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.tabIndex = '1';
    this.canvas.style.backgroundColor = '#66ccff';
    this.canvas.width  = 320;
    this.canvas.height = 240;

    this.context = this.canvas.getContext('2d');
    this.croissant = new Croissant(this.context, 1, {x: 50, y: 200});
  }

  update() {
    this.croissant.updatePosition();
  }

  drawGround() {
    this.context.fillStyle = '#808000';
    this.context.fillRect(0, 220, 320, 20);
  }

  draw() {
    this.context.clearRect(0, 0, 320, 240);

    this.drawGround();
    this.croissant.draw();
  }
}
