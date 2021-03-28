import storage from "@utils/storage";
import config from "@config";
import Engine from "@utils/engine";
import ReadmeHeaderType from "./readme-header-type";

/**
 * Represents property of the script settings.
 */
export class SettingsProperty<TValue = unknown> implements PromiseLike<TValue> {
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

/**
 * Represents script settings.
 */
class Settings extends Array<SettingsProperty> {
    useOldCSS = new SettingsProperty("useOldCSS", "Use old css styles", "This will revert old css styles where it's possible. For example, it will unround edges of avatars and containers.", true);
    enableLightHeader = new SettingsProperty("enableLightHeader", "Enable light header", "Some folks are nostalgic for the days when the GitHub header was light. This option is specifically for them.", false);
    usePreloader = new SettingsProperty("usePreloader", "Use preloader", "This will activate preloader during script initialization (first load of any GitHub page) to make the load look way smoother.", true);
    defreshProfilePage = new SettingsProperty("defreshProfilePage", "Defresh profile page", "This will roll back the changes of the profile page interface.", true);
    removeThemeSelector = new SettingsProperty("removeThemeSelector", "Remove theme selector from the profile page", "This will remove the theme selector from your profile page. (Why in the world is it here?)", true);
    keepProfilePageIcons = new SettingsProperty("keepProfilePageIcons", "Don't remove tab icons on the profile page", "If you want to keep tab icons on the profile page, enable this option.", false);
    defreshProfilePageUserStatus = new SettingsProperty("defreshProfilePageUserStatus", "Defresh status appearance on the profile page", "If you prefer the way the status looked before, then this option's for you.", true);
    disableUserStatus = new SettingsProperty("disableUserStatus", "Disable the status editor on the profile page", "Don't even try to ask. But if you will, here's the answer: I use one password manager, which is good at everything, but, for some reason, it's not friendly to the status editor: it makes the UI freeze for a couple of seconds. So, here we go...", false);
    jumpToTop = new SettingsProperty("jumpToTop", "Jump to the page's top after loading", "If you want to preserve the scroll position after page load, you can disable this option.", true);
    treatTagsAsReleases = new SettingsProperty("treatTagsAsReleases", "Treat tags as releases", "Some repositories only use pre-releases, which aren't displayed as regular releases by GitHub, so without using this option you'll see 0 as the number of releases.", true);
    openLanguagesByDefault = new SettingsProperty("openLanguagesByDefault", "Open language bar by default", "This option allows you to change the default state of the language bar.", false);
    showLatestReleasePopup = new SettingsProperty("showLatestReleasePopup", "Show information about the latest release", "This will show information about the latest release (if any) when hovering over the releases section.", true);
    readmeHeaderType = new SettingsProperty("readmeHeaderType", "Readme header's type", `"${ReadmeHeaderType.New}" represents the latest header design.\n"${ReadmeHeaderType.CombinedNew}" represents the latest header design, but with a book octicon in use.\n"${ReadmeHeaderType.CombinedOld}" represents an old school design, but with the new functionality.\n"${ReadmeHeaderType.Old}" represents an old school design.`, ReadmeHeaderType.CombinedOld, [ReadmeHeaderType.New, ReadmeHeaderType.CombinedNew, ReadmeHeaderType.CombinedOld, ReadmeHeaderType.Old]);
    mainBranchName = new SettingsProperty("mainBranchName", "Main branch name", "Here you can specify default name of the main branch.", "main");
    engine = new SettingsProperty("engine", `Engine that powers ${config.displayName}`, `"${Engine.Original}" engine completely replaces the GitHub navigation system with dynamic page loading.\n"${Engine.Pjax}" engine was designed to be compatible with other scripts/extensions (e.g. "Refined GitHub") and is based on listening for pjax events.`, Engine.Pjax, [Engine.Original, Engine.Pjax]);

    constructor() {
        super();
        for (const value of Object.values(this)) {
            this.push(value);
        }
    }
}

/**
 * Script settings.
 */
export const settings = new Settings();

export default settings;