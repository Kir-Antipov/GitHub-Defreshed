import { isRepoRoot, isRepoSetup } from "../../tools/path-detector";
import createElement from "../../tools/create-element";
import { waitUntilElementsReady, checkIfElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

/**
 * Moves topics section to its usual location.
 */
export default class TopicsFixer extends Fixer {
    /** @inheritdoc */
    isApplieble(location) {
        return isRepoRoot(location) && !isRepoSetup(location);
    }

    /** @inheritdoc */
    async waitUntilFixerReady() {
        return  (await waitUntilElementsReady("main:nth-child(1) .repository-content .BorderGrid-row")) &&
                (await checkIfElementsReady("main:nth-child(1) .repository-content .BorderGrid-cell .topic-tag"));
    }

    /** @inheritdoc */
    apply() {
        let firstTopic = document.querySelector("main .repository-content .BorderGrid-cell .topic-tag");
        document
            .querySelector("main .repository-content")
            .prepend(createElement("div", {
                className: "repository-topics-container mt-2 mb-3 js-topics-list-container",
                children: [firstTopic.parentElement]
            }));
    }
}