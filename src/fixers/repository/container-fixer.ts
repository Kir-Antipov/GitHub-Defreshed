import { isRepo, isProject } from "@utils/path-detector";
import { is404 } from "@utils/page-detector";
import { waitUntilEntriesReady } from "@utils/wait-until-ready";
import Fixer from "@fixers/fixer";

/**
 * Changes container size.
 */
export default class ContainerFixer extends Fixer {
    isApplieble(location: string) {
        return isRepo(location) && !isProject(location) && !is404();
    }

    waitUntilFixerReady() {
        return waitUntilEntriesReady("main:nth-child(1) .container-xl");
    }

    apply() {
        const container = document.querySelector("main .container-xl");
        container.className = "container-lg clearfix px-3";
    }
}