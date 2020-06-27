import { isRepoRoot } from "../tools/path-detector";
import waitUntilReady from "../tools/wait-until-ready";
import Fixer from "./fixer";

export default class ColumnsFixer extends Fixer {
    isApplieble(location) {
        return isRepoRoot(location);
    }

    waitUntilFixerReady() {
        return waitUntilReady(".flex-shrink-0.col-12.col-md-3");
    }

    apply() {
        let repositoryContent = document.querySelector(".repository-content");
        let inner = document.querySelector(".flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0");
        let gutter = document.querySelector(".gutter-condensed.gutter-lg.d-flex.flex-column.flex-md-row");

        repositoryContent.append(...inner.children);
        gutter.parentElement.removeChild(gutter);
    }
}