import { waitUntilStyleSheetsReady } from "../tools/wait-until-ready";
import { findRule } from "../tools/find-rule";
import Fixer from "./fixer";

export default class ButtonsCSSFixer extends Fixer {
    waitUntilFixerReady() {
        return waitUntilStyleSheetsReady(".btn");
    }

    apply() {
        let styleSheet = findRule(".btn").parentStyleSheet;
        
        styleSheet.insertRule(`.btn {
            border-radius: 3px !important;
        }`);

        styleSheet.insertRule(`.repository-content .file-navigation .btn {
            padding: 3px 10px !important;
            font-size: 12px !important;
            line-height: 20px !important;
            font-weight: 600 !important;
        }`);

        styleSheet.insertRule(`#branch-select-menu svg {
            display: none !important;
        }`);

        styleSheet.insertRule(`#branch-select-menu .btn > span {
            font-weight: 600 !important;
        }`);

        styleSheet.insertRule(`.pagehead-actions .btn {
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
            padding: 3px 10px !important;
        }`);

        styleSheet.insertRule(`.pagehead-actions a.social-count {
            border-top-right-radius: 3px !important;
            border-bottom-right-radius: 3px !important;
            padding: 3px 10px !important;
        }`);
    }
}