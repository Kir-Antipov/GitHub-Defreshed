import settings from "@utils/settings";
import Engine from "@utils/engine";
import Fixer from "@fixers/fixer";

/**
 * Shows preloader.
 */
export default class PreloaderStartFixer extends Fixer {
    private wasShown = false;

    async isApplieble() {
        return (
            (!this.wasShown || await settings.engine === Engine.Pjax) &&
            await settings.usePreloader
        );
    }

    apply() {
        this.wasShown = true;
        document.documentElement.classList.add("defreshing");
        document.documentElement.dataset.defreshedAt = String(new Date().valueOf());
    }
}
