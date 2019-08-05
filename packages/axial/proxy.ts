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

export type Listener = (target: any, path: string, value: any, context: ProxyRootContext) => any;
export interface ListenerRef {
    listener: Listener;
    type: 'get' | 'set' | 'mutate';
}

export class ProxyRootContext {
    id: number;
    listeners: ListenerRef[] = [];

    constructor(readonly root: any) {
        this.id = contextId++;
    }

    addListener(type: 'get' | 'set' | 'mutate', listener: Listener) {
        this.listeners.push({
            listener,
            type,
        });
    }

    dispatch(target: any, path: string, value?: any) {

    }

    onGet(target: any, path: string) {
        
    }

    onSet(target: any, path: string, value: any) {
        
    }

    onMutate(target: any, path: string) {
        
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
            const proxyContext = wrapProxy(src[key], subPath, context);
            context.onGet(subPath, proxyContext.value);
            if (isArray(target) && (ArrayMembers.Mutators.indexOf(key) > -1) || (typeofKey === 'number')) {
                context.onMutate(target, subPath);
            }
            return proxyContext.value;
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