import { createStyleElement } from "../tools/create-element";
import Fixer from "./fixer";

export default class AvatarCSSFixer extends Fixer {
    apply() {
        document.head.append(createStyleElement(`img.avatar, img.avatar-user, a.avatar-user {
            border-radius: 3px !important;
        }`));
    }
}