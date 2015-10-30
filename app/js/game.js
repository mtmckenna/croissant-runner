import Croissant from './croissant';
import Flower from './flower';
import Bird from './bird';

export default class {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.tabIndex = '1';
    this.canvas.style.backgroundColor = '#66ccff';
    this.canvas.width  = 320;
    this.canvas.height = 240;
    this.drawCounter = 0;

    this.context = this.canvas.getContext('2d');
    this.croissant = new Croissant(this.context,
                                   { x: 50, y: 200 },
                                   { width: 29, height: 32 },
                                   { x: 0, y: 0 },
                                   1);

    this.probabilityOfSceneryPerSecond = 0.1;
    this.sceneries = [];
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  createScenery() {
    this.createBackgroundScenery()
    this.createForegroundScenery()
  }

  createBackgroundScenery() {
    if (!this.shouldCreateScenery()) { return; }
    var x = this.canvas.width;
    var y = this.getRandomInt(1, 190);
    var scenery = new Bird(this.context,
                              { x: x, y: y },
                              { width: 7, height: 5 },
                              { x: -0.5, y: 0 });

    this.sceneries.push(scenery);
  }

  createForegroundScenery() {
    if (!this.shouldCreateScenery()) { return; }
    var x = this.canvas.width;
    var y = this.getRandomInt(220, 240);
    var scenery = new Flower(this.context,
                              { x: x, y: y },
                              { width: 6, height: 6 },
                              { x: -2, y: 0 });

    this.sceneries.push(scenery);
  }

  shouldCreateScenery() {
    return !(this.drawCounter % 60) &&
      Math.random() > this.probabilityOfSceneryPerSecond;
  }

  update() {
    this.deleteOffscreenSceneries();
    this.createScenery();
    this.updateSceneries();
    this.croissant.update();
  }

  updateSceneries() {
    this.sceneries.forEach(function(scenery) {
      scenery.update();
    });
  }

  drawGround() {
    this.context.fillStyle = '#808000';
    this.context.fillRect(0, 220, 320, 20);
  }

  drawSceneries() {
    this.sceneries.forEach(function(scenery) {
      scenery.draw();
    });
  }

  draw() {
    this.drawCounter += 1;
    this.context.clearRect(0, 0, 320, 240);

    this.drawGround();
    this.drawSceneries();
    this.croissant.draw();
  }

  deleteOffscreenSceneries() {
    this.sceneries.forEach((scenery, index) => {
      if (scenery.pos.x < 0) {
        this.sceneries.splice(index,1);
      }
    });
  }
}
