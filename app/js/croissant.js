import Sprite from './sprite';

export default class extends Sprite {
  constructor(context, startingPosition, size, velocity, gravity) {
    super('croissant', context, startingPosition, size, velocity);

    this.gravity = gravity;
    this.jumpVelocity = -20;
    this.groundLevel = this.pos.y;

    this.addInputListeners();
  }

  addInputListeners() {
    window.addEventListener('keydown', this.jump.bind(this), false);
    window.addEventListener('touchstart', this.jump.bind(this), false);
  }

  jump() {
    if (this.pos.y < this.groundLevel) { return; }
    this.vel.y = this.jumpVelocity;
  }

  update() {
    this.vel.y = this.vel.y + this.gravity;
    this.pos.y += this.vel.y;

    if (this.pos.y > this.groundLevel) {
      this.vel.y = 0;
      this.pos.y = this.groundLevel;
    };

    return this.pos;
  }
}
