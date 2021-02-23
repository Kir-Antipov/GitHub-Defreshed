import { isRepoSetup } from "@utils/page-detector";
import settings from "@utils/settings";
import { waitUntilElementsReady } from "@utils/wait-until-ready";
import Fixer from "@fixers/fixer";

/**
 * Changes default name of the main branch name
 * to a user-specified one.
 */
export default class MainBranchNameFixer extends Fixer {
    isApplieble() {
        return isRepoSetup();
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) git-clone-help");
    }

    async apply() {
        const helpElement = document.querySelector("main:nth-child(1) git-clone-help");
        const patterns = new Map([
            [`-M ${settings.mainBranchName.defaultValue}`, `-M ${await settings.mainBranchName.getValue()}`],
            [`origin ${settings.mainBranchName.defaultValue}`, `origin ${await settings.mainBranchName.getValue()}`],
        ]);
        const hints = [...helpElement.querySelectorAll("span")].filter(x => (x.innerText || "").trim());
        for (const hint of hints) {
            for (const pattern of patterns) {
                hint.innerText = hint.innerText.replace(pattern[0], pattern[1]);
            }
        }
    }
}