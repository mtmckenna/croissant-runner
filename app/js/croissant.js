export default class {
  constructor(context, gravity, startingPosition) {
    this.context = context;
    this.gravity = gravity;
    this.pos = startingPosition;

    this.jumpVelocity = -20;
    this.vel = { y: 0 };
    this.groundLevel = this.pos.y;
    this.image = this.createImage();
    this._currentFrame = 0;
    this.drawCounter = 0;

    this.addInputListeners();
  }

  addInputListeners() {
    window.addEventListener('keydown', this.jump.bind(this), false);
    window.addEventListener('touchstart', this.jump.bind(this), false);
  }

  createImage() {
    var image = new Image();
    image.src = require('../images/croissant.png');
    return image;
  }

  currentFrame() {
    if (!(this.drawCounter % 10)) {
      this._currentFrame = (this._currentFrame + 1) % 2;
    }

    return this._currentFrame;
  }

  jump() {
    if (this.pos.y < this.groundLevel) { return; }
    this.vel.y = this.jumpVelocity;
  }

  update() {
    this.vel.y = this.vel.y + this.gravity;
    this.pos.y += this.vel.y;

    if (this.pos.y > this.groundLevel) {
      this.vel.y = 0.0;
      this.pos.y = this.groundLevel;
    };

    return this.pos.y;
  }

  draw() {
    this.drawCounter += 1;

    this.context.drawImage(this.image,
                           this.currentFrame() * 31, 0,
                           29, 32,
                           this.pos.x, this.pos.y,
                           29, 32);
  }
}
