const map: Map<any, any> = new Map;

export function has(key: any) {
    return map.has(key);
}

export function set(key: any, value: any) {
    map.set(key, value);
}

export function get(key: any) {
    return map.get(key);
}

export function remove(key: any) {
    map.delete(key);
}

export function rename(oldKey: any, newKey: any) {
    map.set(newKey, map.get(oldKey));
    map.delete(oldKey);
}