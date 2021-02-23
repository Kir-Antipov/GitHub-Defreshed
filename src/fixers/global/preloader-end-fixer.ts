import sleep from "@utils/sleep";
import Fixer from "@fixers/fixer";

/**
 * Hides preloader.
 */
export default class PreloaderEndFixer extends Fixer {
    isApplieble() {
        return document.documentElement.classList.contains("defreshing");
    }

    async apply() {
        const classList = document.documentElement.classList;
        classList.add("defreshed");
        classList.remove("defreshing");
        await sleep(1500);
        classList.remove("defreshed");
    }
}
