import { isRepoRoot, isRepoSetup, isRepoTree, isSingleFile } from "../../tools/path-detector";
import { waitUntilElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

/**
 * Adds "Branch: " label to the branch name.
 */
export default class BranchButtonFixer extends Fixer {
    /** @inheritdoc */
    isApplieble(location) {
        return (isRepoRoot(location) || isRepoTree(location) || isSingleFile(location)) && !isRepoSetup(location);
    }

    /** @inheritdoc */
    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) #branch-select-menu", "main:nth-child(1) #branch-select-menu span.css-truncate-target");
    }

    /** @inheritdoc */
    apply() {
        let button = document.querySelector("#branch-select-menu");

        let menu = button.querySelector("details-menu");
        let src = menu && menu.getAttribute("src");
        let fragment = button.querySelector("include-fragment");
        fragment && fragment.setAttribute("src", src);

        let branchName = button.querySelector("span.css-truncate-target");
        branchName.parentElement.insertBefore(<i className="d-none d-lg-inline">Branch: </i>, branchName);
    }
}