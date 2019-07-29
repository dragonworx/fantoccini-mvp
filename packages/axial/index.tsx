import * as React from 'react';
import { ReactElement, createContext, useState, useEffect } from 'react';

export type ConsumerRenderFn<T> = (state: T) => ReactElement;
export type PlainObject = { [key: string]: any };
export type Getter = (key: string) => void;
export type Setter = (key: string, value: any) => void;
export type ProxyListener = (value: any) => void;

export type ArrayIteratorFn = (item: any, i: number, array: Array<any>) => any;


export class Collection<T> {
    items: T[] = [];
    private _proxy?: Proxy<any>;
    private _key?: string;

    constructor(array: Array<T> = []) {
        this.items.push.apply(this.items, array);
    }

    get length() {
        return this.items.length;
    }

    private updateProxy() {
        if (this._proxy) {
            this._proxy.onSet(this._key, this);
        }
    }

    setProxy(key: string, proxy: Proxy<any>) {
        this._key = key;
        this._proxy = proxy;
    }

    add(item: T) {
        this.items.push(item);
        this.updateProxy();
    }

    map(fn: ArrayIteratorFn) {
        return this.items.map(fn);
    }

    clear() {
        this.items.length = 0;
        this.updateProxy();
    }
}

export class Proxy<T extends PlainObject> {
    state: T;
    listeners: Map<string, ProxyListener[]> = new Map;
    captureGetters: boolean = false;
    accessedGetters: string[] = [];

    constructor(source: T) {
        const values = {
            ...source,
        } as PlainObject;
        const clone = {} as T;
        const { onGet, onSet } = this;
    
        for (let key in values) {
            const value = values[key];
            if (Array.isArray(value)) {
                const array = value as Array<any>;
                const nativePush = array.push;
                array.push = (...args) => {
                    const returnValue = nativePush.apply(array, args);
                    this.onSet(key, array);
                    return returnValue;
                };
            } else if (value instanceof Collection) {
                (value as Collection<any>).setProxy(key, this);
            }
            Object.defineProperty(clone, key, {
                get() {
                    const value = values[key];
                    onGet(key);
                    return value;
                },
                set(value: any) {
                    values[key] = value;
                    onSet(key, value);
                }
            });
        }
    
        this.state = clone;
    }

    onGet = (key: string) => {
        if (this.captureGetters) {
            if (this.accessedGetters.indexOf(key) === -1) {
                this.accessedGetters.push(key);
            }
        }
    };

    onSet = (key: string, value: any) => {
        const { listeners } = this;
        if (listeners.get(key)) {
            listeners.get(key).forEach(handler => handler(value));
        }
    };

    addListener(key: string, handler: ProxyListener) {
        const { listeners } = this;
        if (!listeners.get(key)) {
            listeners.set(key, []);
        }
        listeners.get(key).push(handler);
    }

    removeListener(handler: ProxyListener) {
        const { listeners } = this;
        for (var [, array] of listeners) {
            if (array) {
                const index = array.indexOf(handler);
                if (index > -1) {
                    array.splice(index, 1);
                    return;
                }
            }
        }
    }

    beginCaptureGetters() {
        this.accessedGetters.length = 0;
        this.captureGetters = true;
    }

    endCaptureGetters() {
        this.captureGetters = false;
    }
}

export const Context = createContext<Proxy<any>>(null);

export interface StoreProps<T> {
    defaults: T;
    children?: any;
}

function Provider<T>(props: StoreProps<T>) {
    const { defaults, children } = props;
    const proxy = new Proxy(defaults);
    (window as any).state = proxy.state;
    return (
        <Context.Provider value={proxy}>
            {children}
        </Context.Provider>
    )
}

export interface ConsumerProps<T> {
    children?: ConsumerRenderFn<T>;
}

function Consumer<T>(props: ConsumerProps<T>) {
    const { children } = props;
    const [ value, setValue ] = useState(0);

    const handler = (v: any) => {
        setValue(value + 1);
    };

    let proxyRef: Proxy<T>;

    useEffect(() => {
        return () => {
            proxyRef.removeListener(handler);
        }
    });

    return (
        <Context.Consumer>
            {
                proxy => {
                    proxyRef = proxy;
                    proxy.beginCaptureGetters();
                    const result = (children as ConsumerRenderFn<T>)(proxy.state);
                    proxy.endCaptureGetters();
                    proxy.accessedGetters.forEach(key => {
                        proxy.addListener(key, handler);
                    });
                    return result;
                }
            }
        </Context.Consumer>
    );
}

export const Axial = {
    Provider,
    Consumer,
};