import { createStyleElement } from "../../tools/create-element";
import { waitUntilHeadReady } from "../../tools/wait-until-ready";
import css from "./sass/index.scss";
import settings from "../../tools/settings";
import Fixer from "../fixer";

/**
 * Injects custom css styles into the page.
 */
export default class CSSFixer extends Fixer {
    /** @inheritdoc */
    isApplieble() {
        return settings.useCSS.value;
    }

    /** @inheritdoc */
    waitUntilFixerReady() {
        return waitUntilHeadReady();
    }

    /** @inheritdoc */
    apply() {
        if (document.querySelector("head > style[defreshed]"))
            return;

        let cssElement = createStyleElement(css.toString());
        cssElement.setAttribute("defreshed", "");

        document.head.append(cssElement);
    }
}