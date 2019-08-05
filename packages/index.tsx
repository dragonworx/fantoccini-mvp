import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { State, Scope, array } from 'axial';
import { useOnce } from 'fantoccini-kit';
import { Dialog, IDialog } from 'fantoccini-kit/src/components/dialog';

import './index.less';
const log = console.log;

const randomBg = () => {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

interface Item {
    title: string;
}

interface Example {
    count: number;
    items?: Item[];
}

const stateRef = (state: Example) => {
    setInterval(() => {
        state.count++
    }, 2000);
}

const App = () => {
    const [value, setValue ] = useState(0);

    useOnce(()=> setInterval(() => setValue(Math.random()), 4000));

    const onClose = (dialog: IDialog) => () => dialog.isOpen && (dialog.isOpen = false);

    return (
        <div id="example" style={{backgroundColor: randomBg()}}>
            <h1>Example {value}</h1>
            <State defaults={{count: 1, items: [{title:'a'},{title:'b'},{title:'c'}]}} stateRef={stateRef}>
                {
                    (example: Example) => (
                        <div>
                            <p style={{backgroundColor: randomBg()}}>{example.count}</p>
                            <ul>
                                {
                                    array(example.items).map((item: Item, i: number) => <li key={i}>{item.title}</li>)
                                }
                            </ul>
                            <button onClick={() => array(example.items).add({title: example.count})}>Add Item</button>
                            <Sub count={10}/>
                            <State defaults={{isOpen: false}} stateId="foo">
                                {
                                    (dialog: IDialog) => (
                                        <>
                                            <button onClick={() => dialog.isOpen = true}>
                                                {dialog.isOpen ? 'Close' : 'Open'}
                                            </button>
                                            <Dialog isOpen={dialog.isOpen} onCancel={onClose(dialog)}>
                                                <h1>Dialog</h1>
                                            </Dialog>
                                        </>
                                    )
                                }
                            </State>
                        </div>
                    )
                }
            </State>
            <Sub count={20}/>
            <Scope stateId="foo">
                {
                    (state: IDialog) => <code>{state.isOpen ? 'Y' : 'N'}</code>
                }
            </Scope>
        </div>
    )
}

const Sub = (props: Example) => {
    const stateRef = (state: Example) => {
        setInterval(() => {
            state.count++
        }, 1500);
    }

    return (
        <div>
            <h2>Sub</h2>
            <State defaults={{count: props.count}} stateRef={stateRef}>
                {
                    (state: Example) => (
                        <p style={{backgroundColor: randomBg()}}>{state.count}</p>
                    )
                }
            </State>
        </div>
    )
}

ReactDOM.render((
    <App/>
), document.getElementById('main'));
