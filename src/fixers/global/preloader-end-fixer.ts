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
        classList.remove("defreshing");

        const startedAt = +document.documentElement.dataset.defreshedAt;
        delete document.documentElement.dataset.defreshedAt;

        const defreshingTook = new Date().valueOf() - startedAt;
        // This should be in the settings section,
        // but I'm in lazy mood right now.
        // Let's see if anyone will complain ¯\_(ツ)_/¯
        const minimumAmountOfTimeItTakesToNoticePreloader = 100;

        if (defreshingTook > minimumAmountOfTimeItTakesToNoticePreloader) {
            classList.add("defreshed");
            await sleep(1500);
            classList.remove("defreshed");
        }
    }
}
