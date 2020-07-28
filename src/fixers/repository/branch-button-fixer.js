import { isRepoRoot, isRepoTree, isSingleFile } from "../../tools/path-detector";
import createElement from "../../tools/create-element";
import { waitUntilElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

export default class BranchButtonFixer extends Fixer {
    isApplieble(location) {
        return isRepoRoot(location) || isRepoTree(location) || isSingleFile(location);
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) #branch-select-menu", "main:nth-child(1) #branch-select-menu span.css-truncate-target");
    }

    apply() {
        let button = document.querySelector("#branch-select-menu");
        
        let menu = button.querySelector("details-menu");
        let src = menu && menu.getAttribute("src");
        let fragment = button.querySelector("include-fragment");
        fragment && fragment.setAttribute("src", src);

        let branchName = button.querySelector("span.css-truncate-target");
        branchName.parentElement.insertBefore(createElement("i", {
            className: "d-none d-lg-inline",
            innerText: "Branch: "
        }), branchName);
    }
}