import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Pub, Sub, Hub, HubController, Send, Clear } from 'react-pubsubhub';
import { CSSTransition } from 'react-transition-group';

import 'fantoccini-kit/src/less/react-pubsubhub-demo';

// const doit = () => {
//     const hubRef = (hub: HubController) => {
//         hub.on('click.*', event => {
//             if (event) {
//                 const [a, b] = event.args;
//                 console.log(event.toString(), {a, b});   
//             } else {
//                 console.log('clear')
//             }
    
//         });
        
//         setTimeout(() => hub.emit('click.bar'), 2000);
//     };
    
//     const queueRef = (queue: EventQueue) => {
//         setTimeout(() => queue.emit('click.baz'), 3000);
//         // setTimeout(() => queue.clear('click'), 4000);
//     };

//     ReactDOM.render((
//         <Hub hubRef={hubRef}>
//             <Pub queueRef={queueRef}>
//                 { queue => <button onClick={() => queue.emit('click.foo', 123, 456)}>Emit</button> }
//             </Pub>
//             <Send name="click.fart" delayMs={1000} />
//             <Sub on={/^click.*/} defaults={[999]}>
//                 { event => <span>{event.toString()}</span> }
//             </Sub>
//             {/* <Send name="click.fart" delayMs={1000} /> */}
//             <Clear name="click" delayMs={4000} />
//         </Hub> 
//     ), document.getElementById('main'));
// };

const dialog_open = 'dialog.open';

const onOpenDialogButtonClick = (hub: HubController) => () => hub.emit(dialog_open);
const onCloseDialogButtonClick = (hub: HubController) => () => hub.clear(dialog_open);

ReactDOM.render((
    <Hub>
        <Pub>
            { hub => <button onClick={onOpenDialogButtonClick(hub)}>Open Dialog</button> }
        </Pub>
            <Sub on={dialog_open}>
                {
                    (event) => (
                        <CSSTransition in={true} timeout={1000} classNames="dialog" appear={true}>
                        <div className="dialog-blanket">
                            <div className="dialog-container">
                                Dialog!
                                <button onClick={onCloseDialogButtonClick(event.hub)}>Close</button>
                            </div>
                        </div>
                        </CSSTransition>
                    )
                }
            </Sub>
    </Hub> 
), document.getElementById('main'));

// make it more like state, set state with values under a key, clear the key