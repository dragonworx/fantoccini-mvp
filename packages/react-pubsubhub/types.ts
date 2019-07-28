import { ReactElement } from 'react';

export type PlainObject = { [key: string]: any };

export type Handler = (key: string, value: any) => void;

export interface Listener {
    key: string;
    handler: Handler;
}

export type ListenerHook = (key: string, handler: Handler) => void;

export function proxy<T extends PlainObject>(source: T) {
    const clone = {} as any;
    const listeners: Listener[] = [];
    const addListener: ListenerHook = (key: string, handler: Handler) => {
        console.log("__ADDLISTENER", key);
        listeners.push({key, handler});
        const count = listeners.filter(listener => listener.key === key).length;
        console.log(count);
    };
    const removeListener: ListenerHook = (key: string, handler: Handler) => {
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            if (listener.key === key && listener.handler === handler) {
                listeners.splice(i, 1);
                console.log("__REMOVELISTENER", key);
                return;
            }
        }
    };
    for (let key in source) {
        Object.defineProperty(clone, key, {
            get() {
                const value = source[key];
                console.log("__GET", key, value);
                (clone as ProxyState).__lastGet = key;
                return value;
            },
            set(value: any) {
                source[key] = value;
                console.log("__SET", key, value);
                listeners.forEach(listener => (listener.key === key) && listener.handler(key, value))
            }
        })
    }
    (clone as ProxyState).__addListener = addListener;
    (clone as ProxyState).__removeListener = removeListener;
    return clone as T;
}

export interface ProxyState {
    __addListener: ListenerHook;
    __removeListener: ListenerHook;
    __lastGet?: string;
}