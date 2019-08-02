const map: Map<any, any> = new Map;

export function set(key: any, value: any) {
    if (map.has(key)) {
        throw new Error(`Register failed. Item exists "${key}"`);
    }
    map.set(key, value);
}

export function get(key: any) {
    if (!map.has(key)) {
        throw new Error(`Get failed. Item not found "${key}"`);
    }
    return map.get(key);
}

export function remove(key: any) {
    if (!map.has(key)) {
        throw new Error(`Remove failed. Item not found "${key}"`);
    }
    map.delete(key);
}

export function rename(oldKey: any, newKey: any) {
    if (!map.has(oldKey)) {
        throw new Error(`Rename failed. Item not found "${oldKey}"`);
    }
    map.set(newKey, map.get(oldKey));
    map.delete(oldKey);
}