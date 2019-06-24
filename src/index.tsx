
import { Timeline, Linear, InQuad, OutQuad } from './fantoccini-core';
import { DomPuppet } from './fantoccini-dom';

const timeline = new Timeline();
const puppet = new DomPuppet('test');

const sequence = puppet
    .motion('left')
    .sequence(0, Infinity);
sequence
    .ease(InQuad, OutQuad)
    .alternate(true)
    .frame(100, 1000, Linear)
    .frame(200, 1000, Linear)
    .frame(300, 1000, Linear);

timeline.add(puppet);

setTimeout(() => timeline.start(), 0);
document.body.addEventListener('mousedown', () => {
    timeline.seek(0);
});

// debug
const debug = {
    puppet,
    sequence,
};
for (let k in debug) (window as any)[k] = (debug as any)[k];
console.log(debug)