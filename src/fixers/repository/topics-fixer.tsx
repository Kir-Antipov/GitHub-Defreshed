import { isRepoRoot, isRepoSetup } from "@utils/path-detector";
import { waitUntilElementsReady, checkIfElementsReady } from "@utils/wait-until-ready";
import TopicsContainer from "@components/repository/topics-container";
import Fixer from "@fixers/fixer";

/**
 * Moves topics section to its usual location.
 */
export default class TopicsFixer extends Fixer {
    isApplieble(location: string) {
        return isRepoRoot(location) && !isRepoSetup();
    }

    async waitUntilFixerReady() {
        return (
            await waitUntilElementsReady("main:nth-child(1) .repository-content .BorderGrid-row") &&
            await checkIfElementsReady("main:nth-child(1) .repository-content .BorderGrid-cell .topic-tag")
        );
    }

    apply() {
        const firstTopic = document.querySelector("main .repository-content .BorderGrid-cell .topic-tag");
        document
            .querySelector("main .repository-content")
            .prepend(
                <TopicsContainer>
                    {firstTopic.parentElement}
                </TopicsContainer>
            );
    }
}