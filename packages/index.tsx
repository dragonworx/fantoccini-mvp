import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Access, Read, Store, DataStore, StoreWrite } from 'react-pubsubhub';
import { CSSTransition } from 'react-transition-group';

import 'fantoccini-kit/src/less/react-pubsubhub-demo';

const dialog_is_open = 'dialog.is.open';

const onOpenDialogButtonClick = (store: DataStore) => () => store.set(dialog_is_open, true);
const onCloseDialogButtonClick = (store: DataStore) => () => store.set(dialog_is_open, false);

interface Props {
    isOpen: boolean;
}

const Dialog = ({isOpen}: Props) => {
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
                    <Access>
                        { store => <button onClick={onCloseDialogButtonClick(store)}>Close</button>}
                    </Access>
                </div>
            </div>
        </CSSTransition>
    );
};

const storeRef = (store: DataStore) => {
    window.addEventListener('keyup', e => {
        const isDialogOpen = store.get<boolean>(dialog_is_open, false);
        if (e.keyCode === 27 && isDialogOpen) {
            store.set(dialog_is_open, false);
        }
    });
};

ReactDOM.render((
    <Store storeRef={storeRef}>
        <Access>
            { store => <button onClick={onOpenDialogButtonClick(store)}>Open Dialog</button> }
        </Access>
        <Read<boolean> from={dialog_is_open}>
            { isOpen => <Dialog isOpen={isOpen} /> }
        </Read>
    </Store> 
), document.getElementById('main'));

// make it more like state, set state with values under a key, clear the key