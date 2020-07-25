import { createStyleElement } from "../../tools/create-element";
import settings from "../../tools/settings";
import Fixer from "../fixer";

export default class BoxCSSFixer extends Fixer {
    isApplieble() {
        return settings.useCSS.value;
    }

    apply() {
        document.head.append(createStyleElement(`
            div.Box, .markdown-body pre {
                border-radius: 3px !important;
            }
            
            div.Box-header {
                border-top-left-radius: 3px;
                border-top-right-radius: 3px;
            }
        `));
    }
}