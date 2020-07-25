import navigate from "../../tools/navigate";
import { isGitHub } from "../../tools/host-detector";
import { isRepo, isAnchor } from "../../tools/path-detector";
import Fixer from "../fixer";

export default class WindowPopstateFixer extends Fixer {
    apply() {
        window.onpopstate = function () {
            let link = document.location.href;
            if (isGitHub(link) && isRepo(link) && !isAnchor(link))
                navigate(link, false);
            else
                window.location.href = document.location.href;
        };
    }
}