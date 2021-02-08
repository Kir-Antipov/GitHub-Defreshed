import { isRepo } from "@utils/path-detector";
import { waitUntilEntriesReady } from "@utils/wait-until-ready";
import Fixer from "@fixers/fixer";

/**
 * Waits for the git-clone-help to load.
 */
export default class HelpFixer extends Fixer {
    isApplieble(location: string) {
        return isRepo(location);
    }

    waitUntilFixerReady() {
        return waitUntilEntriesReady("main:nth-child(1) div.repository-content > :first-child");
    }
}