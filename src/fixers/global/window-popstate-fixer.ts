import navigate from "@utils/navigate";
import { isGitHub } from "@utils/host-detector";
import { isRepo, isAnchor } from "@utils/path-detector";
import Fixer from "@fixers/fixer";

/**
 * Fixes popstate logic.
 */
export default class WindowPopstateFixer extends Fixer {
    apply() {
        window.onpopstate = function () {
            const link = document.location.href;
            if (isGitHub(link) && isRepo(link) && !isAnchor(link)) {
                navigate(link, false);
            }
            else {
                window.location.href = document.location.href;
            }
        };
    }
}