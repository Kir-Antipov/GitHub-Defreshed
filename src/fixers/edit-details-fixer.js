import { isRepoRoot } from "../tools/path-detector";
import Fixer from "./fixer";

export default class EditDetailsFixer extends Fixer {
    isApplieble(location) {
        return isRepoRoot(location);
    }

    apply() {
        let details = document.querySelector(".flex-shrink-0.col-12.col-md-3 details");
        if (details)
            document.querySelector(".repository-content").prepend(details);
    }
}