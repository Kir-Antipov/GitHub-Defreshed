import css from "./sass/compatibility.scss";
import CSSFixer from "./css-fixer";

/**
 * Injects compatibility styles into the page.
 */
export default class CompatibilityCSSFixer extends CSSFixer {
    /** @inheritdoc */
    constructor() {
        super({ getValue: () => true }, css, "compatibility");
    }
}