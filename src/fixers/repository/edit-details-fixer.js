import { isRepoRoot } from "../../tools/path-detector";
import { waitUntilElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

export default class EditDetailsFixer extends Fixer {
    isApplieble(location) {
        return isRepoRoot(location);
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady({ 
            selectors: ["main:nth-child(1) .flex-shrink-0.col-12.col-md-3 details"],
            timeout: 300
         });
    }

    apply() {
        let details = document.querySelector(".flex-shrink-0.col-12.col-md-3 details");
        if (details)
            document.querySelector(".repository-content").prepend(details);
    }
}