import Sprite from './sprite';

export default class extends Sprite {
  constructor(context, startingPosition, size, velocity) {
    super('bird', context, startingPosition, size, velocity);
  }
}
