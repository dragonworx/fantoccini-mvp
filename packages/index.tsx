import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { createScope, AxialArray, getState, Scope } from 'axial';

import './index.less';

const randomString = () => Math.random().toString()
const randomRGB = () => {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

/** State Setup */

interface ExampleState1 {
    isOpen: boolean;
    message: string;
    array: AxialArray<string>;
}

interface ExampleState2 {
    count: number;
}

const exampleState1Defaults: ExampleState1 = {
    isOpen: false,
    message: '',
    array: [randomString()],
};

const exampleState2Defaults: ExampleState2 = {
    count: 0,
};

const Example1 = 'example1';
const Example2 = 'example2';

createScope(Example1, exampleState1Defaults);
createScope(Example2, exampleState2Defaults);

/** Actions */

const onOpenDialogButtonClick = (state: ExampleState1) => () => {
    state.message = randomString();
    state.isOpen = !state.isOpen
}

const onCloseDialogButtonClick = (state: ExampleState1) => () => state.isOpen = false;

const onAddArrayItem = (state: ExampleState1) => () => {
    const item = randomString();
    state.array.push(item);
    if (state.array.count > 5) {
        state.array.count = 0;
        state.array.push(item);
    }
}

const onCountClick = (state: ExampleState2) => () => state.count += 1;

/** Dialog */

interface DialogProps {
    isOpen: boolean;
}

const Dialog = ({ isOpen }: DialogProps) => {
    const timeout = { appear: 1000, enter: 1000, exit: 200 };

    return (
        <CSSTransition in={isOpen} timeout={timeout} classNames="dialog" appear={true}>
            <div className="dialog-blanket">
                <div className="dialog-container">
                    <h1>Dialog</h1>
                    <Scope from={Example1}>
                        {
                            (state: ExampleState1) => (
                                <>
                                    <label>
                                        <span>Message:</span>
                                        <p>{state.message}</p>
                                    </label>

                                    <label>
                                        <span>Array:</span>
                                        <ul>
                                        {
                                            state.array.map((item, i) => <li key={i}>{item}</li>)
                                        }
                                        </ul>
                                    </label>

                                    <Scope from={Example2}>
                                        {(state: ExampleState2) => (
                                            <a href="javascript:void(0)" onClick={onCountClick(state)}>Count: {state.count}</a>
                                        )}
                                    </Scope>

                                    <Scope from={Example1}>
                                        {({message}: ExampleState1) => <label>{message}</label>}
                                    </Scope>

                                    <button onClick={onCloseDialogButtonClick(state)}>Close</button>
                                    <button onClick={onAddArrayItem(state)}>Add Array Item</button>
                                </>
                            )
                        }
                    </Scope>
                </div>
            </div>
        </CSSTransition>
    );
};

/** Example */

ReactDOM.render((
    <div id="example">
        <h1>Do you even Axial...</h1>
        <Scope from={Example1}>
            {
                (state: ExampleState1) => (
                    <>
                        <button onClick={onOpenDialogButtonClick(state)} style={{backgroundColor: randomRGB()}}>
                            Click to {state.isOpen ? 'Close' : 'Open'}
                        </button>
                        <p>
                            isOpen: <b>{state.isOpen ? 'true' : 'false'}</b>
                        </p>
                        <Dialog isOpen={state.isOpen} />
                    </>
                )
            }
        </Scope>
    </div>
), document.getElementById('main'));

/** External Scope Access */
window.addEventListener('keyup', e => {
    const state = getState<ExampleState1>(Example1);
    e.keyCode === 27 && state.isOpen && (state.isOpen = false);
});