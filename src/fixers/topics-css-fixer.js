import { createStyleElement } from "../tools/create-element";
import settings from "../tools/settings";
import Fixer from "./fixer";

export default class TopicsCSSFixer extends Fixer {
    isApplieble() {
        return settings.useCSS.value;
    }

    apply() {
        document.head.append(createStyleElement(`.topic-tag {
            display: inline-block !important;
            padding: .3em .9em !important;
            margin: 0 .5em .5em 0 !important;
            white-space: nowrap !important;
            border-radius: 3px !important;
            line-height: 1.5 !important;
            font-size: 12px !important;
            border: none !important;
        }`));
    }
}