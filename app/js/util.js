export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function throttled(delay, fn) {
  let lastCall = 0;
  return function (...args) {
    const now = (new Date).getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  }
}

