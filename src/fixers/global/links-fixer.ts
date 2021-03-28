import navigate from "@utils/navigate";
import { isSameSiteURL, getAbsoluteURL } from "@utils/host-detector";
import { isRepo, isProject, isAnchor, isFile, isProfileSettings, isProfile } from "@utils/path-detector";
import settings from "@utils/settings";
import Engine from "@utils/engine";
import Fixer from "@fixers/fixer";

/**
 * Injects dynamic loading logic into the anchors.
 */
export default class LinksFixer extends Fixer {
    async isApplieble() {
        return await settings.engine === Engine.Original;
    }

    apply() {
        this.setupObserver();
        this.fixAll();
    }

    /**
     * Determines whether the link's logic needs to be changed.
     *
     * @returns true if the link's logic needs to be changed; otherwise, false.
     */
    private needsToBeFixed(a: HTMLAnchorElement) {
        return (
            !a.hasAttribute("defreshed") && a.href && !isAnchor(a.href) &&
            isSameSiteURL(a.href) &&
            (isRepo(a.href) || isProfileSettings(a.href) || isProfile(a.href)) &&
            !isFile(a.href) && !isProject(a.href)
        );
    }

    /**
     * Injects dynamic loading logic into the link.
     */
    private fix(a: HTMLAnchorElement) {
        a.setAttribute("defreshed", "");

        a.addEventListener("click", async function(e) {
            if (e.metaKey || e.ctrlKey) {
                return;
            }

            e.stopPropagation();
            e.preventDefault();
            navigate(getAbsoluteURL(this.href));
        });
    }

    /**
     * Fixes all anchors provided on the page.
     */
    private fixAll() {
        [...document.querySelectorAll("a")]
        .filter(this.needsToBeFixed)
        .forEach(this.fix);
    }

    /**
     * Setups an observer that monitors the
     * appearance of new anchors on the page.
     */
    private setupObserver() {
        if (!("defreshObserver" in window)) {
            const observer = new MutationObserver(() => this.fixAll());
            observer.observe(document.body, { childList: true, subtree: true });
            window["defreshObserver"] = observer;
        }
    }
}