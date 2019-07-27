import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Access, Read, State, StateStore, Set } from 'react-pubsubhub';
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

const dialog_is_open = 'dialog.is.open';

const onOpenDialogButtonClick = (state: StateStore) => () => state.set(dialog_is_open, true);
const onCloseDialogButtonClick = (state: StateStore) => () => state.set(dialog_is_open, false);

interface Props {
    isOpen: boolean;
}

const Dialog = ({isOpen}: Props) => {
    const timeout={
        appear: 1000,
        enter: 1000,
        exit: 200,
    };

    return (
        <CSSTransition in={isOpen} timeout={timeout} classNames="dialog" appear={isOpen}>
            <div className="dialog-blanket">
                <div className="dialog-container">
                    <h1>Dialog</h1>
                    <Access>
                        { state => <button onClick={onCloseDialogButtonClick(state)}>Close</button>}
                    </Access>
                </div>
            </div>
        </CSSTransition>
    );
};

const stateRef = (state: StateStore) => {
    window.addEventListener('keyup', e => {
        const isDialogOpen = state.get(dialog_is_open, false);
        if (e.keyCode === 27 && isDialogOpen) {
            state.set(dialog_is_open, false);
        }
    });
};

ReactDOM.render((
    <State stateRef={stateRef}>
        <Access>
            { state => <button onClick={onOpenDialogButtonClick(state)}>Open Dialog</button> }
        </Access>
        <Read<boolean> from={dialog_is_open}>
            { isOpen => <Dialog isOpen={isOpen} /> }
        </Read>
    </State> 
), document.getElementById('main'));

// make it more like state, set state with values under a key, clear the key