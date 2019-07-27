import * as React from 'react';
import { ReactElement, useState, createContext, FC } from 'react';

import {
    ReadRenderFunc,
    StateStore,
    StateRefCallback,
    AccessRenderFunc,
} from './types';

export const Context = createContext<StateProps>({});

export interface AccessProps {
    children?: AccessRenderFunc;
}

export const Access = (props: AccessProps) => {
    return (
        <Context.Consumer>
        {
            ({state: hub}) => {
                const { children } = props;
                if (!children) {
                    return null;
                }
                return children(hub);
            }
        }
        </Context.Consumer>
    )
}

export interface ReadProps<T> {
    from: string;
    defaultValue?: T;
    children?: ReadRenderFunc<T>;
}

export function Read<T>(props: ReadProps<T>) {
    const [ value, setValue ] = useState();

    return (
        <Context.Consumer>
        {
            ({state}) => {
                const { from: on, defaultValue, children } = props;
                state.on<T>(on, value => {
                    setValue(value);
                });
                if (!children || value === undefined) {
                    if (defaultValue) {
                        return children(defaultValue);
                    }
                    return null;
                }
                return children(value);
            }
        }
        </Context.Consumer>
    )
};

export interface StateProps {
    state?: StateStore;
    stateRef?: StateRefCallback;
    children?: ReactElement<any>[];
}

export const State = (props: StateProps) => {
    const { state = new StateStore(), stateRef, children } = props;
    stateRef && stateRef(state);
    return (
        <Context.Provider value={{ state }}>
            {children}
        </Context.Provider>
    )
}

export interface SetProps {
    key: string;
    value: any;
    delayMs?: number;
}

export const Set = (props: SetProps) => {
    return (
        <Context.Consumer>
        {
            ({state}) => {
                const { key, value, delayMs = -1 } = props;
                if (typeof delayMs === 'number' && delayMs > -1) {
                    setTimeout(() => state.set(key, value), delayMs);
                } else {
                    state.set(key, value);
                }
                return null;
            }
        }
        </Context.Consumer>
    )
}