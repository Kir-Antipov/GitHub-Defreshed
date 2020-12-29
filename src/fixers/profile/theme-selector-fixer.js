import { isProfile } from "../../tools/path-detector";
import { waitUntilElementsReady, checkIfElementsReady } from "../../tools/wait-until-ready";
import settings from "../../tools/settings";
import Fixer from "../fixer";

/**
 * Removes theme selector from the profile page.
 */
export default class ThemeSelectorFixer extends Fixer {
    /** @inheritdoc */
    isApplieble(location) {
        return settings.defreshProfilePage.value && settings.removeThemeSelector.value && isProfile(location);
    }

    /** @inheritdoc */
    async waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) nav");
    }

    /** @inheritdoc */
    apply() {
        let tabs = document.querySelector("main:nth-child(1) nav");
        if (tabs && tabs.nextElementSibling)
            tabs.nextElementSibling.remove();
    }
}