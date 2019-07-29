import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { State } from 'axial';

import './index.less';

interface ExampleState {
    isOpen: boolean;
    message: string;
}

const defaults: ExampleState = {
    isOpen: false,
    message: '',
};

interface DialogProps {
    isOpen: boolean;
}

const Dialog = ({ isOpen }: DialogProps) => {
    const timeout={
        appear: 1000,
        enter: 1000,
        exit: 200,
    };

    return (
        <CSSTransition in={isOpen} timeout={timeout} classNames="dialog" appear={true}>
            <div className="dialog-blanket">
                <div className="dialog-container">
                    <h1>Dialog</h1>
                    <State.Consumer>
                        {
                            (state: ExampleState) => (
                                <>
                                    <p>{state.message}</p>
                                    <button onClick={onCloseDialogButtonClick(state)}>Close</button>
                                </>
                            )
                        }
                    </State.Consumer>
                </div>
            </div>
        </CSSTransition>
    );
};

const onOpenDialogButtonClick = (state: ExampleState) => () => {
    state.message = Math.random().toString();
    state.isOpen = !state.isOpen
};
const onCloseDialogButtonClick = (state: ExampleState) => () => state.isOpen = false;

const randomRGB = () => {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

ReactDOM.render((
    <State.Provider defaults={defaults}>
        <State.Consumer>
            {
                (state: ExampleState) => (
                    <div id="example">
                        <button onClick={onOpenDialogButtonClick(state)}>
                            Click to {state.isOpen ? 'Close' : 'Open'}
                        </button>
                        <div id="rect" style={{backgroundColor: randomRGB()}}></div>
                        <p>
                            isOpen: {state.isOpen ? 'true' : 'false'}
                        </p>
                        <Dialog isOpen={state.isOpen} />
                    </div>
                )
            }
        </State.Consumer>
    </State.Provider>
), document.getElementById('main'));
