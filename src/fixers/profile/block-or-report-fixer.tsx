import { isProfile } from "@utils/path-detector";
import { is404 } from "@utils/page-detector";
import { waitUntilElementsReady, checkIfElementsReady } from "@utils/wait-until-ready";
import settings from "@utils/settings";
import ActionsContainer from "@components/profile/actions-container";
import Fixer from "@fixers/fixer";

/**
 * Moves "Block or report user" button to its usual location.
 */
export default class BlockOrReportFixer extends Fixer {
    async isApplieble(location: string) {
        return await settings.defreshProfilePage.getValue() && isProfile(location) && !is404();
    }

    async waitUntilFixerReady() {
        return (
            await waitUntilElementsReady("main:nth-child(1) .h-card") &&
            await checkIfElementsReady("main:nth-child(1) #blob-more-options-details")
        );
    }

    apply() {
        const container = document.querySelector("#blob-more-options-details");

        const reportBlock = container.querySelector("details").parentElement;
        const userInfo = document.querySelector("main .h-card");
        userInfo.append(
            <ActionsContainer>
                {reportBlock}
            </ActionsContainer>
        );

        container.parentElement.remove();
    }
}