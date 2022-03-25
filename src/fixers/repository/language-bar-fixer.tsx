import { isRepoRoot } from "@utils/path-detector";
import { is404, isRepoSetup } from "@utils/page-detector";
import { waitUntilElementsReady, checkIfElementsReady } from "@utils/wait-until-ready";
import settings from "@utils/settings";
import LanguageBar from "@components/repository/language-bar";
import Fixer from "@fixers/fixer";

/**
 * Revives classical repository languages statistics bar.
 */
export default class LanguageBarFixer extends Fixer {
    isApplieble(location: string) {
        return isRepoRoot(location) && !isRepoSetup() && !is404();
    }

    async waitUntilFixerReady() {
        return (
            await waitUntilElementsReady("main:nth-child(1) .BorderGrid-row:last-child") &&
            await checkIfElementsReady("main:nth-child(1) .BorderGrid-row .Progress")
        );
    }

    async apply() {
        const langs = [
                ...document.querySelector("main .BorderGrid-row .Progress")
                .parentElement
                .nextElementSibling
                .children
            ]
            .map(this.extractLanguageData);

        const container = document.querySelector(".repository-content > div");
        const shouldBeOpen = await settings.openLanguagesByDefault;

        container.prepend(<LanguageBar open={shouldBeOpen} langs={langs}/>);
    }

    /**
     * Extracts language details from the DOM element.
     */
    private extractLanguageData(element: HTMLElement) {
        if (element.querySelector("a")) {
            return {
                name: element.querySelector("span").innerText,
                percent: element.querySelectorAll("span")[1].innerText,
                color: element.querySelector("svg").style.color,
                link: element.querySelector("a").href
            };
        } else {
            return {
                name: element.querySelectorAll("span")[1].innerText,
                percent: element.querySelectorAll("span")[2].innerText,
                color: element.querySelector("svg").style.color,
                link: ""
            }
        }
    }
}