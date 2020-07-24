import { createStyleElement } from "../tools/create-element";
import settings from "../tools/settings";
import Fixer from "./fixer";

export default class ButtonsCSSFixer extends Fixer {
    isApplieble() {
        return settings.useCSS.value;
    }

    apply() {
        document.head.append(createStyleElement(`
            .btn {
                border-radius: 3px !important;
            }

            .repository-content .file-navigation .btn {
                padding: 3px 10px !important;
                font-size: 12px !important;
                line-height: 20px !important;
                font-weight: 600 !important;
            }

            #branch-select-menu svg {
                display: none !important;
            }

            #branch-select-menu .btn > span {
                font-weight: 600 !important;
            }

            .pagehead-actions .btn {
                border-top-right-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                padding: 3px 10px !important;
            }

            .pagehead-actions a.social-count {
                border-top-right-radius: 3px !important;
                border-bottom-right-radius: 3px !important;
                padding: 3px 10px !important;
            }
        `));
    }
}