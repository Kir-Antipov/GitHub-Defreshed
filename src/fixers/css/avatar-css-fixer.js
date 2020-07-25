import { createStyleElement } from "../../tools/create-element";
import settings from "../../tools/settings";
import Fixer from "../fixer";

export default class AvatarCSSFixer extends Fixer {
    isApplieble() {
        return settings.useCSS.value;
    }

    apply() {
        document.head.append(createStyleElement(`img.avatar, img.avatar-user, a.avatar-user {
            border-radius: 3px !important;
        }`));
    }
}