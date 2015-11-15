import Sprite from './sprite';

export default class extends Sprite {
  constructor(context) {
    super('croissant',
          context,
          { x: 50, y: 200 },
          { width: 29, height: 32 },
          { x: 0, y: 0 });

    this.gravity = .5;
    this.jumpVelocity = -14;
    this.groundLevel = this.pos.y;

    this.addInputListeners();
    this.addAudio();
  }

  addInputListeners() {
    window.addEventListener('keydown', this.jump.bind(this), false);
    window.addEventListener('touchstart', this.jump.bind(this), false);
  }

  addAudio() {
    this.jumpAudio = new Audio(require('../audio/jump.wav'));
    this.pizzaAudio = new Audio(require('../audio/pizza.wav'));
    this.napAudio = new Audio(require('../audio/nap.wav'));
    this.napAudio.loop = true;
  }

  jump() {
    if (this.pos.y < this.groundLevel) { return; }
    this.vel.y = this.jumpVelocity;
    this.jumpAudio.play();
  }

  update() {
    this.vel.y = this.vel.y + this.gravity;
    this.pos.y = Math.floor(this.pos.y + this.vel.y);

    if (this.pos.y > this.groundLevel) {
      this.vel.y = 0;
      this.pos.y = this.groundLevel;
    }

    return this.pos;
  }
}
