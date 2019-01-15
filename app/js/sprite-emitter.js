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

  deleteSprites(sprites) {
    sprites.forEach((sprite) => {
      const index = this.sprites.indexOf(sprite);
      this.sprites.splice(index, 1);
    });
  }

  deleteAllSprites() {
    this.sprites = [];
  }

  pizzasThatSpriteOverlaps(sprite) {
   return this.pizzas.filter((pizza) => {
      return sprite.intersects(pizza);
    });
  }

  catBedsThatSpriteOverlaps(sprite) {
   return this.catBeds.filter((catBed) => {
      return sprite.intersects(catBed);
    });
  }

  shouldCreateSprite(minFrequency, percentageChance = 1.0) {
    const minAmountOfTime = !(this.drawCounter % minFrequency);
    const lucky = !!(percentageChance > Math.random());
    return minAmountOfTime && lucky;
  }

  emitSprites() {
    this.emitScenery();
    this.emitPizza();
    this.emitCatBed();
  }

  emitScenery() {
    if (!this.shouldCreateSprite(20)) { return; }
    const randomClassIndex = Math.floor(Math.random() * this.sceneryClasses.length);
    const SceneryClass = this.sceneryClasses[randomClassIndex];
    const scenery = new SceneryClass(this.context);

    this.sprites.push(scenery);
  }

  emitPizza() {
    if (!this.shouldCreateSprite(10)) { return; }
    const pizza = new Pizza(this.context);
    this.sprites.push(pizza);
  }

  emitCatBed() {
    if (!this.shouldCreateSprite(60, 0.5)) { return; }
    const catBed = new CatBed(this.context);
    this.sprites.push(catBed);
  }

  deleteOffscreenSprites() {
    this.sprites = this.sprites.filter(function(sprite) {
      return (sprite.pos.x + sprite.size.width > 0);
    });
  }

  updateSprites() {
    this.sprites.forEach(function(sprite) {
      sprite.updatePosition();
    });
  }

  drawSprites() {
    this.sprites.forEach(function(sprite) {
      sprite.draw();
    });
  }

  updatePositions() {
    this.deleteOffscreenSprites();
    this.emitSprites();
    this.updateSprites();
  }

  draw() {
    this.drawCounter += 1;
    this.drawSprites();
  }
}
