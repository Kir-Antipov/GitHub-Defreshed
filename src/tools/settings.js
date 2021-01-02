import storage from "./storage";

/**
 * Represents property of the script settings.
 *
 * @template Value
 */
export class SettingsProperty {

    /**
     * Represents property of the script settings.
     *
     * @param {string} name Property name.
     * @param {string} title Property title (short description).
     * @param {string} description Property description.
     * @param {Value} defaultValue Property's default value.
     */
    constructor(name, title, description, defaultValue) {
        this.name = name;
        this.title = title;
        this.description = description;
        this.defaultValue = defaultValue;
        Object.freeze(this);
    }

    /**
     * Gets property value.
     * @returns {Promise<Value>} value
     */
    async getValue() {
        let value = await storage.getItem(this.name);
        if (value === null || value === undefined)
            return this.defaultValue;
        return value;
    }

    /**
     * Sets property value.
     * @param {Value} value
     */
    async setValue(value) {
        if (typeof value != typeof this.defaultValue || Array.isArray(value) != Array.isArray(this.defaultValue))
            throw new Error("Invalid type.");

        await storage.setItem(this.name, value);
    }
}

/**
 * @typedef {object} Settings
 * Represents script settings.
 *
 * @property {SettingsProperty<boolean>} useOldCSS
 * Use old css styles.
 *
 * @property {SettingsProperty<boolean>} usePreloader
 * Use preloader.
 *
 * @property {SettingsProperty<boolean>} defreshProfilePage
 * Defresh profile page.
 *
 * @property {SettingsProperty<boolean>} removeThemeSelector
 * Remove theme selector from the profile page.
 *
 * @property {SettingsProperty<boolean>} keepProfilePageIcons
 * Don't remove tab icons on the profile page.
 *
 * @property {SettingsProperty<boolean>} defreshProfilePageUserStatus
 * Defresh status appearance on the profile page.
 *
 * @property {SettingsProperty<boolean>} jumpToTop
 * Jump to the page's top after loading.
 *
 * @property {SettingsProperty<boolean>} treatTagsAsReleases
 * Treat tags as releases.
 *
 * @property {SettingsProperty<boolean>} openLanguagesByDefault
 * Open language bar by default.
 *
 * @property {SettingsProperty<boolean>} showLatestReleasePopup
 * Show information about the latest release.
 *
 * @property {SettingsProperty<string>} mainBranchName
 * Main branch name.
*/

/**
 * Script settings.
 *
 * @type {Settings & SettingsProperty[]}
 */
export const settings = [
    new SettingsProperty("useOldCSS", "Use old css styles", "This will revert old css styles where it's possible. For example, it will unround edges of avatars and containers.", true),
    new SettingsProperty("usePreloader", "Use preloader", "This will activate preloader during script initialization (first load of any GitHub page) to make the load look way smoother.", true),
    new SettingsProperty("defreshProfilePage", "Defresh profile page", "This will roll back the changes of the profile page interface.", true),
    new SettingsProperty("removeThemeSelector", "Remove theme selector from the profile page", "This will remove the theme selector from your profile page. (Why in the world is it here?)", true),
    new SettingsProperty("keepProfilePageIcons", "Don't remove tab icons on the profile page", "If you want to keep tab icons on the profile page, enable this option.", false),
    new SettingsProperty("defreshProfilePageUserStatus", "Defresh status appearance on the profile page", "If you prefer the way the status looked before, then this option's for you.", true),
    new SettingsProperty("jumpToTop", "Jump to the page's top after loading", "If you want to preserve the scroll position after page load, you can disable this option.", true),
    new SettingsProperty("treatTagsAsReleases", "Treat tags as releases", "Some repositories only use pre-releases, which aren't displayed as regular releases by GitHub, so without using this option you'll see 0 as the number of releases.", true),
    new SettingsProperty("openLanguagesByDefault", "Open language bar by default", "This option allows you to change the default state of the language bar.", false),
    new SettingsProperty("showLatestReleasePopup", "Show information about the latest release", "This will show information about the latest release (if any) when hovering over the releases section.", true),
    new SettingsProperty("mainBranchName", "Main branch name", "Here you can specify default name of the main branch.", "main")
];
for (let property of [...settings])
    settings[property.name] = property;

export default settings;