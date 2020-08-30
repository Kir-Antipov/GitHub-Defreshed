import { createStyleElement } from "../../tools/create-element";
import { waitUntilHeadReady } from "../../tools/wait-until-ready";
import css from "./sass/old-school-css.scss";
import settings from "../../tools/settings";
import Fixer from "../fixer";

/**
 * Injects old school css styles into the page.
 */
export default class OldSchoolCSSFixer extends Fixer {
    /** @inheritdoc */
    isApplieble() {
        return settings.useOldCSS.value && !document.querySelector("head > style[defreshed-old-school]");
    }

    /** @inheritdoc */
    waitUntilFixerReady() {
        return waitUntilHeadReady();
    }

    /** @inheritdoc */
    apply() {
        let cssElement = createStyleElement(css.toString());
        cssElement.setAttribute("defreshed-old-school", "");

        document.head.append(cssElement);
    }
}