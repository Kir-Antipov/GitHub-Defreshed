import { isRepo } from "../tools/path-detector";
import Fixer from "./fixer";

export default class ContainerFixer extends Fixer {
    isApplieble(_, __, location) {
        return isRepo(location);
    }

    apply(_document) {
        _document.querySelector(".container-xl").className = "container-lg clearfix new-discussion-timeline px-3";
    }
}