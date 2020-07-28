import { isRepoRoot } from "../../tools/path-detector";
import { waitUntilElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

export default class ColumnsFixer extends Fixer {
    isApplieble(location) {
        return isRepoRoot(location);
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) .repository-content");
    }

    apply() {
        let repositoryContent = document.querySelector(".repository-content");
        let gutter = repositoryContent.querySelector(".gutter-condensed");
        let inner = gutter.firstElementChild;

        repositoryContent.append(...inner.children);
        gutter.parentElement.removeChild(gutter);
    }
}