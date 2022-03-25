import { isRepoRoot } from "@utils/path-detector";
import { is404, isRepoSetup } from "@utils/page-detector";
import { waitUntilElementsReady } from "@utils/wait-until-ready";
import AboutContainer from "@components/repository/about-container";
import Fixer from "@fixers/fixer";

/**
 * Moves "About" section to its usual location.
 */
export default class AboutFixer extends Fixer {
    isApplieble(location: string) {
        return isRepoRoot(location) && !isRepoSetup() && !is404();
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) .repository-content .BorderGrid-row");
    }

    apply() {
        const repositoryContent = document.querySelector("main .repository-content > div");
        const cell = repositoryContent.querySelector(".BorderGrid-cell");
        const about = cell.querySelector(".f4");
        const website = cell
            .querySelector(".octicon-link")
            ?.parentElement
            .querySelector("a")
            ?.href;

        repositoryContent.prepend(
            <AboutContainer website={website}>
                {about.childNodes}
            </AboutContainer>
        );
    }
}