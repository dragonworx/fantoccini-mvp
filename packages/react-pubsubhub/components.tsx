import * as React from 'react';
import { ReactElement, useState, createContext, useEffect  } from 'react';

import {
    proxy,
    ProxyState,
} from './types';

export const Context = createContext<unknown>(undefined);

// /** State */

export type StateRenderFunc<T> = (state: T) => ReactElement;

export interface StateProps {
    children?: StateRenderFunc<any>;
}

export function State(props: StateProps) {
    return (
        <Context.Consumer>
        {
            (state) => {
                const { children } = props;
                if (!children) {
                    return null;
                }
                return children(state);
            }
        }
        </Context.Consumer>
    )
}

// /** Read */

export type ReadRenderFunc<T> = (value: T) => ReactElement;
export type FromDescriptor<T> = (state: any) => T;

export interface ReadProps {
    from: FromDescriptor<any>;
    children?: ReadRenderFunc<any>;
}

export const Read = (props: ReadProps) => {
    const [ value, setValue ] = useState();
    let proxyState: ProxyState;
    const handler = (k: string, v: any) => {
        setValue(v);
    };

    useEffect(() => {
        const { from } = props;
        from(proxyState);
        const key = proxyState.__lastGet;
        proxyState.__addListener(key, handler);
        return () => {
            proxyState.__removeListener(key, handler);
        }
    })

    return (
        <Context.Consumer>
        {
            state => {
                proxyState = state as ProxyState;
                const { children } = props;
                if (!children || value === undefined) {
                    return null;
                }
                return children(value);
            }
        }
        </Context.Consumer>
    )
};

/** Store */

export type StateRefCallback<T> = (state: T) => void;

export interface StoreProps<T> {
    defaults: T;
    stateRef?: StateRefCallback<T>;
    children?: any;
}

// export const Store = (props: StoreProps) => {
export function Store<T>(props: StoreProps<T>) {
    const { stateRef, children, defaults } = props;
    const state = proxy(defaults);
    console.log(state);
    stateRef && stateRef(state);
    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    )
}

// export interface StoreWriteProps {
//     key: string;
//     value: any;
//     delayMs?: number;
// }

// export const StoreWrite = (props: StoreWriteProps) => {
//     return (
//         <Context.Consumer>
//         {
//             ({store}) => {
//                 const { key, value, delayMs = -1 } = props;
//                 if (typeof delayMs === 'number' && delayMs > -1) {
//                     setTimeout(() => store.set(key, value), delayMs);
//                 } else {
//                     store.set(key, value);
//                 }
//                 return null;
//             }
//         }
//         </Context.Consumer>
//     )
// }