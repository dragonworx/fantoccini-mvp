import * as React from 'react';
import { MouseEvent, ReactElement } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useWindowEvent } from '../util';

const timeout = {
  appear: 1000,
  enter: 1000,
  exit: 200
};

export interface IDialog {
    isOpen: boolean;
    onCancel?: () => void;
    children?: ReactElement;
}

export const Dialog = ({ isOpen = false, onCancel, children }: IDialog) => {
    useWindowEvent('keyup', (e: KeyboardEvent) => e.keyCode === 27 && (onCancel && onCancel()));

    const onClick = (e: MouseEvent<HTMLDivElement>) => (e.currentTarget === e.target) && onCancel && onCancel()

    return (
        <CSSTransition in={isOpen} timeout={timeout} classNames="dialog" appear={true}>
            <div className="dialog-blanket" onClick={onClick}>
                <div className="dialog-container">
                    {children}
                </div>
            </div>
        </CSSTransition>
    )
}