import * as React from 'react';
import { State } from 'axial';
import { CSSTransition } from 'react-transition-group';

const timeout = {
  appear: 1000,
  enter: 1000,
  exit: 200
};

interface DialogProps {
    isOpen: boolean;
}

const state = State.createState('fk.comp.dialog', {
    isOpen: false,
})

const Dialog = ({ isOpen }: DialogProps) => (
    <State id="fx.comp.dialog">
        {
            (state: DialogProps) => (
                <CSSTransition in={isOpen} timeout={timeout} classNames="dialog" appear={true}>
                    <div className="dialog-blanket">
                        <div className="dialog-container">
                            
                        </div>
                    </div>
                </CSSTransition>
            )
        }
    </State>
)

type anyFn = (...args: any[]) => any;
const funcs: Map<anyFn, number> = new Map;
const once = (fn: anyFn) => {
    if (!funcs.has(fn)) {
        funcs.set(fn, 1);
        fn();
    }
}

window.addEventListener('keyup', e => {
    const state = getState<ExampleState1>(Example1);
    e.keyCode === 27 && state.isOpen && (state.isOpen = false);
});