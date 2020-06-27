import Fixer from "./fixer";

export default class UserCSSFixer extends Fixer {
    apply(_document) {
        let hiddenStyle = [..._document.styleSheets]
            .find(sheet => sheet.cssRules.length == 1 && sheet.cssRules[0].selectorText == ".application-main, .footer, .sr-only");
            
        if (hiddenStyle)
            hiddenStyle.disabled = true;
    }
}