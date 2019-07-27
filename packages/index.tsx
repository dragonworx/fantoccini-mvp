import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    Pub,
    Sub,
    HubContext,
    Hub,
    EventQueue,
} from 'fantoccini-kit/src/components/PubSubHub';

import 'fantoccini-kit/src/less/_main';

const hubRef = (hub: Hub) => {
    hub.on('click.*', event => {
        const [a, b] = event.args;
        console.log(event.toString(), {a, b});
    });
    
    setTimeout(() => hub.emit('click.bar'), 1000);
};

const queueRef = (queue: EventQueue) => {
    setTimeout(() => queue.emit('click.baz'), 2000);
};

ReactDOM.render((
    <HubContext hubRef={hubRef}>
        <Pub queueRef={queueRef}>
            { queue => <button onClick={() => queue.emit('click.foo', 123, 456)}>Emit</button> }
        </Pub>
        <Sub on={/^click.*/} defaults={[999]}>
            { event => <span>{event.toString()}</span> }
        </Sub>
    </HubContext> 
), document.getElementById('main'));