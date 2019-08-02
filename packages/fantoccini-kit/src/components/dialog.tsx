import * as React from 'react';
import { State, useOnce } from 'axial';
import { CSSTransition } from 'react-transition-group';

const timeout = {
  appear: 1000,
  enter: 1000,
  exit: 200
};

export interface IDialog {
    isOpen: boolean;
    onClose?: () => void;
}

export const Dialog = ({ isOpen = false, onClose }: Partial<IDialog>) => {
    useOnce(() => {
        window.addEventListener('keyup', e => {
            e.keyCode === 27 && (onClose && onClose());
        });
    });

    return (
        <CSSTransition in={isOpen} timeout={timeout} classNames="dialog" appear={true}>
            <div className="dialog-blanket">
                <div className="dialog-container">
                    
                </div>
            </div>
        </CSSTransition>
    )
}