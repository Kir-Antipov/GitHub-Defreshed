import { isProfileSettings } from "@utils/path-detector";
import { waitUntilElementsReady } from "@utils/wait-until-ready";
import SettingsSection from "@components/settings/settings-section";
import Fixer from "@fixers/fixer";

/**
 * Generates a section with script settings at https://github.com/settings/profile.
 */
export default class ScriptSettingsFixer extends Fixer {
    isApplieble(location: string) {
        return isProfileSettings(location);
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady(".Subhead--spacious");
    }

    apply() {
        const nextTitle = document.querySelector(".Subhead--spacious");
        nextTitle.parentElement.insertBefore(<SettingsSection/>, nextTitle);
    }
}