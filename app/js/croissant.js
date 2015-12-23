import Sprite from './sprite';

export default class extends Sprite {
  constructor(canvasContext) {
    super('croissant',
          canvasContext,
          { x: 50, y: 200 },
          { width: 29, height: 32 },
          { x: 0, y: 0 });

    this.gravity = .5;
    this.jumpVelocity = -14;
    this.groundLevel = this.pos.y;
  }

  jump() {
    if (this.pos.y < this.groundLevel) { return false; }
    this.vel.y = this.jumpVelocity;
    return true;
  }

  updatePosition() {
    this.vel.y = this.vel.y + this.gravity;
    this.pos.y = Math.floor(this.pos.y + this.vel.y);

    if (this.pos.y > this.groundLevel) {
      this.vel.y = 0;
      this.pos.y = this.groundLevel;
    }

    return this.pos;
  }
}
