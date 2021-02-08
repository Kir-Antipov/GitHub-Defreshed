import navigate from "@utils/navigate";
import { isSameSiteURL, getAbsoluteURL } from "@utils/host-detector";
import { isRepo, isProject, isAnchor, isFile, isProfileSettings, isProfile } from "@utils/path-detector";
import Fixer from "@fixers/fixer";

/**
 * Injects dynamic loading logic into the anchors.
 */
export default class LinksFixer extends Fixer {
    apply() {
        this._setupObserver();
        this._fixAll();
    }

    /**
     * Determines whether the link's logic needs to be changed.
     *
     * @returns true if the link's logic needs to be changed; otherwise, false.
     */
    _needToBeFixed(a: HTMLAnchorElement) {
        return  !a.hasAttribute("defreshed") && a.href && !isAnchor(a.href) &&
                isSameSiteURL(a.href) &&
                (isRepo(a.href) || isProfileSettings(a.href) || isProfile(a.href)) &&
                !isFile(a.href) && !isProject(a.href);
    }

    /**
     * Injects dynamic loading logic into the link.
     */
    _fix(a: HTMLAnchorElement) {
        a.setAttribute("defreshed", "");

        a.addEventListener("click", async function(e) {
            if (e.metaKey || e.ctrlKey)
                return;

            e.stopPropagation();
            e.preventDefault();
            navigate(getAbsoluteURL(this.href));
        });
    }

    /**
     * Fixes all anchors provided on the page.
     */
    _fixAll() {
        [...document.querySelectorAll("a")]
        .filter(this._needToBeFixed)
        .forEach(this._fix);
    }

    /**
     * Setups an observer that monitors the
     * appearance of new anchors on the page.
     */
    _setupObserver() {
        if (!("defreshObserver" in window)) {
            window["defreshObserver"] = new MutationObserver(() => this._fixAll());
            window["defreshObserver"].observe(document.body, { childList: true, subtree: true });
        }
    }
}