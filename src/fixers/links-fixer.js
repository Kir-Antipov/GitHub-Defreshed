import navigate from "../tools/navigate";
import { isSameSiteURL, getAbsoluteURL } from "../tools/host-detector";
import Fixer from "./fixer";

export default class LinksFixer extends Fixer {
    apply() {
        [...document.querySelectorAll("a")]
            .filter(link => isSameSiteURL(link.href))
            .forEach(link => link.addEventListener("click", async function(e) {
                e.stopPropagation();
                e.preventDefault();
                navigate(getAbsoluteURL(this.href));
            }));
    }
}