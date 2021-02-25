import settings from "@utils/settings";
import Engines from "@utils/engines";
import Fixer from "@fixers/fixer";

/**
 * Shows preloader.
 */
export default class PreloaderStartFixer extends Fixer {
    private wasShown = false;

    async isApplieble() {
        return (
            (!this.wasShown || await settings.engine.getValue() === Engines.Pjax) &&
            await settings.usePreloader.getValue()
        );
    }

    apply() {
        this.wasShown = true;
        document.documentElement.classList.add("defreshing");
        document.documentElement.dataset.defreshedAt = String(new Date().valueOf());
    }
}
