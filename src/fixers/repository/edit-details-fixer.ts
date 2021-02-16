import { isRepoRoot, isRepoSetup } from "@utils/path-detector";
import { waitUntilElementsReady, checkIfElementsReady } from "@utils/wait-until-ready";
import Fixer from "@fixers/fixer";

/**
 * Moves repository's details editor to the top section.
 */
export default class EditDetailsFixer extends Fixer {
    isApplieble(location: string) {
        return isRepoRoot(location) && !isRepoSetup();
    }

    async waitUntilFixerReady() {
        return (
            await waitUntilElementsReady("main:nth-child(1) .repository-content .BorderGrid-row") &&
            await checkIfElementsReady("main:nth-child(1) .repository-content .BorderGrid-row:nth-child(1) details")
        );
    }

    apply() {
        const details = document.querySelector("main .repository-content .BorderGrid-row:nth-child(1) details");
        if (details) {
            document.querySelector("main .repository-content").prepend(details);
        }
    }
}