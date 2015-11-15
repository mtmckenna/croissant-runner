export default class {
  constructor(type, loop = false) {
    this.path = require(`../audio/${type}.wav`);
    this.loop = loop;
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.loadAudio(this.path);
  }

  loadAudio(path) {
    var request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      var data = request.response;
      this.decodeAudio(data);
    };

    request.send();
  }

  decodeAudio(data) {
    this.context.decodeAudioData(data, (buffer) => {
      this.buffer = buffer;
    });
  }

  play() {
    if (!this.buffer) { return; }

    this.source = this.context.createBufferSource();
    this.source.loop = this.loop;
    this.source.buffer = this.buffer;
    this.source.connect(this.context.destination);
    this.source.start(this.context.currentTime);
  }

  stop() {
    if (!this.source) { return; }
    this.source.stop();
  }
}
