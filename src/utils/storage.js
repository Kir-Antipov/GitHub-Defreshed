import { bindAndConvertToAsync } from "./convert-to-async";

/**
 * @typedef {object} StorageLike
 * An object that allows to store data in itself.
 *
 * @property {(name: string, value: object) => Promise<void>} setItem
 * Sets the value of the pair identified by key to value.
 *
 * @property {(name: string) => Promise<object>} getItem
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
    async setItem(name, value) {
        await this.storage.setItem(name, JSON.stringify(value));
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
    async getItem(name) {
        let item = await this.storage.getItem(name);
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
    async setItem(name, value) {
        this.storage[name] = value;
    }

    /** @inheritdoc */
    async getItem(name) {
        return this.storage[name];
    }
}

/**
 * @extends {StorageLike}
 */
class ExtensionStorage {
    constructor(api) {
        this.storage = api.storage.sync || api.storage.local;
    }

    /** @inheritdoc */
    async setItem(name, value) {
        await bindAndConvertToAsync(this.storage, this.storage.set, { [name]: value });
    }

    /** @inheritdoc */
    async getItem(name) {
        return await bindAndConvertToAsync(this.storage, this.storage.get, name).then(x => (x || {})[name]);
    }
}

/**
 * Returns the most suitable storage-like object.
 *
 * @returns {StorageLike} Storage-like object.
 */
function getAvailableStorage() {
    return  typeof browser != "undefined" && new ExtensionStorage(browser) || // eslint-disable-line no-undef
            typeof chrome != "undefined" && new ExtensionStorage(chrome) || // eslint-disable-line no-undef
            window.localStorage ||
            window.sessionStorage ||
            new ObjectStorage({});
}

/**
 * Storage where data can be stored.
 */
export const storage = new StorageWrapper(getAvailableStorage());

export default storage;