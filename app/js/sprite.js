export default class {
  constructor(type, context, startingPosition, size, velocity) {
    this.type = type;
    this.context = context;
    this.image = this.createImage(type);
    this.pos = startingPosition;
    this.size = size;
    this.vel = { x: velocity.x, y: velocity.y };
    this.drawCounter = 0;
    this._currentFrame = 0;
    this.borderWidth = 2;
  }

  createImage(type) {
    var image = new Image();
    image.src = require(`../images/${type}.png`);
    return image;
  }

  get currentFrame() {
    if (!(this.drawCounter % 10)) {
      this._currentFrame = (this._currentFrame + 1) % 2;
    }

    return this._currentFrame;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    return this.pos;
  }

  draw() {
    this.drawCounter += 1;

    this.context.drawImage(this.image,
                           this.currentFrame * (this.size.width + this.borderWidth), 0,
                           this.size.width, this.size.height,
                           this.pos.x, this.pos.y,
                           this.size.width, this.size.height);
  }

}
