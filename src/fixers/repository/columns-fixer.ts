import { isRepoRoot, isRepoSetup } from "@utils/path-detector";
import { waitUntilElementsReady } from "@utils/wait-until-ready";
import Fixer from "@fixers/fixer";

/**
 * Moves all content from the goddamn columns to the
 * .repository-content container.
 */
export default class ColumnsFixer extends Fixer {
    isApplieble(location: string) {
        return isRepoRoot(location) && !isRepoSetup();
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