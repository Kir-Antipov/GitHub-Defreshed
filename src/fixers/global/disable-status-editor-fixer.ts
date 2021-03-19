import { checkIfElementsReady } from "@utils/wait-until-ready";
import settings from "@utils/settings";
import Fixer from "@fixers/fixer";

/**
 * Disables the status editor.
 */
export default class DisableStatusEditorFixer extends Fixer {
    isApplieble() {
        return settings.disableUserStatus.getValue();
    }

    waitUntilFixerReady() {
        return checkIfElementsReady(".js-user-status-details include-fragment");
    }

    apply() {
        for (const statusDetails of document.querySelectorAll(".js-user-status-details")) {
            for (const fragment of statusDetails.querySelectorAll("include-fragment")) {
                fragment.remove();
            }
        }
    }

}
