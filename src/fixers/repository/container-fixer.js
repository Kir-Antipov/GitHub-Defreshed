import { isRepo, isProject } from "../../tools/path-detector";
import { waitUntilEntriesReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

/**
 * Changes container size.
 */
export default class ContainerFixer extends Fixer {
    /** @inheritdoc */
    isApplieble(location) {
        return isRepo(location) && !isProject(location);
    }

    /** @inheritdoc */
    waitUntilFixerReady() {
        return waitUntilEntriesReady("main:nth-child(1) .container-xl");
    }

    /** @inheritdoc */
    apply() {
        document.querySelector("main .container-xl").className = "container-lg clearfix new-discussion-timeline px-3";
    }
}