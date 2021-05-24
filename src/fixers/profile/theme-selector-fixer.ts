import { isProfile } from "@utils/path-detector";
import { is404, isOrganizationPage } from "@utils/page-detector";
import { waitUntilElementsReady } from "@utils/wait-until-ready";
import settings from "@utils/settings";
import Fixer from "@fixers/fixer";

/**
 * Removes theme selector from the profile page.
 */
export default class ThemeSelectorFixer extends Fixer {
    async isApplieble(location: string) {
        return (
            await settings.defreshProfilePage &&
            await settings.removeThemeSelector &&
            isProfile(location) &&
            !(isOrganizationPage() || is404())
        );
    }

    async waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) nav");
    }

    apply() {
        const tabs = document.querySelector("main:nth-child(1) nav");
        if (tabs && tabs.nextElementSibling) {
            tabs.nextElementSibling.remove();
        }
    }
}