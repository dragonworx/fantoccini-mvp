import * as React from 'react';
import { ReactElement, useState, createContext, FC } from 'react';

import {
    ReadRenderFunc,
    DataStore,
    StoreRefCallback,
    AccessRenderFunc,
} from './types';

export const Context = createContext<StoreProps>({});

export interface AccessProps {
    children?: AccessRenderFunc;
}

export const Access = (props: AccessProps) => {
    return (
        <Context.Consumer>
        {
            ({store: hub}) => {
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
            ({store}) => {
                const { from: on, defaultValue, children } = props;
                store.on<T>(on, value => {
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

export interface StoreProps {
    store?: DataStore;
    storeRef?: StoreRefCallback;
    children?: ReactElement<any>[];
}

export const Store = (props: StoreProps) => {
    const { store: state = new DataStore(), storeRef, children } = props;
    storeRef && storeRef(state);
    return (
        <Context.Provider value={{ store: state }}>
            {children}
        </Context.Provider>
    )
}

export interface SetProps {
    key: string;
    value: any;
    delayMs?: number;
}

export const StoreWrite = (props: SetProps) => {
    return (
        <Context.Consumer>
        {
            ({store}) => {
                const { key, value, delayMs = -1 } = props;
                if (typeof delayMs === 'number' && delayMs > -1) {
                    setTimeout(() => store.set(key, value), delayMs);
                } else {
                    store.set(key, value);
                }
                return null;
            }
        }
        </Context.Consumer>
    )
}