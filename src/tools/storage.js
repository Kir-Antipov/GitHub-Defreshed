class StorageWrapper {
    constructor(storage) {
        this.storage = storage;
    }

    setItem(name, value) {
        this.storage.setItem(name, JSON.stringify(value));
    }

    getItem(name) {
        let item = this.storage.getItem(name);
        if (typeof item != "string")
            return null;
        return JSON.parse(item);
    }
}

class ObjectStorage {
    constructor(storage) {
        this.storage = storage;
    }

    setItem(name, value) {
        this.storage[name] = value;
    }

    getItem(name) {
        return this.storage[name];
    }
}

function getAvailableStorage() {
    return  window.localStorage || 
            window.sessionStorage ||
            new ObjectStorage({});
}

const storage = new StorageWrapper(getAvailableStorage()); 

export default storage;