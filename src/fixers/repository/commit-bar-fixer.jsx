import { isRepoRoot, isRepoSetup, isRepoTree } from "../../tools/path-detector";
import { waitUntilElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

/**
 * Returns the classic view of the latest commit bar.
 */
export default class CommitBarFixer extends Fixer {
    /** @inheritdoc */
    isApplieble(location) {
        return (isRepoRoot(location) || isRepoTree(location)) && !isRepoSetup(location);
    }

    /** @inheritdoc */
    waitUntilFixerReady(location) {
        let selectors = [
            "main:nth-child(1) .repository-content .Box relative-time",
            "main:nth-child(1) .repository-content .Box div.flex-shrink-0:not(.hx_avatar_stack_commit)"
        ];
        if (isRepoRoot(location)) {
            selectors.push("main:nth-child(1) .repository-content .file-navigation > :not(:first-child) svg.octicon-git-branch");
            selectors.push("main:nth-child(1) .repository-content .Box ul.list-style-none svg.octicon-history");
        }

        return waitUntilElementsReady({
            selectors: selectors,
            dynamic: true
        });
    }

    /** @inheritdoc */
    apply(location, backupContainer) {
        if (isRepoRoot(location))
            this._backupDetails(backupContainer);
        this._moveCommitBuildStatuses();
        this._moveCommitComments();
        this._moveCommitDetails();
        this._removeSecondCommitTitle();
    }

    /**
     * Backups branches and commits details for future use.
     *
     * @param {HTMLElement} backupContainer Container for passing elements removed from the DOM between fixers.
     */
    _backupDetails(backupContainer) {
        let branchesDetails = document.querySelector(".repository-content .file-navigation > :not(:first-child) svg.octicon-git-branch").parentElement;
        branchesDetails.id = "backup-branches";
        let branchesDetailsContainer = branchesDetails.parentElement;
        branchesDetailsContainer.parentElement.removeChild(branchesDetailsContainer);
        backupContainer.append(branchesDetails);

        let commitsDetails = document.querySelector(".repository-content .Box ul.list-style-none svg.octicon-history").parentElement;
        commitsDetails.id = "backup-commits";
        let commitsDetailsContainer = commitsDetails.parentElement.parentElement;
        commitsDetailsContainer.parentElement.removeChild(commitsDetailsContainer);
        backupContainer.append(commitsDetails);
    }

    /**
     * Returns Build-Statuses element.
     * @returns {HTMLElement} Build-Statuses element.
     */
    _getBuildStatuses() {
        return  document.querySelector("main:nth-child(1) .repository-content .Box .Box-header details.commit-build-statuses") ||
                document.querySelector("main:nth-child(1) .repository-content .Box .Box-header include-fragment");
    }

    /**
     * Moves Build-Statuses to their usual location.
     */
    _moveCommitBuildStatuses() {
        if (this._getBuildStatuses()) {
            let commitMessageContainer = document.querySelector(".repository-content .Box .Box-header .commit-author").parentElement;
            commitMessageContainer.parentElement.insertBefore(<div className="ml-1">{this._getBuildStatuses()}</div>, commitMessageContainer.nextSibling);
        }
    }

    /**
     * Moves commit's comments to their usual location.
     */
    _moveCommitComments() {
        let commentsSvg = document.querySelector("main:nth-child(1) .repository-content .Box .Box-header svg.octicon-comment");
        if (commentsSvg) {
            let commentsLink = commentsSvg.parentElement;
            commentsLink.className = "no-wrap muted-link text-inherit ml-2";
            let commitMessageContainer = document.querySelector(".repository-content .Box .Box-header a.commit-author").parentElement;
            commitMessageContainer.parentElement.insertBefore(commentsLink, commitMessageContainer.nextSibling);
        }
    }

    /**
     * Moves commit's details to their usual location.
     */
    _moveCommitDetails() {
        let wrongCommitDetailsContainer = document.querySelector(".repository-content .Box relative-time").parentElement.parentElement;
        let commitDetailsContainer = document.querySelector(".repository-content .Box div.flex-shrink-0:not(.hx_avatar_stack_commit)");

        for (let child of [...commitDetailsContainer.children])
            commitDetailsContainer.removeChild(child);

        let commitHash = wrongCommitDetailsContainer.querySelector(".text-mono");
        commitHash.classList.remove("ml-2");
        let commitTime = wrongCommitDetailsContainer.querySelector("relative-time");

        commitDetailsContainer.append(
            <div className="css-truncate css-truncate-overflow text-gray">
                Latest commit {commitHash} {commitTime}
            </div>
        );
        wrongCommitDetailsContainer.parentElement.removeChild(wrongCommitDetailsContainer);
    }

    /**
     * Removes unnecessary commit subtitle that duplicates its first line.
     */
    _removeSecondCommitTitle() {
        let secondCommitTitle = document.querySelector(".repository-content .Box .Box-header .Details-content--hidden a.text-bold");
        if (secondCommitTitle)
            secondCommitTitle.parentElement.parentElement.removeChild(secondCommitTitle.parentElement);
    }
}