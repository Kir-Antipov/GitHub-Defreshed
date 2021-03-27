import defresh from "@utils/defresh";
import settings from "@utils/settings";
import Engine from "@utils/engine";
import Fixer from "@fixers/fixer";

/**
 * Subscribes to pjax events.
 */
export default class PjaxFixer extends Fixer {
    private isActive = false;

    async isApplieble() {
        return !this.isActive && await settings.engine.getValue() === Engine.Pjax;
    }

    apply() {
        this.isActive = true;
        document.addEventListener("pjax:success", () => defresh());
    }
}