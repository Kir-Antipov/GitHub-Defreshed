import { isRepo } from "../tools/path-detector";
import Fixer from "./fixer";

export default class ContainerFixer extends Fixer {
    isApplieble(location) {
        return isRepo(location);
    }

    apply() {
        document.querySelector(".container-xl").className = "container-lg clearfix new-discussion-timeline px-3";
    }
}