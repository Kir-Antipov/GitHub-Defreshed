import navigate from "../tools/navigate";
import { isGitHub } from "../tools/host-detector";
import Fixer from "./fixer";

export default class WindowPopstateFixer extends Fixer {
    apply() {
        window.onpopstate = function (e) {
            if (isGitHub(document.location.href))
                navigate(document.location.href, false);
            else
                window.location.href = document.location.href;
        };
    }
}