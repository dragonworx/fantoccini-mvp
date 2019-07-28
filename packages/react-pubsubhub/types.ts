import { ReactElement } from 'react';

export type AccessRenderFunc = (store: DataStore) => ReactElement;
export type ReadRenderFunc<T> = (value: T) => ReactElement;
export type StoreRefCallback = (store: DataStore) => void;
export type DataStoreListenerHandler<T> = (value: T) => void;

export interface DataStoreListener {
    key: string;
    handler: DataStoreListenerHandler<any>;
}

export type PlainObject = { [key: string]: any };

export class DataStore {
    state: PlainObject = {};
    listeners: DataStoreListener[] = [];

    on<T>(pattern: string, handler: DataStoreListenerHandler<T>) {
        this.listeners.push({
            key: pattern,
            handler,
        });
    }

    set<T>(key: string, value: T) {
        console.log(`"${key}"`, value);
        this.state[key] = value;
        const { listeners } = this;
        const l = listeners.length;
        for (let i = 0; i < l; i++) {
            const listener = listeners[i];
            if (key === listener.key) {
                listener.handler(value);
            }
        }
    }

    get<T>(key: string, defaultValue?: T): T {
        const value = this.state[key] as T;
        return value === undefined ? defaultValue : value;
    }
}
