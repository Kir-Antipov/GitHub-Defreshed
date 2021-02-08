import { isRepoRoot, isRepoSetup } from "@utils/path-detector";
import { waitUntilElementsReady, checkIfElementsReady } from "@utils/wait-until-ready";
import Fixer from "@fixers/fixer";

/**
 * Moves topics section to its usual location.
 */
export default class TopicsFixer extends Fixer {
    isApplieble(location: string) {
        return isRepoRoot(location) && !isRepoSetup();
    }

    async waitUntilFixerReady() {
        return  (await waitUntilElementsReady("main:nth-child(1) .repository-content .BorderGrid-row")) &&
                (await checkIfElementsReady("main:nth-child(1) .repository-content .BorderGrid-cell .topic-tag"));
    }

    apply() {
        let firstTopic = document.querySelector("main .repository-content .BorderGrid-cell .topic-tag");
        document
            .querySelector("main .repository-content")
            .prepend(
                <div className="repository-topics-container mt-2 mb-3 js-topics-list-container">
                    {firstTopic.parentElement}
                </div>
            );
    }
}