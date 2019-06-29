export const requestAnimationFrame = (fn: (timestamp: DOMHighResTimeStamp) => void) => window.requestAnimationFrame(fn);
export * from './easing';
export * from './2d';
// export * from './color';