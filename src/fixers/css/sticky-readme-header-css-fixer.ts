import css from "@styles/readme-sticky-header.scss";
import settings from "@utils/settings";
import CSSFixer from "./css-fixer";

/**
 * Injects styles that make readme header sticky into the page.
 */
export default class StickyReadmeHeaderCSSFixer extends CSSFixer {
    constructor() {
        super(settings.enableStickyReadmeHeader, css, "sticky-readme-header");
    }
}
