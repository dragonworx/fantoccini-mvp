import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { State,  Read, Store } from 'react-pubsubhub';
import { CSSTransition } from 'react-transition-group';

import 'fantoccini-kit/src/less/react-pubsubhub-demo';

const onOpenDialogButtonClick = (state: ExampleState) => () => state.isOpen = true;
const onCloseDialogButtonClick = (state: ExampleState) => () => state.isOpen = false;

interface DialogProps {
    isOpen: boolean;
}

const Dialog = ({isOpen}: DialogProps) => {
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
                    <State>
                        { state => <button onClick={onCloseDialogButtonClick(state)}>Close</button>}
                    </State>
                </div>
            </div>
        </CSSTransition>
    );
};

interface ExampleState {
    isOpen: boolean;
}

const stateRef = (state: ExampleState) => {
    window.addEventListener('keyup', e => {
        if (e.keyCode === 27 && state.isOpen) {
            state.isOpen = true;
        }
    });
};

const defaults: ExampleState = {
    isOpen: false,
};

ReactDOM.render((
    <Store defaults={defaults}>
        <State>
            { (state: ExampleState) => <button onClick={onOpenDialogButtonClick(state)}>Open Dialog</button> }
        </State>
        <Read from={(state: ExampleState) => state.isOpen}>
            { (isOpen: boolean) => <Dialog isOpen={isOpen} /> }
        </Read>
    </Store>
), document.getElementById('main'));

// make it more like state, set state with values under a key, clear the key