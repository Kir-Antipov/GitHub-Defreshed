import { createStyleElement } from "../../tools/create-element";
import { waitUntilHeadReady } from "../../tools/wait-until-ready";
import css from "./sass/index.scss";
import settings from "../../tools/settings";
import Fixer from "../fixer";

export default class CSSFixer extends Fixer {
    isApplieble() {
        return settings.useCSS.value;
    }

    waitUntilFixerReady() {
        return waitUntilHeadReady();
    }

    apply() {
        if (document.querySelector("head > style[defreshed]"))
            return;

        let cssElement = createStyleElement(css.toString());
        cssElement.setAttribute("defreshed", "");

        document.head.append(cssElement);
    }
}