import * as React from 'react';
import { ReactElement, useState, useEffect } from 'react';
import { set, get } from 'axial-store';
import { wrapProxy, ProxyContext } from './proxy';

export type ScopeRenderFn<T> = (state: T) => ReactElement;

export interface StateProps<T> {
    defaults?: T;
    state?: T;
    stateRef?: (state: T) => void;
    stateId?: string;
    children?: ScopeRenderFn<T>;
}

export const State = function State<T>(props: StateProps<T>) {
    const { children, state: propState, defaults, stateRef, stateId } = props;
    const [ value, setValue ] = useState(null);
    const [ , forceUpdate ] = useState(0);

    const handler = (k: string, v: any) => {
        forceUpdate(Math.random());
    }

    useEffect(() => {
        let proxy: ProxyContext<T>;
        let state: T;
        if (propState) {
            proxy = get(propState) as Proxy<T>;
        } else {
            proxy = new Proxy(defaults);
            state = proxy.state;
            if (stateId) {
                set(stateId, state);
            }
        }
        setValue(proxy);
        stateRef && stateRef(state);
    }, []);

    useEffect(() => {
        return () => {
            if (!value) {
                return;
            }
            const proxy = value as Proxy<T>;
            proxy.removeListener(handler);
        }
    });

    if (!value) {
        return null;
    }

    const proxy = value as Proxy<T>;
    proxy.beginCaptureGetters();
    const result = (children as ScopeRenderFn<T>)(proxy.state as T);
    proxy.endCaptureGetters();
    proxy.accessedGetters.forEach(key => {
        proxy.addListener(key, handler);
    })

    return result;
}

export interface ScopeProps {
    stateId: string;
    children?: (state: unknown) => ReactElement;
}

export const Scope = (props: ScopeProps) => {
    const state = get(props.stateId);
    if (state) {
        return (
            <State state={state}>
                {
                    state => props.children(state)
                }
            </State>
        )
    }
    return null;
}