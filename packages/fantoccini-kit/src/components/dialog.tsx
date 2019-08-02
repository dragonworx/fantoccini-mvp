import * as React from 'react';
import { MouseEvent } from 'react';
import { State, useOnce } from 'axial';
import { CSSTransition } from 'react-transition-group';

const timeout = {
  appear: 1000,
  enter: 1000,
  exit: 200
};

export interface IDialog {
    isOpen: boolean;
    onCancel?: () => void;
}

export const Dialog = ({ isOpen = false, onCancel }: Partial<IDialog>) => {
    useOnce(() => {
        window.addEventListener('keyup', e => {
            e.keyCode === 27 && (onCancel && onCancel());
        });
    });

    const onClick = (e: MouseEvent<HTMLDivElement>) => (e.currentTarget === e.target) && onCancel && onCancel();

    return (
        <CSSTransition in={isOpen} timeout={timeout} classNames="dialog" appear={true}>
            <div className="dialog-blanket" onClick={onClick}>
                <div className="dialog-container">
                    
                </div>
            </div>
        </CSSTransition>
    )
}