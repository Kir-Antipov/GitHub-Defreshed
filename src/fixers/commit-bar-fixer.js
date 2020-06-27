import { isRepoRoot, isRepoTree } from "../tools/path-detector";
import createElement from "../tools/create-element";
import Fixer from "./fixer";

export default class CommitBarFixer extends Fixer {
    isApplieble(location) {
        return isRepoRoot(location) || isRepoTree(location);
    }

    apply() {
        let commitMessageContainer = document.querySelector(".repository-content div.css-truncate.css-truncate-overflow.text-gray");
        this._moveCommitDate(commitMessageContainer);
        this._fixCommitMessage(commitMessageContainer);
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

        let authorLink = commitMessageContainer.querySelector("a");
        for (let child of [...commitMessageContainer.childNodes])
            commitMessageContainer.removeChild(child);

        commitMessageContainer.append(authorLink, " ", commitTitleContainer);

        if (commitCommentsContainer)
            hiddenCommitExpander.parentElement.insertBefore(commitCommentsContainer, hiddenCommitExpander);

        if (!commitDescriptionContainer)
            hiddenCommitExpander.parentElement.removeChild(hiddenCommitExpander);
    }
}