import { waitUntilStyleSheetsReady } from "../tools/wait-until-ready";
import { findRule } from "../tools/find-rule";
import Fixer from "./fixer";

export default class BoxCSSFixer extends Fixer {
    waitUntilFixerReady() {
        return waitUntilStyleSheetsReady(".Box");
    }

    apply() {
        let styleSheet = findRule(".Box").parentStyleSheet;
        
        styleSheet.insertRule(`div.Box, .markdown-body pre {
            border-radius: 3px !important;
        }`);

        styleSheet.insertRule(`div.Box-header {
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
        }`);
    }
}