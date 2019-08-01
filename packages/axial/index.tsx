import * as React from 'react';
import { ReactElement, useState, useEffect } from 'react';
import { registerItem, getItem } from 'axial-store';

export type ScopeRenderFn<T> = (state: T) => ReactElement;
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

    /** Accessors  */

    concat(...args: any[]) {
        this.updateProxyGetter();
        return super.concat.apply(this, args);
    }

    // includes(...args: any[]) {
    //     this.updateProxyGetter();
    //     return super.includes.apply(this, args);
    // }

    indexOf(...args: any[]) {
        this.updateProxyGetter();
        return super.indexOf.apply(this, args);
    }

    join(...args: any[]) {
        this.updateProxyGetter();
        return super.join.apply(this, args);
    }

    lastIndexOf(...args: any[]) {
        this.updateProxyGetter();
        return super.lastIndexOf.apply(this, args);
    }

    slice(...args: any[]) {
        this.updateProxyGetter();
        return super.slice.apply(this, args);
    }

    // toSource(...args: any[]) {
    //     this.updateProxyGetter();
    //     return super.toSource.apply(this, args);
    // }

    toString(...args: any[]) {
        this.updateProxyGetter();
        return super.toString.apply(this, args);
    }

    toLocaleString(...args: any[]) {
        this.updateProxyGetter();
        return super.toLocaleString.apply(this, args);
    }

    /** Iterators */

    entries(...args: any[]) {
        this.updateProxyGetter();
        return super.entries.apply(this, args);
    }

    every(...args: any[]) {
        this.updateProxyGetter();
        return super.every.apply(this, args);
    }

    filter(...args: any[]) {
        this.updateProxyGetter();
        return super.filter.apply(this, args);
    }

    find(...args: any[]) {
        this.updateProxyGetter();
        return super.find.apply(this, args);
    }

    findIndex(...args: any[]) {
        this.updateProxyGetter();
        return super.findIndex.apply(this, args);
    }

    forEach(...args: any[]) {
        this.updateProxyGetter();
        return super.forEach.apply(this, args);
    }

    keys(...args: any[]) {
        this.updateProxyGetter();
        return super.keys.apply(this, args);
    }

    map(...args: any[]) {
        this.updateProxyGetter();
        return super.map.apply(this, args);
    }

    reduce(...args: any[]) {
        this.updateProxyGetter();
        return super.reduce.apply(this, args);
    }

    reduceRight(...args: any[]) {
        this.updateProxyGetter();
        return super.reduceRight.apply(this, args);
    }

    some(...args: any[]) {
        this.updateProxyGetter();
        return super.some.apply(this, args);
    }

    values(...args: any[]) {
        this.updateProxyGetter();
        return super.values.apply(this, args);
    }

    /** Mutators */

    copyWithin(...args: any[]) {
        this.updateProxyGetter();
        const result = super.copyWithin.apply(this, args);
        this.updateProxySetter();
        return result;
    }

    fill(...args: any[]) {
        this.updateProxyGetter();
        const result = super.fill.apply(this, args);
        this.updateProxySetter();
        return result;
    }

    pop(...args: any[]) {
        this.updateProxyGetter();
        const result =  super.pop.apply(this, args);
        this.updateProxySetter();
        return result;
    }

    push(...args: any[]) {
        this.updateProxyGetter();
        const result = super.push.apply(this, args);
        this.updateProxySetter();
        return result;
    }

    reverse(...args: any[]) {
        this.updateProxyGetter();
        const result = super.reverse.apply(this, args);
        this.updateProxySetter();
        return result;
    }

    shift(...args: any[]) {
        this.updateProxyGetter();
        const result = super.shift.apply(this, args);
        this.updateProxySetter();
        return result;
    }

    sort(...args: any[]) {
        this.updateProxyGetter();
        const result = super.sort.apply(this, args);
        this.updateProxySetter();
        return result;
    }

    splice(...args: any[]) {
        this.updateProxyGetter();
        const result = super.splice.apply(this, args);
        this.updateProxySetter();
        return result;
    }

    unshift(...args: any[]) {
        this.updateProxyGetter();
        const result = super.unshift.apply(this, args);
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

function getProxy<T>(id: string): Proxy<T> | undefined {
    return getItem(id) as Proxy<T>;
}

export function getState<T>(id: string): T | undefined {
    const proxy = getProxy<T>(id);
    return proxy.state;
}

function createState<T>(id: string = 'default', defaults: T): T {
    const proxy = new Proxy(defaults);
    registerItem(id, proxy);
    return proxy.state;
}

export interface StateProps<T> {
    id: string;
    children?: ScopeRenderFn<T>;
}

interface StateComponent {
    createState: <T>(id: string, defaults: T) => T;
}

function State<T>(props: StateProps<T>) {
    const { children, id: from } = props;
    const [ , setValue ] = useState(0);

    const handler = (key: string, value: any) => {
        setValue(value + 1);
    };

    const proxy = getProxy<T>(from);

    useEffect(() => {
        return () => {
            proxy.removeListener(handler);
        }
    });

    proxy.beginCaptureGetters();
    const result = (children as ScopeRenderFn<T>)(proxy.state);
    proxy.endCaptureGetters();
    proxy.accessedGetters.forEach(key => {
        proxy.addListener(key, handler);
    });
    return result;
}

State.createState = createState;

export {
    State
}

/**
 * TODO:
 * create Collection & Hash proxy versions of array and Map
 * that way API can be controlled with get/set needs
 * safer than 98% parity from existing ProxyArray?
 */