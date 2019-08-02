import * as React from 'react';
import {useState, useEffect,memo} from 'react';
import * as ReactDOM from 'react-dom';
import { State, useOnce } from 'axial';
import { Dialog, IDialog } from 'fantoccini-kit/src/components/dialog';

import './index.less';
const log = console.log;

const randomBg = () => {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

interface IExample {
    count: number;
}

const stateRef = (state: IExample) => {
    setInterval(() => {
        state.count++
    }, 1000);
}

const Example = () => {
    const [value, setValue ] = useState(0);

    useOnce(()=> setInterval(() => setValue(Math.random()), 4000));

    const onClose = (state: IDialog) => () => state.isOpen && (state.isOpen = false);

    return (
        <div id="example" style={{backgroundColor: randomBg()}}>
            <h1>Example {value}</h1>
            <State defaults={{count: 1}} stateRef={stateRef}>
                {
                    (state: IExample) => (
                        <div>
                            <p style={{backgroundColor: randomBg()}}>{state.count}</p>
                            <Sub count={10}/>
                            <State defaults={{isOpen: false}}>
                                {
                                    (state: IDialog) => (
                                        <>
                                        <button onClick={() => state.isOpen = true}>{state.isOpen ? 'Close' : 'Open'}</button>
                                            <Dialog isOpen={state.isOpen} onClose={onClose(state)} />
                                        </>
                                    )
                                }
                            </State>
                        </div>
                    )
                }
            </State>
            <Sub count={20}/>
        </div>
    )
}

const Sub = (props: IExample) => {
    const stateRef = (state: IExample) => {
        setInterval(() => {
            state.count++
        }, 1500);
    }

    return (
        <div>
            <h2>Sub</h2>
            <State defaults={{count: props.count}} stateRef={stateRef}>
                {
                    (state: IExample) => (
                        <p style={{backgroundColor: randomBg()}}>{state.count}</p>
                    )
                }
            </State>
        </div>
    )
}

ReactDOM.render((
    <Example/>
), document.getElementById('main'));
