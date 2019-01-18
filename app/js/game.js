import Croissant from './croissant';
import SpriteEmitter from './sprite-emitter';
import SoundEffect from './sound-effect';

import { throttled } from './util';

const MUTE_THROTTLE_DELAY = 1000;

export default class {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = 320;
    this.height = 240;
    this.context = this.canvas.getContext('2d');
    this.configureCanvas();

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    this.configureAudioEffects(this.audioContext);

    this.croissant = new Croissant(this.context, this.audioContext);
    this.spriteEmitter = new SpriteEmitter(this.context);

    this.score = 0;
    this._hiScore = 0;
    this.userHasInteracted = false;
    this.gameOver = false;
    this.mute = true;

    this.addInputListeners();
  }

  set hiScore(score) {
    if (score > this.hiScore) {
      this._hiScore = score;
    }
  }

  get hiScore() {
    return this._hiScore;
  }

  mutePressed() {
    this.mute = !this.mute;

    const volumeOffIcon = document.getElementById('volume-off');
    const voulmeOnIcon = document.getElementById('volume-on');

    if (!this.mute) {
      volumeOffIcon.classList.remove('visible');    
      voulmeOnIcon.classList.add('visible');    
    } else {
      volumeOffIcon.classList.add('visible');    
      voulmeOnIcon.classList.remove('visible');
    }
  }

  configureCanvas() {
    this.canvas.style.backgroundColor = '#66ccff';
    this.canvas.width  = this.width;
    this.canvas.height = this.height;
  }

  addInputListeners() {
    const volumeIcons = Array.from(document.getElementsByClassName('volume'));
    const throttledMute = throttled(MUTE_THROTTLE_DELAY, this.mutePressed.bind(this));
    volumeIcons.forEach((icon) => {
      icon.addEventListener('click', throttledMute);
      icon.addEventListener('touchstart', throttledMute);
    });

    window.addEventListener('keydown', this.jump.bind(this));
    window.addEventListener('mousedown', this.jump.bind(this));
    window.addEventListener('touchstart', this.jump.bind(this));
    window.addEventListener('keydown', this.resetGame.bind(this));
    window.addEventListener('mousedown', this.resetGame.bind(this));
    window.addEventListener('touchstart', this.resetGame.bind(this));
    window.addEventListener('keydown', this.prepareMobileAudio.bind(this));
    window.addEventListener('mousedown', this.prepareMobileAudio.bind(this));
    window.addEventListener('touchend', this.prepareMobileAudio.bind(this));
  }

  // iOS web audio is such misery.
  // https://paulbakaus.com/tutorials/html5/web-audio-on-ios/
  prepareMobileAudio() {
    if (this.userHasInteracted) return;

    const buffer = this.audioContext.createBuffer(1, 1, 22050);
    const source = this.audioContext.createBufferSource();

    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.start(0);

    this.userHasInteracted = true;
  }

  configureAudioEffects(audioContext) {
    this.audioHash = {
      pizza: new SoundEffect('pizza', audioContext),
      jump: new SoundEffect('jump', audioContext),
      nap: new SoundEffect('nap', audioContext, true)
    };
  }

  jump() {
    const didJump = this.croissant.jump();
    if (didJump) { this.playAudio('jump'); }
  }

  resetGame() {
    if (!this.gameOver) { return; }
    this.spriteEmitter.deleteAllSprites();
    this.score = 0;
    this.gameOver = false;
    this.stopAudio('nap');
  }

  handleSpriteCollisions() {
    this.handlePizzaCollisions();
    this.handleCatBedCollisions();
  }

  handlePizzaCollisions() {
    const pizzas = this.spriteEmitter.pizzasThatSpriteOverlaps(this.croissant);
    this.spriteEmitter.deleteSprites(pizzas);
    this.score += pizzas.length;

    pizzas.forEach(() => {
      this.playAudio('pizza');
    });
  }

  handleCatBedCollisions() {
    const catBeds = this.spriteEmitter.catBedsThatSpriteOverlaps(this.croissant);
    if (catBeds.length) {
      this.goToGameOver(catBeds[0]);
    }
  }

  goToGameOver(catBed) {
    catBed.switchToSleepingCroissantImage();
    this.playAudio('nap');
    this.drawWorld();
    this.gameOver = true;
    this.hiScore = this.score;
  }

  updateSpritePositions() {
    this.spriteEmitter.updatePositions();
    this.croissant.updatePosition();
  }

  update() {
    if (this.gameOver) { return; }
    this.updateSpritePositions();
    this.handleSpriteCollisions();
  }

  playAudio(effectName) {
    if (this.mute) return;
    this.audioHash[effectName].play();
  }

  stopAudio(effectName) {
    this.audioHash[effectName].stop();
  }

  drawGround() {
    this.context.fillStyle = '#4f8f00';
    this.context.fillRect(0, 220, 320, 20);
  }

  drawScore() {
    this.context.fillStyle = '#4f8f00';
    this.context.font = '15px "Lucida Console", Monaco, monospace';
    this.context.fillText(`${this.score} Pizzas`, 10, 25);
    this.context.fillText(`Hi Score: ${this.hiScore}`, 195, 25);
  }

  drawWorld() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.drawGround();
    this.spriteEmitter.draw();
    this.drawScore();
  }

  draw() {
    if (this.gameOver) { return; }
    this.drawWorld();
    this.croissant.draw();
  }
}
