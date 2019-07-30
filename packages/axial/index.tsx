import * as React from 'react';
import { ReactElement, createContext, useState, useEffect } from 'react';

export type StateRenderFn<T> = (state: T) => ReactElement;
export type PlainObject = { [key: string]: any };
export type Getter = (key: string) => void;
export type Setter = (key: string, value: any) => void;
export type ProxyListener<T> = (key: string, value: T) => void;

export type ArrayIteratorFn = (item: any, i: number, array: any[]) => any;

export class ProxyArray<T> extends Array<T> {
    proxy: Proxy<any>;
    key: string;

    constructor(...items: any[]) {
        super(...items);
        Object.setPrototypeOf(this, Object.create(ProxyArray.prototype));
    }

    private updateProxySetter() {
        this.proxy.onSet(this.key, this);
    }

    private updateProxyGetter() {
        this.proxy.onGet(this.key);
    }

    get count() {
        this.updateProxyGetter();
        return this.length;
    }

    init(proxy: Proxy<any>, key: string) {
        this.proxy = proxy;
        this.key = key;
    }

    set count(value: number) {
        this.length = value;
        this.updateProxySetter();
    }

    map(...args: any[]) {
        this.updateProxyGetter();
        return super.map.apply(this, args);
    }

    find(...args: any[]) {
        this.updateProxyGetter();
        return super.find.apply(this, args);
    }

    filter(...args: any[]) {
        this.updateProxyGetter();
        return super.filter.apply(this, args);
    }

    push(...args: any[]) {
        this.updateProxyGetter();
        const result = super.push.apply(this, args);
        this.updateProxySetter();
        return result;
    }

    pop(...args: any[]) {
        this.updateProxyGetter();
        const result =  super.pop.apply(this, args);
        this.updateProxySetter();
        return result;
    }

    splice(...args: any[]) {
        this.updateProxyGetter();
        const result = super.splice.apply(this, args);
        this.updateProxySetter();
        return result;
    }
}

export interface AxialArray<T> extends Array<T> {
    count?: number;
}

export class Proxy<T extends PlainObject> {
    state: T;
    listeners: Map<string, ProxyListener<any>[]> = new Map;
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
                const proxyArray = new ProxyArray(value);
                proxyArray.init(this, key);
                values[key] = proxyArray;
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
            listeners.get(key).forEach(handler => handler(key, value));
        }
    };

    addListener(key: string, handler: ProxyListener<any>) {
        const { listeners } = this;
        if (!listeners.get(key)) {
            listeners.set(key, []);
        }
        listeners.get(key).push(handler);
    }

    removeListener(handler: ProxyListener<any>) {
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

export interface ScopeProps<T> {
    children?: any;
}

export interface StateProps<T> {
    children?: StateRenderFn<T>;
}

export function createScope<T>(defaults: T) {
    
    const Context = createContext<Proxy<any>>(null);

    function Scope<T>(props: ScopeProps<T>) {
        const { children } = props;
        const proxy = new Proxy(defaults);
        (window as any).state = proxy.state;
        return (
            <Context.Provider value={proxy}>
                {children}
            </Context.Provider>
        )
    }

    function State<T>(props: StateProps<T>) {
        const { children } = props;
        const [ , setValue ] = useState(0);

        const handler = (key: string, value: any) => {
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
                        const result = (children as StateRenderFn<T>)(proxy.state);
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

    return [Scope, State];
}