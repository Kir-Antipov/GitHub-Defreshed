import { waitUntilStyleSheetsReady } from "../tools/wait-until-ready";
import { findRule } from "../tools/find-rule";
import Fixer from "./fixer";

export default class SummaryCSSFixer extends Fixer {
    waitUntilFixerReady() {
        return waitUntilStyleSheetsReady(".overall-summary");
    }

    apply() {
        let styleSheet = findRule(".overall-summary").parentStyleSheet;
        
        styleSheet.insertRule(`.overall-summary {
            border-radius: 3px !important;
        }`);

        styleSheet.insertRule(`.repository-lang-stats-graph {
            border-bottom-left-radius: 3px !important;
            border-bottom-right-radius: 3px !important;
        }`);

        styleSheet.insertRule(`.repository-lang-stats-graph .language-color:first-child {
            border-bottom-left-radius: 3px !important;
        }`);

        styleSheet.insertRule(`.repository-lang-stats-graph .language-color:last-child {
            border-bottom-right-radius: 3px !important;
        }`);
    }
}