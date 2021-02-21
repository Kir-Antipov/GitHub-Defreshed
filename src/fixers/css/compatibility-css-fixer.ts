import css from "./sass/compatibility.scss";
import CSSFixer from "./css-fixer";

/**
 * Injects compatibility styles into the page.
 */
export default class CompatibilityCSSFixer extends CSSFixer {
    constructor() {
        super({ getValue: () => true } as any, css, "compatibility");
    }
}