export default class {
  constructor(context, type, startingPosition, size, xVelocity) {
    this.type = type;
    this.context = context;
    this.image = this.createImage(type);
    this.pos = startingPosition;
    this.size = size;
    this.vel = { x: xVelocity };
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
    if (this.type === 'flower') { return 0; }
    if (!(this.drawCounter % 10)) {
      this._currentFrame = (this._currentFrame + 1) % 2;
    }

    return this._currentFrame;
  }

  update() {
    this.pos.x += this.vel.x;
    return this.pos.x;
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
