import { createStyleElement } from "../tools/create-element";
import Fixer from "./fixer";

export default class BoxCSSFixer extends Fixer {
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