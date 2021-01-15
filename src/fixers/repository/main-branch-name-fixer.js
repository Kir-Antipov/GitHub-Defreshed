import { isRepoSetup } from "../../utils/path-detector";
import settings from "../../utils/settings";
import { waitUntilElementsReady } from "../../utils/wait-until-ready";
import Fixer from "../fixer";

/**
 * Changes default name of the main branch name
 * to a user-specified one.
 */
export default class MainBranchNameFixer extends Fixer {
    /** @inheritdoc */
    isApplieble(location) {
        return isRepoSetup(location);
    }

    /** @inheritdoc */
    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) git-clone-help");
    }

    /** @inheritdoc */
    async apply() {
        let helpElement = document.querySelector("main:nth-child(1) git-clone-help");
        let patterns = new Map([
            [`-M ${settings.mainBranchName.defaultValue}`, `-M ${await settings.mainBranchName.getValue()}`],
            [`origin ${settings.mainBranchName.defaultValue}`, `origin ${await settings.mainBranchName.getValue()}`]
        ]);
        for (let textContainer of [...helpElement.querySelectorAll("span")].filter(x => (x.innerText || "").trim())) {
            for (let pattern of patterns) {
                textContainer.innerText = textContainer.innerText.replace(pattern[0], pattern[1]);
            }
        }
    }
}