import { isRepoRoot, isRepoSetup, isRepoTree, isSingleFile } from "../../utils/path-detector";
import { waitUntilElementsReady } from "../../utils/wait-until-ready";
import Fixer from "../fixer";

/**
 * Waits for the list of repository branches to be loaded.
 */
export default class BranchesFixer extends Fixer {
    /** @inheritdoc */
    isApplieble(location) {
        return (isRepoRoot(location) || isRepoTree(location) || isSingleFile(location)) && !isRepoSetup(location);
    }

    /** @inheritdoc */
    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) #ref-list-branches");
    }
}