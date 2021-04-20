import Fixer from "@fixers/fixer";
import settings from "@utils/settings";
import ToolbarType from "@utils/toolbar-type";

/**
 * Adjusts the thickness of the toolbars.
 */
export default class ToolbarCSSFixer extends Fixer {
    async isApplieble() {
        return await settings.useOldCSS;
    }

    async apply() {
        // TODO: turn this into actual CSS
        switch (await settings.toolbarType) {
            case ToolbarType.OldSchool:
                document.documentElement.style.setProperty("--box-header-padding", "10.6px 12px");
                break;
            case ToolbarType.FatAsHeck:
                document.documentElement.style.setProperty("--box-header-padding", "16px");
                break;
            default:
                break;
        }
    }
}
