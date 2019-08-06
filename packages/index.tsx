import trace from 'trace';

import './index.less';
const log = console.log;

trace.actor('a');
trace.actor('b');
trace.actor('c');

trace('a', 'ev1', 1, 2, '3')
trace('b', 'ev2', {x:1})
trace('b', 'ev3', null)
trace('c', 'ev4', null, 2, undefined)
trace('a', 'ev5')
trace('a', 'ev6')
trace('b', 'ev7')
trace('b', 'ev7')
for (let i = 0; i < 1000; i++) {
    trace('b', 'ev0')
}

trace.mount('#main');