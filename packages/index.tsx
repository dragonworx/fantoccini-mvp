import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Pub, Sub, Hub, HubController, EventQueue, Send, Clear } from 'react-pubsubhub';

import 'fantoccini-kit/src/less/react-pubsubhub-demo';

const doit = () => {
    const hubRef = (hub: HubController) => {
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
        <Hub hubRef={hubRef}>
            <Pub queueRef={queueRef}>
                { queue => <button onClick={() => queue.emit('click.foo', 123, 456)}>Emit</button> }
            </Pub>
            <Send name="click.fart" delayMs={1000} />
            <Sub on={/^click.*/} defaults={[999]}>
                { event => <span>{event.toString()}</span> }
            </Sub>
            {/* <Send name="click.fart" delayMs={1000} /> */}
            <Clear name="click" delayMs={4000} />
        </Hub> 
    ), document.getElementById('main'));
};

const dialog_open = 'dialog.open';

const onOpenDialogButtonClick = (queue: EventQueue) => () => queue.emit(dialog_open);
const onCloseDialogButtonClick = (hub: HubController) => () => hub.clear(dialog_open);

ReactDOM.render((
    <Hub>
        <Pub>
            { queue => <button onClick={onOpenDialogButtonClick(queue)}>Open Dialog</button> }
        </Pub>
        <Sub on={dialog_open}>
            {
                (event) => (
                    <div className="dialog-blanket">
                        <div className="dialog-container">
                            Dialog!
                            <button onClick={onCloseDialogButtonClick(event.hub)}>Close</button>
                        </div>
                    </div>
                )
            }
        </Sub>
    </Hub> 
), document.getElementById('main'));