import { isRepoRoot, isRepoTree, isSingleFile } from "@utils/path-detector";
import { is404, isRepoSetup } from "@utils/page-detector";
import { waitUntilElementsReady } from "@utils/wait-until-ready";
import BranchLabel from "@components/repository/branch-label";
import Fixer from "@fixers/fixer";

/**
 * Adds "Branch: " label to the branch name.
 */
export default class BranchButtonFixer extends Fixer {
    isApplieble(location: string) {
        return (
            (isRepoRoot(location) || isRepoTree(location) || isSingleFile(location)) &&
            !(isRepoSetup() || is404())
        );
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady(
            "main:nth-child(1) #branch-select-menu",
            "main:nth-child(1) #branch-select-menu span.css-truncate-target",
        );
    }

    apply() {
        const button = document.querySelector("#branch-select-menu");

        const branchName = button.querySelector("span.css-truncate-target");
        branchName.parentElement.insertBefore(<BranchLabel/>, branchName);
    }
}