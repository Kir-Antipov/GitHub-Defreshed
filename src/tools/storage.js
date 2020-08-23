/**
 * @typedef {object} StorageLike
 * An object that allows to store data in itself.
 * 
 * @property {(name: string, value: object) => void} setItem
 * Sets the value of the pair identified by key to value.
 * 
 * @property {(name: string) => object} getItem
 * Returns the current value associated with the given key.
*/

/**
 * Unificates of the behavior of objects
 * that have getItem and setItem methods.
 */
class StorageWrapper {
    /**
     * Сonstructor a new instance of the StorageWrapper class.
     * 
     * @param {StorageLike} storage The storage-like object.
     */
    constructor(storage) {
        this.storage = storage;
    }

    /**
     * Sets the value of the pair identified by key to value.
     * 
     * @param {string} name The key. 
     * @param {*} value The value.
     */
    setItem(name, value) {
        this.storage.setItem(name, JSON.stringify(value));
    }

    /**
     * Returns the current value associated with the given key,
     * or null if the given key does not exist.
     * 
     * @param {string} name The key.
     * 
     * @returns {object} The current value associated with
     * the given key, or null if the given key does not exist.
     */
    getItem(name) {
        let item = this.storage.getItem(name);
        if (typeof item != "string")
            return null;
        return JSON.parse(item);
    }
}

/**
 * @extends {StorageLike}
 */
class ObjectStorage {
    constructor(storage) {
        this.storage = storage;
    }

    /** @inheritdoc */
    setItem(name, value) {
        this.storage[name] = value;
    }
    
    /** @inheritdoc */
    getItem(name) {
        return this.storage[name];
    }
}

/**
 * Returns the most suitable storage-like object.
 * 
 * @returns {StorageLike} Storage-like object.
 */
function getAvailableStorage() {
    return  window.localStorage || 
            window.sessionStorage ||
            new ObjectStorage({});
}

/**
 * Storage where data can be stored.
 */
export const storage = new StorageWrapper(getAvailableStorage()); 

export default storage;