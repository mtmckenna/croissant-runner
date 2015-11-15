import Sprite from './sprite';
import SoundEffect from './sound-effect';

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
  }

  addInputListeners() {
    window.addEventListener('keydown', this.jump.bind(this), false);
    window.addEventListener('touchstart', this.jump.bind(this), false);
  }

  addAudio() {
    this.jumpAudio = new SoundEffect('jump');
    this.jumpAudio.play();
    this.jumpAudio.stop();

    this.pizzaAudio = new SoundEffect('pizza');
    this.pizzaAudio.play();
    this.pizzaAudio.stop();

    this.napAudio = new SoundEffect('nap', true);
    this.napAudio.play();
    this.napAudio.stop();
  }

  audioIsLoaded() {
    return this.jumpAudio && this.pizzaAudio && this.napAudio;
  }

  jump() {
    if (!this.audioIsLoaded()) {
      this.addAudio();
    }

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
