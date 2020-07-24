import { createStyleElement } from "../tools/create-element";
import settings from "../tools/settings";
import Fixer from "./fixer";

export default class SummaryCSSFixer extends Fixer {
    isApplieble() {
        return settings.useCSS.value;
    }

    apply() {
        document.head.append(createStyleElement(`
            .overall-summary {
                border-radius: 3px !important;
            }

            .repository-lang-stats-graph {
                border-bottom-left-radius: 3px !important;
                border-bottom-right-radius: 3px !important;
            }

            .repository-lang-stats-graph .language-color:first-child {
                border-bottom-left-radius: 3px !important;
            }

            .repository-lang-stats-graph .language-color:last-child {
                border-bottom-right-radius: 3px !important;
            }
        `));
    }
}