import css from "./sass/old-school-css.scss";
import settings from "@utils/settings";
import CSSFixer from "./css-fixer";

/**
 * Injects old school css styles into the page.
 */
export default class OldSchoolCSSFixer extends CSSFixer {
    constructor() {
        super(settings.useOldCSS, css, "old-school");
    }
}