import { isRepoRoot } from "@utils/path-detector";
import { is404, isRepoSetup } from "@utils/page-detector";
import { waitUntilElementsReady } from "@utils/wait-until-ready";
import Fixer from "@fixers/fixer";

/**
 * Moves all content from the goddamn columns to the
 * .repository-content container.
 */
export default class ColumnsFixer extends Fixer {
    isApplieble(location: string) {
        return isRepoRoot(location) && !isRepoSetup() && !is404();
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) .repository-content");
    }

    apply() {
        const repositoryContent = document.querySelector(".repository-content");
        const gutter = repositoryContent.querySelector(".Layout--sidebarPosition-end");
        const inner = gutter.firstElementChild;

        repositoryContent.append(...inner.children);
        gutter.parentElement.removeChild(gutter);
    }
}