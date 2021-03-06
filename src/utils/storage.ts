import { bindAndConvertToAsync } from "@utils/convert-to-async";

/**
 * An object that allows to store data in itself.
 */
interface StorageLike {
    /**
     * Sets the value of the pair identified by key to value.
     */
    setItem<T = unknown>(name: string, value: T): Promise<void>;

    /**
     * Returns the current value associated with the given key.
     */
    getItem<T = unknown>(name: string): Promise<T>;
}

interface WebExtensionStorageSource {
    sync?: WebExtensionStorage;
    local: WebExtensionStorage;
}

interface WebExtensionStorage {
    set: Function;
    get: Function;
}

interface WebAPI {
    storage: WebExtensionStorageSource;
}

function isValidWebAPI(api: WebAPI) {
    return api.storage && !!(api.storage.sync || api.storage.local);
}

declare const browser: WebAPI;
declare const chrome: WebAPI;

/**
 * Unificates of the behavior of objects
 * that have getItem and setItem methods.
 */
class StorageWrapper {
    storage: StorageLike;

    constructor(storage: StorageLike) {
        this.storage = storage;
    }

    /**
     * Sets the value of the pair identified by key to value.
     */
    async setItem<T = unknown>(name: string, value: T) {
        await this.storage.setItem(name, JSON.stringify(value));
    }

    /**
     * Returns the current value associated with the given key,
     * or null if the given key does not exist.
     */
    async getItem<T = unknown>(name: string) {
        const item = await this.storage.getItem(name);
        if (typeof item != "string") {
            return null;
        }

        return JSON.parse(item) as T;
    }
}

class ObjectStorage implements StorageLike {
    storage: Record<string, any>;

    constructor(storage: Record<string, any>) {
        this.storage = storage;
    }

    async setItem<T = unknown>(name: string, value: T) {
        this.storage[name] = value;
    }

    async getItem<T = unknown>(name: string) {
        return <T>this.storage[name];
    }
}

class ExtensionStorage implements StorageLike {
    storage: WebExtensionStorage;

    constructor(api: WebAPI) {
        this.storage = api.storage.sync || api.storage.local;
    }

    async setItem<T = unknown>(name: string, value: T) {
        await bindAndConvertToAsync<T>(this.storage, this.storage.set, { [name]: value });
    }

    async getItem<T = unknown>(name: string) {
        return await bindAndConvertToAsync(this.storage, this.storage.get, name).then(x => (x || {})[name] as T);
    }
}

/**
 * Returns window storage if it's available.
 */
function getWindowStorage(type: "local" | "session") {
    try {
        return window[type + "Storage"] as StorageLike;
    } catch {
        return null;
    }
}

/**
 * Returns the most suitable storage-like object.
 */
function getAvailableStorage(): StorageLike {
    return (
        typeof browser != "undefined" && isValidWebAPI(browser) && new ExtensionStorage(browser) ||
        typeof chrome != "undefined" && isValidWebAPI(chrome) && new ExtensionStorage(chrome) ||
        getWindowStorage("local") ||
        getWindowStorage("session") ||
        new ObjectStorage({})
    );
}

/**
 * Storage where data can be stored.
 */
export const storage = new StorageWrapper(getAvailableStorage());

export default storage;