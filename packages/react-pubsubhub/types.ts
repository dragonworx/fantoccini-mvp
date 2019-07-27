import { ReactElement } from 'react';

export type AccessRenderFunc = (state: StateStore) => ReactElement;
export type ReadRenderFunc<T> = (value: T) => ReactElement;
export type StateRefCallback = (state: StateStore) => void;
export type StateListenerHandler<T> = (value: any) => void;

export interface EventQueueOptions {
    autoFlush: boolean;
}

export interface StateListener {
    pattern: string;
    handler: StateListenerHandler<any>;
}

export type PlainObject = { [key: string]: any };

export class StateStore {
    state: PlainObject = {};
    listeners: StateListener[] = [];

    on<T>(pattern: string, handler: StateListenerHandler<T>) {
        this.listeners.push({
            pattern,
            handler,
        });
    }

    set(key: string, value: any) {
        console.log('State.set', key, value);
        this.state[key] = value;
        const { listeners } = this;
        const l = listeners.length;
        for (let i = 0; i < l; i++) {
            const listener = listeners[i];
            if (key === listener.pattern) {
                listener.handler(value);
            }
        }
    }

    get(key: string, defaultValue?: any) {
        const value = this.state[key];
        return value === undefined ? defaultValue : value;
    }
}
