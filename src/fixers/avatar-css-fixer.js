import { waitUntilStyleSheetsReady } from "../tools/wait-until-ready";
import { findRule } from "../tools/find-rule";
import Fixer from "./fixer";

export default class AvatarCSSFixer extends Fixer {
    waitUntilFixerReady() {
        return waitUntilStyleSheetsReady(".avatar");
    }

    apply() {
        findRule(".avatar").parentStyleSheet.insertRule(`img.avatar, img.avatar-user, a.avatar-user {
            border-radius: 3px !important;
        }`);
    }
}