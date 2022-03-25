import { isRepoRoot, getRepoURL } from "@utils/path-detector";
import { is404, isRepoSetup } from "@utils/page-detector";
import settings from "@utils/settings";
import Fixer from "@fixers/fixer";
import pluralize from "@utils/pluralize";
import SummaryElement from "@components/repository/summary-element";
import { LawIcon } from "@primer/octicons-react";
import { PeopleIcon } from "@primer/octicons-react";
import { TagIcon } from "@primer/octicons-react";
import { GitBranchIcon } from "@primer/octicons-react";
import { CommitIcon } from "@primer/octicons-react";
import SummaryContainer from "@components/repository/summary-container";

/**
 * Recreates old school summary.
 */
export default class SummaryFixer extends Fixer {
    isApplieble(location: string) {
        return isRepoRoot(location) && !isRepoSetup() && !is404();
    }

    async apply(location: string, backupContainer: HTMLElement) {
        const langsBar = document.querySelector(".repository-content details summary div.repository-lang-stats-graph");
        document
            .querySelector(".repository-content")
            .prepend(
                <SummaryContainer rounded={!langsBar}>
                    {this.createCommitsSummaryElement(backupContainer)}
                    {this.createBranchesSummaryElement(backupContainer)}
                    {this.createPackagesSummaryElement(location)}
                    {this.createReleasesSummaryElement(location, await settings.treatTagsAsReleases, await settings.showLatestReleasePopup)}
                    {this.createContributorsSummaryElement(location)}
                    {this.createLicenseSummaryElement()}
                </SummaryContainer>
            );
    }

    /**
     * Creates commits element for the summary block.
     */
    private createCommitsSummaryElement(backupContainer: HTMLElement) {
        const data = backupContainer.querySelector<HTMLAnchorElement>("#backup-commits");
        const count = data.querySelector("strong").innerText;
        const link = data.href;
        const text = "commit";
        const icon = <CommitIcon />;

        return <SummaryElement icon={icon} href={link} text={text} count={count} />;
    }

    /**
     * Creates branches element for the summary block.
     */
    private createBranchesSummaryElement(backupContainer: HTMLElement) {
        const data = backupContainer.querySelector<HTMLAnchorElement>("#backup-branches");
        const count = data.querySelector("strong").innerText;
        const link = data.href;
        const text = "branch";
        const icon = <GitBranchIcon />;

        return <SummaryElement icon={icon} href={link} text={text} count={count} />;
    }

    /**
     * Creates packages element for the summary block.
     */
    private createPackagesSummaryElement(location: string) {
        const icon = <TagIcon />;
        const text = "package";
        const defaultCount = 0;
        const path = "";
        const force = false;
        return this.createSummaryElementFromRightBar(location, icon, text, defaultCount, path, force);
    }

    /**
     * Creates releases element for the summary block.
     */
    private createReleasesSummaryElement(location: string, treatTagsAsReleases: boolean, showLatestReleasePopup: boolean) {
        const icon = <TagIcon />;
        const text = "release";
        const defaultCount = 0;
        const path = "";
        const force = true;
        const element = this.createSummaryElementFromRightBar(location, icon, text, defaultCount, path, force, treatTagsAsReleases);

        if (showLatestReleasePopup && element) {
            const section = this.findRightBarSectionByName("releases");
            const latestReleaseDate = section?.querySelector<HTMLElement>("relative-time");
            const latestReleaseContainer = latestReleaseDate?.parentElement?.previousElementSibling;
            const latestReleaseVersion = latestReleaseContainer?.querySelector("span");
            if (latestReleaseVersion) {
                const popupText = `${latestReleaseVersion.innerText} — ${latestReleaseDate.innerText}`;
                element.classList.add("tooltipped", "tooltipped-se");
                element.setAttribute("aria-label", popupText);
            }
        }

        return element;
    }

    /**
     * Creates contributors element for the summary block.
     */
    private createContributorsSummaryElement(location: string) {
        const icon = <PeopleIcon />;
        const text = "contributor";
        const defaultCount = 1;
        const path = "graphs/";
        return this.createSummaryElementFromRightBar(location, icon, text, defaultCount, path);
    }

    /**
     * Creates license element for the summary block.
     */
    private createLicenseSummaryElement() {
        const data = document.querySelector(".Layout-sidebar svg.octicon-law");

        if (data) {
            const anchor = data.parentElement as HTMLAnchorElement;
            const link = anchor.href;
            const text = anchor.innerText.replace("License", "").trim();
            const icon = <LawIcon />;

            return <SummaryElement icon={icon} href={link} text={text} />;
        }

        return null;
    }

    /**
     * Creates an element for the summary block from the right bar.
     *
     * @param location Page's URL. Can be either absolute or relative.
     * @param icon Element's icon.
     * @param text Element's text.
     * @param defaultCount Default element's count.
     * @param additionalPath An additional path to generate a link from the text.
     * @param force Indicates whether to return an empty element instead of null if no data source is found.
     * @param useSecondaryCount Indicates whether to look for an additional counter within the element.
     */
    private createSummaryElementFromRightBar(location: string, icon: JSX.Element, text: string, defaultCount: number | string = 0, additionalPath = "", force = true, useSecondaryCount = false) {
        const data = this.findRightBarSectionByName(text);

        if (!data && !force) {
            return null;
        }

        let count: number | string;
        let link: string;
        if (data) {
            let counter = data.querySelector<HTMLElement>("span.Counter");
            if (!counter && useSecondaryCount) {
                counter = data.querySelector(":scope > a > span");
            }
            count = counter?.innerText || defaultCount;
            link = data.querySelector("a").href;
        } else {
            count = defaultCount;
            link = `/${getRepoURL(location)}/${additionalPath}${pluralize(text, 2)}`;
        }

        return <SummaryElement icon={icon} href={link} text={text} count={count} />;
    }

    /**
     * Finds section of the right bar by its name.
     *
     * @returns Right bar's section, if any; otherwise, false.
     */
    private findRightBarSectionByName(name: string) {
        return [...document.querySelectorAll(".Layout-sidebar .BorderGrid-row")]
            .find(x => {
                const link = x.querySelector("a");
                return link && link.href.includes(name);
            });
    }
}