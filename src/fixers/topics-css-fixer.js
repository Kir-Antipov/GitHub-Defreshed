import { waitUntilStyleSheetsReady } from "../tools/wait-until-ready";
import { findRule } from "../tools/find-rule";
import Fixer from "./fixer";

export default class TopicsCSSFixer extends Fixer {
    waitUntilFixerReady() {
        return waitUntilStyleSheetsReady(".topic-tag");
    }

    apply() {
        findRule(".topic-tag").parentStyleSheet.insertRule(`.topic-tag {
            display: inline-block !important;
            padding: .3em .9em !important;
            margin: 0 .5em .5em 0 !important;
            white-space: nowrap !important;
            border-radius: 3px !important;
            line-height: 1.5 !important;
            font-size: 12px !important;
            border: none !important;
        }`);
    }
}