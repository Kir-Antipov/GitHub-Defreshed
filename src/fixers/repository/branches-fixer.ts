import { getOwnerAndRepo, isRepoRoot, isRepoTree, isSingleFile } from "@utils/path-detector";
import { is404, isRepoSetup } from "@utils/page-detector";
import { waitUntilElementsReady } from "@utils/wait-until-ready";
import Fixer from "@fixers/fixer";

/**
 * Waits for the list of repository branches to be loaded.
 */
export default class BranchesFixer extends Fixer {
    isApplieble(location: string) {
        return (
            (isRepoRoot(location) || isRepoTree(location) || isSingleFile(location)) &&
            !(isRepoSetup() || is404())
        );
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) #ref-list-branches", "main:nth-child(1) #ref-list-branches ref-selector");
    }

    async apply(location: string) {
        const refSelector = document.querySelector<any>("#ref-list-branches ref-selector");
        if (typeof customElements?.whenDefined === "function") {
            await customElements.whenDefined("ref-selector");
        }

        if (typeof refSelector.index?.fetchData === "function") {
            await refSelector.index.fetchData();
        } else {
            const { owner, repo } = getOwnerAndRepo(location);
            const branchesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches`);
            if (branchesResponse.ok) {
                const branches = (await branchesResponse.json() as [{ name: string }]).map(x => x.name);
                refSelector.index = {
                    currentSearchResult: branches
                };
            } else {
                const branches = [...document.querySelectorAll<HTMLSpanElement>("#ref-list-branches .SelectMenu-list a > span:not(.Label)")]
                    .map(x => x.innerText && x.innerText.trim())
                    .filter(x => x);
                refSelector.index = {
                    currentSearchResult: branches
                };
            }
        }
    }
}