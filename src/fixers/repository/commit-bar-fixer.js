import { isRepoRoot, isRepoTree } from "../../tools/path-detector";
import createElement from "../../tools/create-element";
import { waitUntilElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

export default class CommitBarFixer extends Fixer {
    isApplieble(location) {
        return isRepoRoot(location) || isRepoTree(location);
    }

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

    apply(location, backupContainer) {
        if (isRepoRoot(location))
            this._backupDetails(backupContainer);
        this._moveCommitBuildStatuses();
        this._moveCommitComments();
        this._moveCommitDetails();
        this._removeSecondCommitTitle();
    }

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

    _getBuildStatuses() {
        return  document.querySelector("main:nth-child(1) .repository-content .Box .Box-header details.commit-build-statuses") || 
                document.querySelector("main:nth-child(1) .repository-content .Box .Box-header include-fragment");
    }

    _moveCommitBuildStatuses() {
        if (this._getBuildStatuses()) {
            let commitMessageContainer = document.querySelector(".repository-content .Box .Box-header .commit-author").parentElement;
            commitMessageContainer.parentElement.insertBefore(createElement("div", {
                className: "ml-1",
                children: [this._getBuildStatuses()]
            }), commitMessageContainer.nextSibling);
        }
    }

    _moveCommitComments() {
        let commentsSvg = document.querySelector("main:nth-child(1) .repository-content .Box .Box-header svg.octicon-comment");
        if (commentsSvg) {
            let commentsLink = commentsSvg.parentElement;
            commentsLink.className = "no-wrap muted-link text-inherit ml-2";
            let commitMessageContainer = document.querySelector(".repository-content .Box .Box-header a.commit-author").parentElement;
            commitMessageContainer.parentElement.insertBefore(commentsLink, commitMessageContainer.nextSibling);
        }
    }

    _moveCommitDetails() {
        let wrongCommitDetailsContainer = document.querySelector(".repository-content .Box relative-time").parentElement.parentElement;
        let commitDetailsContainer = document.querySelector(".repository-content .Box div.flex-shrink-0:not(.hx_avatar_stack_commit)");

        for (let child of [...commitDetailsContainer.children])
            commitDetailsContainer.removeChild(child);

        let commitHash = wrongCommitDetailsContainer.querySelector(".text-mono");
        commitHash.classList.remove("ml-2");
        let commitTime = wrongCommitDetailsContainer.querySelector("relative-time");

        let commitDetailsWrapper = createElement("div", {
            className: "css-truncate css-truncate-overflow text-gray",
            children: [
                "Latest commit ", commitHash, " ", commitTime
            ]
        });

        commitDetailsContainer.append(commitDetailsWrapper);
        wrongCommitDetailsContainer.parentElement.removeChild(wrongCommitDetailsContainer);
    }

    _removeSecondCommitTitle() {
        let secondCommitTitle = document.querySelector(".repository-content .Box .Box-header .Details-content--hidden a.text-bold");
        if (secondCommitTitle)
            secondCommitTitle.parentElement.parentElement.removeChild(secondCommitTitle.parentElement);
    }
}