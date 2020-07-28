import { isRepoRoot, isRepoTree, isSingleFile } from "../../tools/path-detector";
import { waitUntilElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

export default class BranchesFixer extends Fixer {
    isApplieble(location) {
        return isRepoRoot(location) || isRepoTree(location) || isSingleFile(location);
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) #ref-list-branches");
    }
}