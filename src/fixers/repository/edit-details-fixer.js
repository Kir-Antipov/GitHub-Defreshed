import { isRepoRoot } from "../../tools/path-detector";
import { waitUntilElementsReady, checkIfElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

export default class EditDetailsFixer extends Fixer {
    isApplieble(location) {
        return isRepoRoot(location);
    }

    async waitUntilFixerReady() {
        return  (await waitUntilElementsReady("main:nth-child(1) .repository-content .BorderGrid-row")) && 
                (await checkIfElementsReady("main:nth-child(1) .repository-content .BorderGrid-row:nth-child(1) details"));
    }

    apply() {
        let details = document.querySelector("main .repository-content .BorderGrid-row:nth-child(1) details");
        if (details)
            document.querySelector("main .repository-content").prepend(details);
    }
}