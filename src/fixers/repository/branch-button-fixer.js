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
        let btn = document.querySelector("#branch-select-menu span.css-truncate-target");
        btn.parentElement.insertBefore(createElement("i", {
            className: "d-none d-lg-inline",
            innerText: "Branch: "
        }), btn);
    }
}