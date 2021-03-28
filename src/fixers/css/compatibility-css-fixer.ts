import css from "@styles/compatibility.scss";
import CSSFixer from "./css-fixer";

/**
 * Injects compatibility styles into the page.
 */
export default class CompatibilityCSSFixer extends CSSFixer {
    constructor() {
        super(true, css, "compatibility");
    }
}