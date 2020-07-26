import storage from "./storage";

class SettingsProperty {
    constructor(name, title, description, defaultValue) {
        this.name = name;
        this.title = title;
        this.description = description;
        this.defaultValue = defaultValue;
        Object.freeze(this);
    }

    get value() {
        let value = storage.getItem(this.name)
        if (value === null || value === undefined)
            return this.defaultValue;
        return value;
    }

    set value(value) {
        if (typeof value != typeof this.defaultValue || Array.isArray(value) != Array.isArray(this.defaultValue))
            throw new Error("Invalid type.");
        storage.setItem(this.name, value);
    }
}

let settings = [
    new SettingsProperty("useCSS", "Use old css styles", "This will revert old css styles where it's possible. For example, it will unround edges of avatars and containers.", true),
    new SettingsProperty("defreshProfilePage", "Defresh profile page", "This will roll back the changes to the profile page interface.", true),
    new SettingsProperty("keepProfilePageIcons", "Don't remove tab icons on the profile page", "If you want to keep tab icons on the profile page, enable this option.", false),
    new SettingsProperty("defreshProfilePageUserStatus", "Defresh status appearance on the profile page", "If you prefer the way the status looked before, then this options is for you.", true),
];

for (let property of [...settings])
    settings[property.name] = property;

export default settings; 