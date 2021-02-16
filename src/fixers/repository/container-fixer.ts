import { isRepo, isProject } from "@utils/path-detector";
import { waitUntilEntriesReady } from "@utils/wait-until-ready";
import Fixer from "@fixers/fixer";

/**
 * Changes container size.
 */
export default class ContainerFixer extends Fixer {
    isApplieble(location: string) {
        return isRepo(location) && !isProject(location);
    }

    waitUntilFixerReady() {
        return waitUntilEntriesReady("main:nth-child(1) .container-xl");
    }

    apply() {
        const container = document.querySelector("main .container-xl");
        container.className = "container-lg clearfix new-discussion-timeline px-3";
    }
}