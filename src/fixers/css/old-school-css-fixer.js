import css from "./sass/old-school-css.scss";
import settings from "../../tools/settings";
import CSSFixer from "./css-fixer";

/**
 * Injects old school css styles into the page.
 */
export default class OldSchoolCSSFixer extends CSSFixer {
    /** @inheritdoc */
    constructor() {
        super(settings.useOldCSS, css, "old-school");
    }
}