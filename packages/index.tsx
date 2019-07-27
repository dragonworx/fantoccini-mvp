import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    Pub,
    Sub,
    HubContext,
    Hub,
    EventQueue,
    Send,
    Clear,
} from 'fantoccini-kit/src/components/PubSubHub';

import 'fantoccini-kit/src/less/_main';

const hubRef = (hub: Hub) => {
    hub.on('click.*', event => {
        if (event) {
            const [a, b] = event.args;
            console.log(event.toString(), {a, b});   
        } else {
            console.log('clear')
        }

    });
    
    setTimeout(() => hub.emit('click.bar'), 2000);
};

const queueRef = (queue: EventQueue) => {
    setTimeout(() => queue.emit('click.baz'), 3000);
    // setTimeout(() => queue.clear('click'), 4000);
};

ReactDOM.render((
    <HubContext hubRef={hubRef}>
        <Pub queueRef={queueRef}>
            { queue => <button onClick={() => queue.emit('click.foo', 123, 456)}>Emit</button> }
        </Pub>
        <Send name="click.fart" delayMs={1000} />
        <Sub on={/^click.*/} defaults={[999]}>
            { event => <span>{event.toString()}</span> }
        </Sub>
        {/* <Send name="click.fart" delayMs={1000} /> */}
        <Clear name="click" delayMs={4000} />
    </HubContext> 
), document.getElementById('main'));