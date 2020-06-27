import Fixer from "./fixer";

export default class UserCSSFixer extends Fixer {
    apply() {
        let hiddenStyle = [...document.styleSheets]
            .find(sheet => sheet.cssRules.length == 1 && sheet.cssRules[0].selectorText == ".application-main, .footer, .sr-only");
            
        if (hiddenStyle)
            hiddenStyle.disabled = true;
    }
}