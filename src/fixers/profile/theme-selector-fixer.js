import { isProfile } from "../../utils/path-detector";
import { waitUntilElementsReady, checkIfElementsReady } from "../../utils/wait-until-ready";
import settings from "../../utils/settings";
import Fixer from "../fixer";

/**
 * Removes theme selector from the profile page.
 */
export default class ThemeSelectorFixer extends Fixer {
    /** @inheritdoc */
    async isApplieble(location) {
        return await settings.defreshProfilePage.getValue() && await settings.removeThemeSelector.getValue() && isProfile(location);
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