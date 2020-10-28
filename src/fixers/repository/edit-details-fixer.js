import { isRepoRoot, isRepoSetup } from "../../tools/path-detector";
import { waitUntilElementsReady, checkIfElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

/**
 * Moves repository's details editor to the top section.
 */
export default class EditDetailsFixer extends Fixer {
    /** @inheritdoc */
    isApplieble(location) {
        return isRepoRoot(location) && !isRepoSetup(location);
    }

    /** @inheritdoc */
    async waitUntilFixerReady() {
        return  (await waitUntilElementsReady("main:nth-child(1) .repository-content .BorderGrid-row")) &&
                (await checkIfElementsReady("main:nth-child(1) .repository-content .BorderGrid-row:nth-child(1) details"));
    }

    /** @inheritdoc */
    apply() {
        let details = document.querySelector("main .repository-content .BorderGrid-row:nth-child(1) details");
        if (details)
            document.querySelector("main .repository-content").prepend(details);
    }
}