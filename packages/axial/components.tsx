import * as React from 'react';
import { ReactElement, useState, useEffect } from 'react';
import { set, get } from 'axial-store';
import { wrapProxy, ProxyContext, ProxyRootContext } from './proxy';

export type ScopeRenderFn<T> = (state: T) => ReactElement;

export interface StateProps<T> {
    defaults?: T;
    state?: ProxyContext<T>;
    stateRef?: (state: T) => void;
    stateId?: string;
    children?: ScopeRenderFn<T>;
}

export const State = function State<T>(props: StateProps<T>) {
    const { children,defaults, stateRef, stateId, state } = props;
    const [ value, setValue ] = useState(null);
    const [ , forceUpdate ] = useState(0);

    const handler = (target: any, path: string, value: any, context: ProxyRootContext) => {
        forceUpdate(Math.random());
    };

    useEffect(() => {
        let proxyContext: ProxyContext<T>;
        if (state) {
            proxyContext = state;
        } else {
            proxyContext = wrapProxy(defaults);
            if (stateId) {
                set(stateId, proxyContext);
            }
        }
        setValue(proxyContext);
        stateRef && stateRef(proxyContext.value);
    }, []);

    useEffect(() => {
        return () => {
            if (!value) {
                return;
            }
            const proxyContext = value as ProxyContext<T>;
            proxyContext.context.removeListener('mutate', handler);
        }
    });

    if (!value) {
        return null;
    }

    const proxy = value as ProxyContext<T>;
    proxy.context.beginCaptureGetters();
    const result = (children as ScopeRenderFn<T>)(proxy.value as T);
    proxy.context.endCaptureGetters();
    proxy.context.accessedGetters.forEach(key => {
        proxy.context.addListener('set', key, handler);
    })

    return result;
}

export interface ScopeProps {
    stateId: string;
    children?: (state: unknown) => ReactElement;
}

export const Scope = (props: ScopeProps) => {
    const state = get(props.stateId) as ProxyContext<any>;
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