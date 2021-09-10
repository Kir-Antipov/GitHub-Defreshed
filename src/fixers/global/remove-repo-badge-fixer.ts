import { checkIfElementsReady } from "@utils/wait-until-ready";
import settings from "@utils/settings";
import Fixer from "@fixers/fixer";
import AllowedRepoBadges from "@utils/allowed-repo-badges";

/**
 * Removes unnecessary repo badges.
 */
export default class RemoveRepoBadgeFixer extends Fixer {
    async isApplieble() {
        return await settings.allowedRepoBadges !== AllowedRepoBadges.All;
    }

    waitUntilFixerReady() {
        return checkIfElementsReady("main");
    }

    async apply() {
        const removeAll = await settings.allowedRepoBadges === AllowedRepoBadges.None;
        for (const label of document.querySelectorAll<HTMLSpanElement>("span.Label.Label--secondary")) {
            const labelText = label.innerText.trim();
            if (labelText === "Public" || removeAll && labelText === "Private") {
                label.remove();
            }
        }
    }

}
