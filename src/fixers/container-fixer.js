import { isRepo, isProject } from "../tools/path-detector";
import waitUntilReady from "../tools/wait-until-ready";
import Fixer from "./fixer";

export default class ContainerFixer extends Fixer {
    isApplieble(location) {
        return isRepo(location) && !isProject(location);
    }

    waitUntilFixerReady() {
        return waitUntilReady("main:nth-child(1) .container-xl");
    }

    apply() {
        [...document.querySelectorAll("main .container-xl")].forEach(x => x.className = "container-lg clearfix new-discussion-timeline px-3");
    }
}