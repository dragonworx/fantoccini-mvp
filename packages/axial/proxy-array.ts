import { Proxy } from './proxy-object';

const Proto = Array.prototype;

export class ProxyArray<T> {
    constructor(
        private readonly proxy: Proxy<any>, 
        private readonly key: string, 
        private readonly array: any[],
    ) 
    { }

    private updateProxySetter() {
        this.proxy.onSet(this.key, this);
    }

    private updateProxyGetter() {
        this.proxy.onGet(this.key);
    }

    get length() {
        this.updateProxyGetter();
        return this.array.length;
    }

    set length(value: number) {
        this.array.length = value;
        this.updateProxySetter();
    }

    /** Sugar */

    add(...args: any[]) {
        return this.push(...args);
    }

    remove(...args: any[]) {
        let i = 0;
        const array = this.array;
        for (let i = 0; i < args.length; i++) {
            const index = array.indexOf(args[i]);
            if (index > -1) {
                array.splice(index, 1);
            }
        }
        this.updateProxySetter();
    }

    clear() {
        this.length = 0;
    }

    get(index: number): T {
        const item = this.array[index];
        this.updateProxyGetter();
        return item as T;
    }

    set(index: number, item: T) {
        this.array[index] = item;
        this.updateProxySetter();
    }

    compact() {
        const {array} = this;
        for (let i = 0; i < array.length; i++) {
            const item = array[i];
            while (!item && (item !== false)) {
                array.splice(i, 1);
            }
        }
        this.updateProxySetter();
    }

    /** Accessors  */

    concat(...args: any[]) {
        this.updateProxyGetter();
        return Proto.concat.apply(this.array, args);
    }

    // includes(...args: any[]) {
    //     this.updateProxyGetter();
    //     return Proto.includes.apply(this.array, args);
    // }

    indexOf(...args: any[]) {
        this.updateProxyGetter();
        return Proto.indexOf.apply(this.array, args);
    }

    join(...args: any[]) {
        this.updateProxyGetter();
        return Proto.join.apply(this.array, args);
    }

    lastIndexOf(...args: any[]) {
        this.updateProxyGetter();
        return Proto.lastIndexOf.apply(this.array, args);
    }

    slice(...args: any[]) {
        this.updateProxyGetter();
        return Proto.slice.apply(this.array, args);
    }

    // toSource(...args: any[]) {
    //     this.updateProxyGetter();
    //     return Proto.toSource.apply(this.array, args);
    // }

    toString(...args: any[]) {
        this.updateProxyGetter();
        return Proto.toString.apply(this.array, args);
    }

    toLocaleString(...args: any[]) {
        this.updateProxyGetter();
        return Proto.toLocaleString.apply(this.array, args);
    }

    /** Iterators */

    entries(...args: any[]) {
        this.updateProxyGetter();
        return Proto.entries.apply(this.array, args);
    }

    every(...args: any[]) {
        this.updateProxyGetter();
        return Proto.every.apply(this.array, args);
    }

    filter(...args: any[]) {
        this.updateProxyGetter();
        return Proto.filter.apply(this.array, args);
    }

    find(...args: any[]) {
        this.updateProxyGetter();
        return Proto.find.apply(this.array, args);
    }

    findIndex(...args: any[]) {
        this.updateProxyGetter();
        return Proto.findIndex.apply(this.array, args);
    }

    forEach(...args: any[]) {
        this.updateProxyGetter();
        return Proto.forEach.apply(this.array, args);
    }

    keys(...args: any[]) {
        this.updateProxyGetter();
        return Proto.keys.apply(this.array, args);
    }

    map(...args: any[]) {
        this.updateProxyGetter();
        return Proto.map.apply(this.array, args);
    }

    reduce(...args: any[]) {
        this.updateProxyGetter();
        return Proto.reduce.apply(this.array, args);
    }

    reduceRight(...args: any[]) {
        this.updateProxyGetter();
        return Proto.reduceRight.apply(this.array, args);
    }

    some(...args: any[]) {
        this.updateProxyGetter();
        return Proto.some.apply(this.array, args);
    }

    values(...args: any[]) {
        this.updateProxyGetter();
        return Proto.values.apply(this.array, args);
    }

    /** Mutators */

    copyWithin(...args: any[]) {
        this.updateProxyGetter();
        const result = Proto.copyWithin.apply(this.array, args);
        this.updateProxySetter();
        return result;
    }

    fill(...args: any[]) {
        this.updateProxyGetter();
        const result = Proto.fill.apply(this.array, args);
        this.updateProxySetter();
        return result;
    }

    pop(...args: any[]) {
        this.updateProxyGetter();
        const result =  Proto.pop.apply(this.array, args);
        this.updateProxySetter();
        return result;
    }

    push(...args: any[]) {
        this.updateProxyGetter();
        const result = Proto.push.apply(this.array, args);
        this.updateProxySetter();
        return result;
    }

    reverse(...args: any[]) {
        this.updateProxyGetter();
        const result = Proto.reverse.apply(this.array, args);
        this.updateProxySetter();
        return result;
    }

    shift(...args: any[]) {
        this.updateProxyGetter();
        const result = Proto.shift.apply(this.array, args);
        this.updateProxySetter();
        return result;
    }

    sort(...args: any[]) {
        this.updateProxyGetter();
        const result = Proto.sort.apply(this.array, args);
        this.updateProxySetter();
        return result;
    }

    splice(...args: any[]) {
        this.updateProxyGetter();
        const result = Proto.splice.apply(this.array, args);
        this.updateProxySetter();
        return result;
    }

    unshift(...args: any[]) {
        this.updateProxyGetter();
        const result = Proto.unshift.apply(this.array, args);
        this.updateProxySetter();
        return result;
    }
}

export type AxialArray = [] | ProxyArray<any>;

export function array<T>(array: any[]) {
    return array as unknown as ProxyArray<T>;
}