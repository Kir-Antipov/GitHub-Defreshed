import css from "@styles/light-header.scss";
import settings from "@utils/settings";
import CSSFixer from "./css-fixer";

/**
 * Injects old school css styles into the page.
 */
export default class LightHeaderCSSFixer extends CSSFixer {
    constructor() {
        super(settings.enableLightHeader, css, "light-header");
    }
}
