import { isRepo } from "../../utils/path-detector";
import { waitUntilEntriesReady } from "../../utils/wait-until-ready";
import Fixer from "../fixer";

/**
 * Waits for the git-clone-help to load.
 */
export default class HelpFixer extends Fixer {
    /** @inheritdoc */
    isApplieble(location) {
        return isRepo(location);
    }

    /** @inheritdoc */
    waitUntilFixerReady() {
        return waitUntilEntriesReady("main:nth-child(1) div.repository-content > :first-child");
    }
}