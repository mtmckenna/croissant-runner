import Bird from './bird';
import Cloud from './cloud';
import Flower from './flower';
import Pizza from './pizza';
import CatBed from './catbed';

export default class {
  constructor(context) {
    this.context = context;
    this.sprites = [];
    this.drawCounter = 0;
    this.sceneryClasses = [Flower, Cloud, Bird];
  }

  get pizzas() {
    return this.sprites.filter(function(sprite) {
      return sprite.type === 'pizza';
    });
  }

  get catBeds() {
    return this.sprites.filter(function(sprite) {
      return sprite.type === 'catbed';
    });
  }

  shouldCreateScenery(frequency) {
    return !(this.drawCounter % frequency);
  }

  emitScenery() {
    if (!this.shouldCreateScenery(30)) { return; }
    var randomClassIndex = Math.floor(Math.random() * this.sceneryClasses.length);
    var SceneryClass = this.sceneryClasses[randomClassIndex];
    var scenery = new SceneryClass(this.context);;

    this.sprites.push(scenery);
  }

  emitPizza() {
    if (!this.shouldCreateScenery(10)) { return; }
    var pizza = new Pizza(this.context);
    this.sprites.push(pizza);
  }

  emitCatBed() {
    if (!this.shouldCreateScenery(60)) { return; }
    var catBed = new CatBed(this.context);
    this.sprites.push(catBed);
  }

  deleteOffscreenSprites() {
    this.sprites.forEach((sprite, index) => {
      if (sprite.pos.x < 0) {
        this.sprites.splice(index, 1);
      }
    });
  }

  updateSprites() {
    this.sprites.forEach(function(sprite) {
      sprite.update();
    });
  }

  drawSprites() {
    this.sprites.forEach(function(sprite) {
      sprite.draw();
    });
  }

  update() {
    this.deleteOffscreenSprites(this.sceneries);
    this.deleteOffscreenSprites(this.pizzas);
    this.deleteOffscreenSprites(this.catBeds);
    this.emitScenery();
    this.emitPizza();
    this.emitCatBed();
    this.updateSprites();
  }

  draw() {
    this.drawCounter += 1;
    this.drawSprites();
  }
}
