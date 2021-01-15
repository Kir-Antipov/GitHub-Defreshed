import { isRepoRoot, isRepoSetup } from "../../utils/path-detector";
import { waitUntilElementsReady } from "../../utils/wait-until-ready";
import Fixer from "../fixer";

/**
 * Moves all content from the goddamn columns to the
 * .repository-content container.
 */
export default class ColumnsFixer extends Fixer {
    /** @inheritdoc */
    isApplieble(location) {
        return isRepoRoot(location) && !isRepoSetup(location);
    }

    /** @inheritdoc */
    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) .repository-content");
    }

    /** @inheritdoc */
    apply() {
        let repositoryContent = document.querySelector(".repository-content");
        let gutter = repositoryContent.querySelector(".gutter-condensed");
        let inner = gutter.firstElementChild;

        repositoryContent.append(...inner.children);
        gutter.parentElement.removeChild(gutter);
    }
}