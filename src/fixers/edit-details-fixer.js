import { isRepoRoot } from "../tools/path-detector";
import Fixer from "./fixer";

export default class EditDetailsFixer extends Fixer {
    isApplieble(_, __, location) {
        return isRepoRoot(location);
    }

    apply(_document) {
        let details = _document.querySelector(".flex-shrink-0.col-12.col-md-3 details");
        if (details)
            _document.querySelector(".repository-content").prepend(details);
    }
}