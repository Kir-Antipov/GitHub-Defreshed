import { isRepoRoot, getRepoURL, isRepoSetup } from "../../utils/path-detector";
import settings from "../../utils/settings";
import parseElement from "../../utils/parse-element";
import Fixer from "../fixer";

/**
 * Recreates old school summary.
 */
export default class SummaryFixer extends Fixer {
    /** @inheritdoc */
    isApplieble(location) {
        return isRepoRoot(location) && !isRepoSetup(location);
    }

    /** @inheritdoc */
    async apply(location, backupContainer) {
        let langsBar = document.querySelector(".repository-content details summary div.repository-lang-stats-graph");

        document
            .querySelector(".repository-content")
            .prepend(
                <div className={"overall-summary " + (langsBar ? "border-bottom-0 mb-0 rounded-bottom-0" : "mb-3")}>
                    <ul className="numbers-summary">
                        {this._createCommitsSummaryElement(backupContainer)}
                        {this._createBranchesSummaryElement(backupContainer)}
                        {this._createPackagesSummaryElement(location)}
                        {this._createReleasesSummaryElement(location, await settings.treatTagsAsReleases.getValue(), await settings.showLatestReleasePopup.getValue())}
                        {this._createContributorsSummaryElement(location)}
                        {this._createLicenseSummaryElement()}
                    </ul>
                </div>
            );
    }

    /**
     * Creates commits element for the summary block.
     *
     * @param {HTMLElement} backupContainer Container for passing elements removed from the DOM between fixers.
     *
     * @returns {HTMLLIElement} Commits element.
     */
    _createCommitsSummaryElement(backupContainer) {
        let data = backupContainer.querySelector("#backup-commits");
        let count = data.querySelector("strong").innerText;
        let link = data.href;
        let svg = `<svg class="octicon octicon-git-commit" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z"></path></svg>`;

        return this._createSummaryElement(svg, link, "commit", count);
    }

    /**
     * Creates branches element for the summary block.
     *
     * @returns {HTMLLIElement} Branches element.
     */
    _createBranchesSummaryElement(backupContainer) {
        let data = backupContainer.querySelector("#backup-branches");
        let count = data.querySelector("strong").innerText;
        let link = data.href;
        let svg = `<svg class="octicon octicon-git-branch" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"></path></svg>`;

        return this._createSummaryElement(svg, link, "branch", count, "es");
    }

    /**
     * Creates packages element for the summary block.
     *
     * @returns {HTMLLIElement} Packages element.
     */
    _createPackagesSummaryElement(location) {
        let svg = `<svg class="octicon octicon-tag" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M2.5 7.775V2.75a.25.25 0 01.25-.25h5.025a.25.25 0 01.177.073l6.25 6.25a.25.25 0 010 .354l-5.025 5.025a.25.25 0 01-.354 0l-6.25-6.25a.25.25 0 01-.073-.177zm-1.5 0V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 010 2.474l-5.026 5.026a1.75 1.75 0 01-2.474 0l-6.25-6.25A1.75 1.75 0 011 7.775zM6 5a1 1 0 100 2 1 1 0 000-2z"></path></svg>`;
        return this._createSummaryElementFromRightBar(location, svg, "package", "s", 0, "", false);
    }

    /**
     * Creates releases element for the summary block.
     *
     * @returns {HTMLLIElement} Releases element.
     */
    _createReleasesSummaryElement(location, treatTagsAsReleases, showLatestReleasePopup) {
        let svg = `<svg class="octicon octicon-tag" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M2.5 7.775V2.75a.25.25 0 01.25-.25h5.025a.25.25 0 01.177.073l6.25 6.25a.25.25 0 010 .354l-5.025 5.025a.25.25 0 01-.354 0l-6.25-6.25a.25.25 0 01-.073-.177zm-1.5 0V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 010 2.474l-5.026 5.026a1.75 1.75 0 01-2.474 0l-6.25-6.25A1.75 1.75 0 011 7.775zM6 5a1 1 0 100 2 1 1 0 000-2z"></path></svg>`;
        let element = this._createSummaryElementFromRightBar(location, svg, "release", "s", 0, "", true, treatTagsAsReleases);

        if (showLatestReleasePopup && element) {
            let section = this._findRightBarSectionByName("releases");
            let latestReleaseDate = section && section.querySelector("relative-time");
            let latestReleaseContainer = ((latestReleaseDate || {}).parentElement || {}).previousElementSibling;
            let latestReleaseVersion = latestReleaseContainer && latestReleaseContainer.querySelector("span");
            if (latestReleaseVersion) {
                let popupText = `${latestReleaseVersion.innerText} — ${latestReleaseDate.innerText}`;

                element.classList.add("tooltipped", "tooltipped-se");
                element.setAttribute("aria-label", popupText);
            }
        }

        return element;
    }

