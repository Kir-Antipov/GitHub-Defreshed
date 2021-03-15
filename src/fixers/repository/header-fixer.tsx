import { isRepo, isProject } from "@utils/path-detector";
import { is404 } from "@utils/page-detector";
import { waitUntilElementsReady } from "@utils/wait-until-ready";
import UnderlineNav from "@components/global/underline-nav";
import ResizeObserver from "@utils/resize-observer";
import Fixer from "@fixers/fixer";

/**
 * Returns the classic look of the repository's
 * header and its tabs.
 */
export default class HeaderFixer extends Fixer {
    isApplieble(location: string) {
        return isRepo(location) && !is404();
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) > div > nav");
    }

    apply(location: string) {
        const nav = document.querySelector("main > div > nav");
        const header = nav.parentElement;

        if (!isProject(location)) {
            header.className = "pagehead repohead hx_repohead readability-menu bg-gray-light pb-0 pt-3";
            header.firstElementChild.className = "d-flex container-lg mb-4 px-3";
        }
        nav.className = "js-repo-nav js-sidenav-container-pjax clearfix hx_reponav reponav px-3 container-lg";
        nav.querySelector(":scope > ul").className = "list-style-none";

        for (const tabWrapper of nav.querySelectorAll(":scope > ul > li")) {
            tabWrapper.className = "";
            const tab = tabWrapper.querySelector("a");
            const selected = tab.classList.contains("selected");
            tab.className = "js-selected-navigation-item reponav-item" + (selected ? " selected" : "");
        }

        const smartUnderlineNav = (
            <UnderlineNav>
                {
                    [...nav.querySelectorAll<HTMLAnchorElement>(":scope > ul > li > a")]
                    .map(x => (
                        <a dataset={{ name: x.getAttribute("data-tab-item") }} href={x.href}>
                            {x.querySelector("span").textContent}
                        </a>
                    ))
                }
            </UnderlineNav>
        );

        const existingUnderlineNav = nav.querySelector(":scope > div");
        if (existingUnderlineNav) {
            existingUnderlineNav.replaceWith(smartUnderlineNav);
        } else {
            nav.append(smartUnderlineNav);
        }

        const repairHeader = () => {
            let someHasOffset = false;
            for (const tab of nav.querySelectorAll<HTMLAnchorElement>(":scope > ul > li > a")) {
                tab.style.display = "block";
                const underlineTab = smartUnderlineNav.querySelector<HTMLAnchorElement>(`a[data-name=${tab.getAttribute("data-tab-item")}]`);
                if (underlineTab) {
                    const hasOffset = !!tab.offsetTop;
                    someHasOffset ||= hasOffset;
                    tab.style.display = hasOffset ? "none" : "block";
                    tab.style.visibility = hasOffset ? "hidden" : "visible";
                    underlineTab.style.display = hasOffset ? "block" : "none";
                }
            }
            smartUnderlineNav.style.display = someHasOffset ? "block" : "none";
        };

        new ResizeObserver(repairHeader).observe(nav);
    }
}
