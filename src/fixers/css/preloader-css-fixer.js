import { createStyleElement } from "../../tools/create-element";
import { waitUntilHeadReady } from "../../tools/wait-until-ready";
import css from "./sass/preloader.scss";
import settings from "../../tools/settings";
import Fixer from "../fixer";

/**
 * Injects preloader styles into the page.
 */
export default class PreloaderCSSFixer extends Fixer {
    /** @inheritdoc */
    isApplieble() {
        return settings.usePreloader.value && !document.querySelector("head > style[defreshed-preloader]");
    }

    /** @inheritdoc */
    waitUntilFixerReady() {
        return waitUntilHeadReady();
    }

    /** @inheritdoc */
    apply() {
        let cssElement = createStyleElement(css.toString());
        cssElement.setAttribute("defreshed-preloader", "");

        document.head.append(cssElement);
    }
}