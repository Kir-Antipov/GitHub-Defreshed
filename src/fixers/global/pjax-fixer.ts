import defresh from "@utils/defresh";
import settings from "@utils/settings";
import Engines from "@utils/engines";
import Fixer from "@fixers/fixer";

/**
 * Subscribes to pjax events.
 */
export default class PjaxFixer extends Fixer {
    private isActive = false;

    async isApplieble() {
        return !this.isActive && await settings.engine.getValue() === Engines.Pjax;
    }

    apply() {
        this.isActive = true;
        document.addEventListener("pjax:success", () => defresh());
    }
}