    /**
     * Creates contributors element for the summary block.
     *
     * @returns {HTMLLIElement} Contributors element.
     */
    _createContributorsSummaryElement(location) {
        let svg = `<svg class="octicon octicon-people" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path></svg>`;
        return this._createSummaryElementFromRightBar(location, svg, "contributor", "s", 1, "graphs/");
    }

    /**
     * Creates license element for the summary block.
     *
     * @returns {HTMLLIElement} License element.
     */
    _createLicenseSummaryElement() {
        let data = document.querySelector(".flex-shrink-0.col-12.col-md-3 svg.octicon-law");

        if (data) {
            let link = data.parentElement.href;
            let text = data.parentElement.innerText.trim().replace(" License", "");
            let svg = `<svg class="octicon octicon-law" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path></svg>`;

            return this._createSummaryElement(svg, link, text);
        }

        return null;
    }

    /**
     * Creates an element for the summary block from the right bar.
     *
     * @param {string} location Page's URL. Can be either absolute or relative.
     * @param {string} svg Element's icon.
     * @param {string} text Element's text.
     * @param {string} pluralEnding Plural ending for the text value.
     * @param {number|string} defaultCount Default element's count.
     * @param {string} additionalPath An additional path to generate a link from the text.
     * @param {boolean} force Indicates whether to return an empty element instead of null if no data source is found.
     * @param {boolean} useSecondaryCount Indicates whether to look for an additional counter within the element.
     *
     * @returns {HTMLLIElement} Summary element.
     */
    _createSummaryElementFromRightBar(location, svg, text, pluralEnding = "s", defaultCount = 0, additionalPath = "", force = true, useSecondaryCount = false) {
        let plural = text + pluralEnding;
        let data = this._findRightBarSectionByName(plural);

        if (!data && !force)
            return null;

        let count;
        let link;
        if (data) {
            let counter = data.querySelector("span.Counter");
            if (!counter && useSecondaryCount)
                counter = data.querySelector(":scope > a > span");
            count = (counter || {}).innerText || defaultCount;
            link = data.querySelector("a").href;
        } else {
            count = defaultCount;
            link = `/${getRepoURL(location)}/${additionalPath}${plural}`;
        }

        return this._createSummaryElement(svg, link, text, count, pluralEnding);
    }

    /**
     * Finds section of the right bar by its name.
     *
     * @param {string} name Section's name.
     *
     * @returns {HTMLElement} Right bar's section, if any; otherwise, false.
     */
    _findRightBarSectionByName(name) {
        return [...document.querySelectorAll(".flex-shrink-0.col-12.col-md-3 div.BorderGrid-cell")]
            .find(x => {
                let link = x.querySelector("a");
                return link && link.href.includes(name);
            });
    }

    /**
     * Creates an element for the summary block.
     *
     * @param {string} svg Element's icon.
     * @param {string} link Element's link.
     * @param {string} text Element's text.
     * @param {number|string} count Element's count.
     * @param {string} pluralEnding Plural ending for the text value.
     *
     * @returns {HTMLLIElement} Summary element.
     */
    _createSummaryElement(svg, link, text, count = -1, pluralEnding = "s") {
        return (
            <li>
                <a href={link}>
                    {parseElement(svg)} {count != -1 && <span className="num text-emphasized">{count}</span>} {text + (count == 1 || count == -1 ? "" : pluralEnding)}
                </a>
            </li>
        );
    }
}