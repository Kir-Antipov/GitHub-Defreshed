import { isRepoRoot } from "../tools/path-detector";
import Fixer from "./fixer";

export default class ColumnsFixer extends Fixer {
    isApplieble(_, __, location) {
        return isRepoRoot(location);
    }

    apply(_document) {
        let repositoryContent = _document.querySelector(".repository-content");
        let inner = _document.querySelector(".flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0");
        let gutter = _document.querySelector(".gutter-condensed.gutter-lg.d-flex.flex-column.flex-md-row");

        repositoryContent.append(...inner.children);
        gutter.parentElement.removeChild(gutter);
    }
}