import { isRepoRoot, isRepoSetup } from "../../tools/path-detector";
import { waitUntilElementsReady, checkIfElementsReady } from "../../tools/wait-until-ready";
import settings from "../../tools/settings";
import Fixer from "../fixer";

/**
 * Revives classical repository languages statistics bar.
 */
export default class LanguageBarFixer extends Fixer {
    /** @inheritdoc */
    isApplieble(location) {
        return isRepoRoot(location) && !isRepoSetup(location);
    }

    /** @inheritdoc */
    async waitUntilFixerReady() {
        return (await waitUntilElementsReady("main:nth-child(1) .BorderGrid-row:last-child")) &&
            (await checkIfElementsReady("main:nth-child(1) .BorderGrid-row .Progress"));
    }

    /** @inheritdoc */
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
                        {langs.map(lang => { lang.tagname = lang.link ? "a" : "span"; return lang; }).map(lang =>
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
     *
     * @param {HTMLElement} element Language element.
     * @returns {{ name: string, percent: string, color: string, link: string }}
     * Language details.
     */
    _extractLanguageData(element) {
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