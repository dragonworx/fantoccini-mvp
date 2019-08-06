const log = console.log;

export const getPath = (key: string, path?: string) => path ? `${path}.${key as string}` : key;

export const isObject = (source: any) => (typeof source === 'object' && source !== null)
    && source.constructor && (source.constructor === Object || typeof source.constructor === 'function');

export const isArray = Array.isArray;

export const ArrayMembers = {
    Accessors: [
        'length',
        'concat',
        'includes',
        'indexOf',
        'join',
        'lastIndexOf',
        'slice',
        'toSource',
        'toString',
        'toLocaleString',
    ],
    Iterators: [
        'entries',
        'every',
        'filter',
        'find',
        'findIndex',
        'forEach',
        'keys',
        'map',
        'reduce',
        'reduceRight',
        'some',
        'values',
    ],
    Mutators: [
        'copyWithin',
        'fill',
        'pop',
        'push',
        'reverse',
        'shift',
        'sort',
        'splice',
        'unshift',
    ]
}

export type ListenerHandler = (target: any, path: string, value: any, context: ProxyRootContext) => any;

export type ListenerType = 'get' | 'set' | 'mutate';

export interface ListenerRef {
    type: ListenerType;
    path: string;
    handler: ListenerHandler;
}

export class ProxyRootContext {
    id: number;
    listeners: {[key: string]: ListenerRef[]} = {
        'get': [],
        'set': [],
        'mutate': [],
    };
    captureGetters: boolean = false;
    accessedGetters: string[] = [];

    constructor(readonly root: any) {
        this.id = contextId++;
    }

    addListener(type: ListenerType, path: string, handler: ListenerHandler) {
        this.listeners[type].push({
            type,
            path,
            handler,
        });
    }
    
    removeListener(type: ListenerType, handler: ListenerHandler) {
        const array = this.listeners[type];
        const ref = array.find((ref, i) => ref.handler === handler);
        if (ref) {
            const index = array.indexOf(ref);
            array.splice(index, 1);
            return;
        }
    }

    dispatch(type: ListenerType, target: any, path: string, value?: any) {
        const array = this.listeners[type];
        array.forEach(ref => ref.handler(target, path, value, this));
    }

    onGet(target: any, path: string) {
        // log({ type: 'get', path, target});
        if (this.captureGetters) {
            if (this.accessedGetters.indexOf(path) === -1) {
                this.accessedGetters.push(path);
            }
        }
    }

    onSet(target: any, path: string, value: any) {
        // log({ type: 'set', path, value, target});
        this.dispatch('set', target, path, value);
    }

    onMutate(target: any, path: string) {
        // log({ type: 'mutate', path, target});
        this.dispatch('mutate', target, path);
    }

    beginCaptureGetters() {
        this.accessedGetters.length = 0;
        this.captureGetters = true;
    }

    endCaptureGetters() {
        this.captureGetters = false;
    }
}

export interface ProxyContext<T> {
    value: T;
    context: ProxyRootContext;
}

let contextId = 0;

export function wrapProxy<T>(source: T, path?: string, context?: ProxyRootContext): ProxyContext<T> {
    log('proxy!', source)
    const src = source as any;

    if (!context) {
        context = new ProxyRootContext(source);
    }

    if (isArray(source)) {
        /** array value */
    } else if (isObject(source)) {
        /** object value */
    } else {
        /** literal value */
        return {
            value: source,
            context,
        };
    }

    const sourceProxy: T = new Proxy(src, {
        get(target, key, receiver) {
            const typeofKey = typeof key;
            key = key as string;
            const subPath = getPath(key, path);
            let value = src[key];
            // if (isArray(value) || isObject(value)) {
            //     const proxyContext = wrapProxy(value, subPath, context);
            //     value = proxyContext.value;
            // }
            context.onGet(subPath, value);
            if (isArray(target) && (ArrayMembers.Mutators.indexOf(key) > -1) || (typeofKey === 'number')) {
                context.onMutate(target, subPath);
            }
            return value;
        },
        set(target, key, value, receiver) {
            const subPath = getPath(key as string, path);
            src[key] = value;
            context.onSet(target, subPath, value);
            context.onMutate(target, subPath);
            return true;
        }
    });

    return {
        value: sourceProxy,
        context,
    };
}

export function proxy(source: any) {
    return wrapProxy(source).value;
}

(window as any).proxy = proxy;