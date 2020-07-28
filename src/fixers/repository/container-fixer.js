import { isRepo, isProject } from "../../tools/path-detector";
import { waitUntilEntriesReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

export default class ContainerFixer extends Fixer {
    isApplieble(location) {
        return isRepo(location) && !isProject(location);
    }

    waitUntilFixerReady() {
        return waitUntilEntriesReady("main:nth-child(1) .container-xl");
    }

    apply() {
        document.querySelector("main .container-xl").className = "container-lg clearfix new-discussion-timeline px-3";
    }
}