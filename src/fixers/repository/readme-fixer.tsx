import { isRepoRoot, isRepoTree } from "@utils/path-detector";
import { is404, isRepoSetup } from "@utils/page-detector";
import { waitUntilElementsReady, checkIfElementsReady } from "@utils/wait-until-ready";
import { BookIcon } from "@primer/octicons-react";
import Fixer from "@fixers/fixer";

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

    apply() {
        const readme = document.querySelector("#readme");
        readme.className = "Box md js-code-block-container Box--condensed";

        const header = readme.querySelector(".Box-header");
        header.className = "Box-header d-flex flex-items-center flex-justify-between";

        const title = readme.querySelector(".Box-title.pr-3");
        title.prepend(<BookIcon />);
    }
}