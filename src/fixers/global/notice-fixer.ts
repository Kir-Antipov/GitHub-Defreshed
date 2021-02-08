import Fixer from "@fixers/fixer";

/**
 * Automatically closes notifications on page reload.
 */
export default class NoticeFixer extends Fixer {
    apply() {
        [...document.querySelectorAll(".js-notification-top-shelf[closing], div#js-flash-container[closing]")]
            .forEach(x => x.remove());

        [...document.querySelectorAll(".js-notification-top-shelf, div#js-flash-container")]
            .forEach(x => x.setAttribute("closing", ""));
    }
}