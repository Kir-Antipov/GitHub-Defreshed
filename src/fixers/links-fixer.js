import navigate from "../tools/navigate";
import { isSameSiteURL, getAbsoluteURL } from "../tools/host-detector";
import { isRepo, isRaw, isArchive, isProject } from "../tools/path-detector";
import Fixer from "./fixer";

export default class LinksFixer extends Fixer {
    apply() {
        this._setupObserver();
        this._fixAll();
    }

    _needToBeFixed(a) {
        return  !a.hasAttribute("defreshed") && a.href && !a.href.endsWith("#") && 
                isSameSiteURL(a.href) && isRepo(a.href) &&
                !isRaw(a.href) && !isArchive(a.href) && !isProject(a.href);
    }

    _fix(a) {
        a.setAttribute("defreshed", "");

        a.addEventListener("click", async function(e) {
            if (e.metaKey || e.ctrlKey)
                return;
            
            e.stopPropagation();
            e.preventDefault();
            navigate(getAbsoluteURL(this.href));
        });
    }

    _fixAll() {
        [...document.querySelectorAll("a")]
        .filter(this._needToBeFixed)
        .forEach(this._fix);
    }

    _setupObserver() {
        if (!window.defreshObserver) {
            window.defreshObserver = new MutationObserver(() => this._fixAll());
            window.defreshObserver.observe(document.body, { childList: true, subtree: true });
        }
    }
}