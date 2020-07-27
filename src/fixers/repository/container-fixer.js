import { isRepo, isProject } from "../../tools/path-detector";
import { waitUntilElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

export default class ContainerFixer extends Fixer {
    isApplieble(location) {
        return isRepo(location) && !isProject(location);
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) .container-xl");
    }

    apply() {
        [...document.querySelectorAll("main:nth-child(1) .container-xl")].forEach(x => x.className = "container-lg clearfix new-discussion-timeline px-3");
    }
}