import { isRepoRoot, isRepoSetup } from "@utils/path-detector";
import { waitUntilElementsReady, checkIfElementsReady } from "@utils/wait-until-ready";
import settings from "@utils/settings";
import Fixer from "@fixers/fixer";

/**
 * Revives classical repository languages statistics bar.
 */
export default class LanguageBarFixer extends Fixer {
    isApplieble(location: string) {
        return isRepoRoot(location) && !isRepoSetup();
    }

    async waitUntilFixerReady() {
        return (await waitUntilElementsReady("main:nth-child(1) .BorderGrid-row:last-child")) &&
            (await checkIfElementsReady("main:nth-child(1) .BorderGrid-row .Progress"));
    }

    async apply() {
        let langs = [...document.querySelector("main .BorderGrid-row .Progress").parentElement.nextElementSibling.children].map(this._extractLanguageData);

        document.querySelector(".repository-content").prepend(
            <details className="details-reset mb-3" open={(await settings.openLanguagesByDefault.getValue()) || undefined}>
                <summary title="Click for language details">
                    <div className="d-flex repository-lang-stats-graph">
                        {langs.map(lang =>
                            <span className="language-color" aria-label={`${lang.name} ${lang.percent}`} itemProp="keywords" style={{ width: lang.percent, backgroundColor: lang.color }}>
                                {lang.name}
                            </span>
                        )}
                    </div>
                </summary>
                <div className="repository-lang-stats">
                    <ol className="repository-lang-stats-numbers">
                        {langs.map(lang =>
                            <li>
                                <lang.tagname href={lang.link}>
                                    <span className="color-block language-color" style={{ backgroundColor: lang.color }} />
                                    <span className="lang"> {lang.name} </span>
                                    <span className="percent">{lang.percent}</span>
                                </lang.tagname>
                            </li>
                        )}
                    </ol>
                </div>
            </details>
        );
    }

    /**
     * Extracts language details from the DOM element.
     */
    _extractLanguageData(element: HTMLElement) {
        if (element.querySelector("a")) {
            return {
                tagname: "a",
                name: element.querySelector("span").innerText,
                percent: element.querySelectorAll("span")[1].innerText,
                color: element.querySelector("svg").style.color,
                link: element.querySelector("a").href
            };
        } else {
            return {
                tagname: "span",
                name: element.querySelectorAll("span")[1].innerText,
                percent: element.querySelectorAll("span")[2].innerText,
                color: element.querySelector("svg").style.color,
                link: ""
            }
        }
    }
}