import { isRepoRoot, isRepoSetup } from "@utils/path-detector";
import { waitUntilElementsReady } from "@utils/wait-until-ready";
import Fixer from "@fixers/fixer";

/**
 * Moves "About" section to its usual location.
 */
export default class AboutFixer extends Fixer {
    isApplieble(location: string) {
        return isRepoRoot(location) && !isRepoSetup();
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) .repository-content .BorderGrid-row");
    }

    apply() {
        let repositoryContent = document.querySelector("main .repository-content");
        let cell = repositoryContent.querySelector(".BorderGrid-cell");
        let about = cell.querySelector(".f4");
        let firstTopic = cell.querySelector(".topic-tag");
        let topics = firstTopic ? firstTopic.parentElement : null;
        let websiteElement = cell.querySelector<HTMLAnchorElement>(".octicon-link");
        if (websiteElement) {
            websiteElement = websiteElement.parentElement.querySelector("a");
        }
        let website = websiteElement ? websiteElement.href : "";

        repositoryContent.prepend(
            <div className={topics ? "" : "mb-3"}>
                <div className="f4">
                    <span className="text-gray-dark mr-2">{ [...about.childNodes] }</span>
                    {
                        website &&
                        <span>
                            <a href={website} title={website} role="link" target="_blank" rel="noopener noreferrer">{website}</a>
                        </span>
                    }
                </div>
            </div>
        );
    }
}