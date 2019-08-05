import { set } from 'axial-store';
import { ProxyArray } from './proxy-array';

export type ProxyListener<T> = (key: string, value: T) => void;
export type PlainObject = {[key: string]: any};

export class Proxy<T extends PlainObject> {
    state: T;
    listeners: Map<string, ProxyListener<any>[]> = new Map;
    captureGetters: boolean = false;
    accessedGetters: string[] = [];

    constructor(source: T, readonly root?: Proxy<any>) {
        const values = {
            ...source,
        } as PlainObject;
        const clone = {} as T;
        const { onGet, onSet } = this;
    
        for (let key in values) {
            const value = values[key];
            if (Array.isArray(value)) {
                const proxyArray = new ProxyArray(this, key, value);
                values[key] = proxyArray;
            } else if (typeof value === 'object' && value !== null) {
                values[key] = new Proxy(value, root || this);
            }
            Object.defineProperty(clone, key, {
                get() {
                    const value = values[key];
                    onGet(key);
                    root && root.onGet(key);
                    return value;
                },
                set(value: any) {
                    values[key] = value;
                    onSet(key, value);
                    root && root.onSet(key, value);
                }
            });
        }
    
        this.state = clone;
        set(clone, this);
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