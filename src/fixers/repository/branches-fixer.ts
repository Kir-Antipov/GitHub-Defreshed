import { isRepoRoot, isRepoTree, isSingleFile } from "@utils/path-detector";
import { is404, isRepoSetup } from "@utils/page-detector";
import { waitUntilElementsReady } from "@utils/wait-until-ready";
import Fixer from "@fixers/fixer";

/**
 * Waits for the list of repository branches to be loaded.
 */
export default class BranchesFixer extends Fixer {
    isApplieble(location: string) {
        return (
            (isRepoRoot(location) || isRepoTree(location) || isSingleFile(location)) &&
            !(isRepoSetup() || is404())
        );
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) #ref-list-branches");
    }
}