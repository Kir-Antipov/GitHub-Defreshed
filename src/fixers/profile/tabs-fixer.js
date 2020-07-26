import { isProfile } from "../../tools/path-detector";
import { waitUntilElementsReady } from "../../tools/wait-until-ready";
import createElement from "../../tools/create-element";
import settings from "../../tools/settings";
import Fixer from "../fixer";

export default class TabsFixer extends Fixer {
    isApplieble(location) {
        return settings.defreshProfilePage.value && isProfile(location);
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady("main nav", "main:nth-child(1) div.js-profile-editable-area > :not(.vcard-details)[class]");
    }

    apply(location) {
        let container = document.querySelector("div.js-profile-editable-area > :not(.vcard-details)[class]");

        let tabs = document.querySelector("main nav");
        tabs.style.overflow = "hidden";
        tabs.append(...this._generateTabs(container, location));

        container.parentElement.removeChild(container);
        
        if (!settings.keepProfilePageIcons.value)
            [...tabs.querySelectorAll("svg")].forEach(x => x.style.display = "none");
    }

    _generateTabs(container, location) {
        let tabNames = ["stars", "followers", "following"];
        let tabSvgs = [
            null,
            null,
            `<svg height="16" class="octicon octicon-people text-gray-light" text="gray-light" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path></svg>`
        ];

        return [...container.querySelectorAll("a")]
            .filter(x => tabNames.includes(this._getTabName(x.href)))
            .sort((a, b) => tabNames.indexOf(this._getTabName(a.href)) - tabNames.indexOf(this._getTabName(b.href)))
            .map(x => this._generateTab(location, x, tabSvgs[tabNames.indexOf(this._getTabName(x.href))]))
            .filter(x => x);
    }

    _getTabName(href) {
        let separatorIndex = href.indexOf("?");
        if (separatorIndex == -1)
            return "";
        return new URLSearchParams(href.substring(separatorIndex)).get("tab");
    }

    _generateTab(location, element, defaultSvg = null) {
        let svg = element.querySelector("svg");
        if (!svg && defaultSvg)
            svg = createElement("div", { innerHTML: defaultSvg }).querySelector("svg");

        let text = this._getTabName(element.href).trim();
        text = " " + text[0].toUpperCase() + text.slice(1) + " ";

        let countElement = element.querySelector("span");
        let count = !countElement || !+countElement.innerText ? null : createElement("span", {
            className: "Counter",
            title: +countElement.innerText,
            innerText: +countElement.innerText
        });

        return createElement("a", {
            href: element.href,
            className: "UnderlineNav-item" + (this._getTabName(location) == this._getTabName(element.href) ? " selected" : ""),
            children: [
                svg,
                text,
                count
            ]
            .filter(x => x)
        });
    }
}