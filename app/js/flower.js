import Sprite from './sprite';

export default class extends Sprite {
  constructor(context, startingPosition, size, velocity) {
    super('flower', context, startingPosition, size, velocity);
  }

  get currentFrame() {
    return 0;
  }
}
