import { isRepo } from "../tools/path-detector";
import waitUntilReady from "../tools/wait-until-ready";
import Fixer from "./fixer";

export default class ContainerFixer extends Fixer {
    isApplieble(location) {
        return isRepo(location);
    }

    waitUntilFixerReady() {
        return waitUntilReady("main:nth-child(1) .container-xl");
    }

    apply() {
        document.querySelector(".container-xl").className = "container-lg clearfix new-discussion-timeline px-3";
    }
}