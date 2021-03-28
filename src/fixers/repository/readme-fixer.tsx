import { isRepoRoot, isRepoTree } from "@utils/path-detector";
import { is404, isRepoSetup } from "@utils/page-detector";
import { waitUntilElementsReady, checkIfElementsReady } from "@utils/wait-until-ready";
import { BookIcon } from "@primer/octicons-react";
import Fixer from "@fixers/fixer";
import settings from "@utils/settings";
import ReadmeHeaderType from "@utils/readme-header-type";

/**
 * Returns the classic look of the README.
 */
export default class ReadmeFixer extends Fixer {
    isApplieble(location: string) {
        return (isRepoRoot(location) || isRepoTree(location)) && !isRepoSetup() && !is404();
    }

    async waitUntilFixerReady() {
        return (
            await waitUntilElementsReady("main:nth-child(1) .repository-content") &&
            await checkIfElementsReady("main:nth-child(1) #readme")
        );
    }

    async apply() {
        const readme = document.querySelector("#readme");
        readme.className = "Box md js-code-block-container Box--condensed";

        const header = readme.firstElementChild;
        header.className = "Box-header d-flex flex-items-center flex-justify-between";
        header.removeAttribute("style");

        const title = readme.querySelector(".Box-title");
        const titleContainer = title.parentElement;
        switch (await settings.readmeHeaderType) {
            case ReadmeHeaderType.New:
                break;

            case ReadmeHeaderType.CombinedNew:
            case ReadmeHeaderType.CombinedOld:
                const icon = titleContainer.querySelector("details svg");
                icon.replaceWith(<BookIcon />);
                break;

            case ReadmeHeaderType.Old:
                titleContainer.querySelector("details")?.remove();
                title.className = "Box-title";
                title.prepend(<BookIcon />);
                break;

            default:
                break;
        }
    }
}
