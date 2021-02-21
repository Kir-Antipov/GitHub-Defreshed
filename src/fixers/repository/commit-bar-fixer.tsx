import { isRepoRoot, isRepoSetup, isRepoTree } from "@utils/path-detector";
import { waitUntilElementsReady } from "@utils/wait-until-ready";
import LatestCommit from "@components/repository/latest-commit";
import Fixer from "@fixers/fixer";
import BuildStatusesContainer from "@components/repository/build-statuses-container";

/**
 * Returns the classic view of the latest commit bar.
 */
export default class CommitBarFixer extends Fixer {
    isApplieble(location: string) {
        return (
            (isRepoRoot(location) || isRepoTree(location))
            && !isRepoSetup()
        );
    }

    waitUntilFixerReady(location: string) {
        const selectors = [
            "main:nth-child(1) .repository-content .Box relative-time",
            "main:nth-child(1) .repository-content .Box div.flex-shrink-0:not(.hx_avatar_stack_commit)",
        ];

        if (isRepoRoot(location)) {
            selectors.push("main:nth-child(1) .repository-content .file-navigation > :not(:first-child) svg.octicon-git-branch");
            selectors.push("main:nth-child(1) .repository-content .Box ul.list-style-none svg.octicon-history");
        }

        return waitUntilElementsReady({
            selectors,
            dynamic: true
        });
    }

    apply(location: string, backupContainer: HTMLElement) {
        if (isRepoRoot(location)) {
            this.backupDetails(backupContainer);
        }
        this.moveCommitBuildStatuses();
        this.moveCommitComments();
        this.moveCommitDetails();
        this.removeSecondCommitTitle();
    }

    /**
     * Backups branches and commits details for future use.
     *
     * @param backupContainer Container for passing elements removed from the DOM between fixers.
     */
    private backupDetails(backupContainer: HTMLElement) {
        const branchesDetails = document
            .querySelector(".repository-content .file-navigation > :not(:first-child) svg.octicon-git-branch")
            .parentElement;
        branchesDetails.id = "backup-branches";
        const branchesDetailsContainer = branchesDetails.parentElement;
        branchesDetailsContainer.remove();
        backupContainer.append(branchesDetails);

        const commitsDetails = document
            .querySelector(".repository-content .Box ul.list-style-none svg.octicon-history")
            .parentElement;
        commitsDetails.id = "backup-commits";
        const commitsDetailsContainer = commitsDetails.parentElement.parentElement;
        commitsDetailsContainer.remove();
        backupContainer.append(commitsDetails);
    }

    /**
     * Returns Build-Statuses element.
     */
    private getBuildStatuses() {
        const container = document.querySelector("main:nth-child(1) .repository-content .Box .Box-header");
        return (
            container.querySelector("details.commit-build-statuses") ||
            container.querySelector("include-fragment")
        );
    }

    /**
     * Moves Build-Statuses to their usual location.
     */
    private moveCommitBuildStatuses() {
        if (this.getBuildStatuses()) {
            const commitMessageContainer = document
                .querySelector(".repository-content .Box .Box-header .commit-author")
                .parentElement;

            commitMessageContainer.parentElement.insertBefore(
                <BuildStatusesContainer>
                    {this.getBuildStatuses()}
                </BuildStatusesContainer>,
                commitMessageContainer.nextSibling
            );
        }
    }

    /**
     * Moves commit's comments to their usual location.
     */
    private moveCommitComments() {
        const commentsSvg = document.querySelector("main:nth-child(1) .repository-content .Box .Box-header svg.octicon-comment");

        if (commentsSvg) {
            const commentsLink = commentsSvg.parentElement;
            commentsLink.className = "no-wrap muted-link text-inherit ml-2";

            const commitMessageContainer = document
                .querySelector(".repository-content .Box .Box-header a.commit-author")
                .parentElement;
            commitMessageContainer
                .parentElement
                .insertBefore(commentsLink, commitMessageContainer.nextSibling);
        }
    }

    /**
     * Moves commit's details to their usual location.
     */
    private moveCommitDetails() {
        const wrongCommitDetailsContainer = document
            .querySelector(".repository-content .Box relative-time")
            .parentElement
            .parentElement;

        const commitDetailsContainer = document.querySelector(".repository-content .Box div.flex-shrink-0:not(.hx_avatar_stack_commit)");
        for (const child of [...commitDetailsContainer.children]) {
            commitDetailsContainer.removeChild(child);
        }

        const commitHash = wrongCommitDetailsContainer.querySelector<HTMLAnchorElement>("a.text-mono");
        const commitTime = wrongCommitDetailsContainer.querySelector("relative-time");

        commitDetailsContainer.append(
            <LatestCommit href={commitHash.href} datetime={commitTime.getAttribute("datetime")}/>
        );
        wrongCommitDetailsContainer.remove();
    }

    /**
     * Removes unnecessary commit subtitle that duplicates its first line.
     */
    private removeSecondCommitTitle() {
        const secondCommitTitle = document.querySelector(".repository-content .Box .Box-header .Details-content--hidden a.text-bold");
        if (secondCommitTitle) {
            secondCommitTitle.parentElement.remove();
        }
    }
}