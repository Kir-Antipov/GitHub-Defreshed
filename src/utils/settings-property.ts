import storage from "@utils/storage";

/**
 * Represents property of the script settings.
 */
 export default class SettingsProperty<TValue = unknown> implements PromiseLike<TValue> {
    name: string;
    title: string;
    description: string;
    defaultValue: TValue;
    options?: TValue[];

    constructor(name: string, title: string, description: string, defaultValue: TValue, options: TValue[] = null) {
        if (options && !options.includes(defaultValue) && !options.includes(null)) {
            throw new RangeError("defaultValue should be in the list of available options.");
        }
        this.name = name;
        this.title = title;
        this.description = description;
        this.defaultValue = defaultValue;
        this.options = options;
        Object.freeze(this);
    }

    /**
     * Gets property value.
     */
    async getValue() {
        const value = await storage.getItem<TValue>(this.name);
        if (value === null || value === undefined) {
            return this.defaultValue;
        }
        return value;
    }

    /**
     * Sets property value.
     */
    async setValue(value: TValue) {
        if (typeof value !== typeof this.defaultValue || Array.isArray(value) !== Array.isArray(this.defaultValue)) {
            throw new Error("Invalid type.");
        }
        if (this.options && !this.options.includes(value) && !this.options.includes(null)) {
            throw new RangeError("value should be in the list of available options.");
        }

        await storage.setItem(this.name, value);
    }

    /**
     * Attaches callbacks for the resolution and/or rejection of the value.
     * @param onfulfilled The callback to execute when the value is resolved.
     * @param onrejected The callback to execute when the value is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TFulfilledResult = TValue, TRejectedResult = never>(onfulfilled?: (value: TValue) => TFulfilledResult | PromiseLike<TFulfilledResult>, onrejected?: (reason: any) => TRejectedResult | PromiseLike<TRejectedResult>) {
        return this.getValue().then(onfulfilled, onrejected);
    }
}
