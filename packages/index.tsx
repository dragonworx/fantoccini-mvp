import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { Axial, Collection } from 'axial';

import './index.less';

const randomString = () => Math.random().toString()
const randomRGB = () => {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

/** State */

interface ExampleState {
    isOpen: boolean;
    message: string;
    array: string[];
    collection: Collection<string>;
}

const defaults: ExampleState = {
    isOpen: false,
    message: '',
    array: [randomString()],
    collection: new Collection([randomString()]),
};

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
                    <Axial.Consumer>
                        {
                            (state: ExampleState) => (
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

                                    <label>
                                        <span>Collection:</span>
                                        <ul>
                                        {
                                            state.collection.map((item, i) => <li key={i}>{item}</li>)
                                        }
                                        </ul>
                                    </label>

                                    <button onClick={onCloseDialogButtonClick(state)}>Close</button>
                                    <button onClick={onAddArrayItem(state)}>Add Array Item</button>
                                    <button onClick={onAddCollectionItem(state)}>Add Collection Item</button>
                                </>
                            )
                        }
                    </Axial.Consumer>
                </div>
            </div>
        </CSSTransition>
    );
};

/** Actions */

const onOpenDialogButtonClick = (state: ExampleState) => () => {
    state.message = randomString();
    state.isOpen = !state.isOpen
}

const onCloseDialogButtonClick = (state: ExampleState) => () => state.isOpen = false;

const onAddArrayItem = (state: ExampleState) => () => {
    const item = randomString();
    state.array.push(item);
    if (state.array.length > 5) {
        state.array.length = 0;
        state.array.push(item);
    }
}

const onAddCollectionItem = (state: ExampleState) => () => {
    const item = randomString();
    state.collection.add(item);
    if (state.collection.length > 5) {
        state.collection.clear();
        state.collection.add(item);
    }
}

/** Example */

ReactDOM.render((
    <div id="example">
        <h1>Do you even Axial...</h1>
        <Axial.Provider defaults={defaults}>
            <Axial.Consumer>
                {
                    (state: ExampleState) => (
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
            </Axial.Consumer>
        </Axial.Provider>
    </div>
), document.getElementById('main'));
