import css from "@styles/readme-combined-old.scss";
import ReadmeHeaderType from "@utils/readme-header-type";
import settings from "@utils/settings";
import CSSFixer from "./css-fixer";

/**
 * Injects "combined-old" readme styles into the page.
 */
export default class CombinedOldReadmeCSSFixer extends CSSFixer {
    constructor() {
        super(settings.readmeHeaderType.then(x => x === ReadmeHeaderType.CombinedOld), css, "combined-old-readme");
    }
}
