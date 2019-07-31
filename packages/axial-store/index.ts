const store: Map<string, any> = new Map;

export function registerItem(id: string, item: any) {
    if (store.has(id)) {
        throw new Error(`Register failed. Item exists "${id}"`);
    }
    store.set(id, item);
}

export function getItem(id: string) {
    if (!store.has(id)) {
        throw new Error(`Get failed. Item not found "${id}"`);
    }
    return store.get(id);
}

export function removeItem(id: string) {
    if (!store.has(id)) {
        throw new Error(`Remove failed. Item not found "${id}"`);
    }
    store.delete(id);
}

export function renameItem(id: string, newId: string) {
    if (!store.has(id)) {
        throw new Error(`Rename failed. Item not found "${id}"`);
    }
    store.set(newId, store.get(id));
    store.delete(id);
}