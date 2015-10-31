import Bird from './bird';
import Cloud from './cloud';
import Flower from './flower';

export default class {
  constructor(context) {
    this.context = context;
    this.sceneries = [];
    this.drawCounter = 0;
    this.sceneryClasses = [Flower, Cloud, Bird];
  }

  shouldCreateScenery() {
    return !(this.drawCounter % 60);
  }

  deleteOffscreenSceneries() {
    this.sceneries.forEach((scenery, index) => {
      if (scenery.pos.x < 0) {
        this.sceneries.splice(index, 1);
      }
    });
  }

  emitScenery() {
    if (!this.shouldCreateScenery()) { return; }
    var randomClassIndex = Math.floor(Math.random() * this.sceneryClasses.length);
    var SceneryClass = this.sceneryClasses[randomClassIndex];
    var scenery = new SceneryClass(this.context);;

    this.sceneries.push(scenery);
  }

  drawSceneries() {
    this.sceneries.forEach(function(scenery) {
      scenery.draw();
    });
  }

  update() {
    this.deleteOffscreenSceneries();
    this.emitScenery();
    this.sceneries.forEach(function(scenery) {
      scenery.update();
    });
  }

  draw() {
    this.drawCounter += 1;
    this.drawSceneries();
  }
}