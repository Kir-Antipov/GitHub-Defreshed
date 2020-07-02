import { isRepoRoot, isRepoTree } from "../tools/path-detector";
import createElement from "../tools/create-element";
import { waitUntilElementsReady } from "../tools/wait-until-ready";
import Fixer from "./fixer";

export default class CommitBarFixer extends Fixer {
    isApplieble(location) {
        return isRepoRoot(location) || isRepoTree(location);
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) .repository-content .js-details-container .Details-content--hidden", ".repository-content ul.list-style-none.d-flex li:nth-child(3)");
    }

    apply(_, backupContainer) {
        let commitMessageContainer = document.querySelector(".repository-content div.css-truncate.css-truncate-overflow.text-gray");
        this._backupCommitsDetails(backupContainer);
        this._backupBranchesDetails(backupContainer);
        this._moveCommitDate(commitMessageContainer);
        this._fixCommitMessage(commitMessageContainer);
    }

    _backupCommitsDetails(backupContainer) {
        this._backupDetails("backup-commits", backupContainer);
    }

    _backupBranchesDetails(backupContainer) {
        this._backupDetails("backup-branches", backupContainer);
    }

    _backupDetails(id, backupContainer) {
        let branchesDetails = document.querySelector(".repository-content ul.list-style-none.d-flex li:nth-child(1)");
        branchesDetails.id = id;
        backupContainer.append(branchesDetails);
    }

    _moveCommitDate(commitMessageContainer) {
        let commitDateContainer = commitMessageContainer.parentElement.parentElement.querySelector(":scope > div.flex-shrink-0:not(.hx_avatar_stack_commit)");
    
        for (let child of [...commitDateContainer.children])
            commitDateContainer.removeChild(child);

        let commitDateWrapper = createElement("div", {
            className: "css-truncate css-truncate-overflow text-gray",
            children: [
                "Latest commit ", commitMessageContainer.querySelector(".text-mono"), " ", commitMessageContainer.querySelector("relative-time")
            ]
        });

        commitDateContainer.append(commitDateWrapper);
    }

    // TODO:
    // Split titles longer than 50 characters (50/72 rule)
    _fixCommitMessage(commitMessageContainer) {
        let detailsContainer = commitMessageContainer.parentElement.parentElement.querySelector(":scope > .Details-content--hidden");
        let commitTitleContainer = detailsContainer.querySelector("a");
        let commitDescriptionContainer = detailsContainer.querySelector("pre");
        let commitCommentsContainer = detailsContainer.querySelector("a[anchor='comments']");
        let hiddenCommitExpander = commitMessageContainer.parentElement.querySelector(":scope > span.hidden-text-expander");

        let authorLink = commitMessageContainer.querySelector(".commit-author");
        for (let child of [...commitMessageContainer.childNodes])
            commitMessageContainer.removeChild(child);

        commitMessageContainer.append(authorLink, " ", commitTitleContainer);

        if (commitCommentsContainer)
            hiddenCommitExpander.parentElement.insertBefore(commitCommentsContainer, hiddenCommitExpander);

        if (!commitDescriptionContainer)
            hiddenCommitExpander.parentElement.removeChild(hiddenCommitExpander);
    }
}