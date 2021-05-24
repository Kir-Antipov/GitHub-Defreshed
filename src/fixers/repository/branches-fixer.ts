import { isRepoRoot, isRepoTree, isSingleFile } from "@utils/path-detector";
import { is404, isRepoSetup } from "@utils/page-detector";
import { waitUntilElementsReady } from "@utils/wait-until-ready";
import Fixer from "@fixers/fixer";
import sleep from "@utils/sleep";

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

    async waitUntilFixerReady() {
        const wasLoaded = await waitUntilElementsReady("main:nth-child(1) #ref-list-branches");
        if (!wasLoaded) {
            return false;
        }

        const refSelector = document.querySelector<any>("#ref-list-branches ref-selector");
        if (!refSelector.index) {
            if (typeof customElements?.whenDefined === "function") {
                await customElements.whenDefined("ref-selector");
            } else {
                while (!refSelector.index) {
                    await sleep(50);
                }
            }
        }
        await refSelector.index.fetchData();
        return true;
    }
}