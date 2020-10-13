import { isRepoRoot } from "../../tools/path-detector";
import createElement from "../../tools/create-element";
import { waitUntilElementsReady, checkIfElementsReady } from "../../tools/wait-until-ready";
import settings from "../../tools/settings";
import Fixer from "../fixer";

/**
 * Revives classical repository languages statistics bar.
 */
export default class LanguageBarFixer extends Fixer {
    /** @inheritdoc */
    isApplieble(location) {
        return isRepoRoot(location);
    }

    /** @inheritdoc */
    async waitUntilFixerReady() {
        return  (await waitUntilElementsReady("main:nth-child(1) .BorderGrid-row:last-child")) &&
                (await checkIfElementsReady("main:nth-child(1) .BorderGrid-row .Progress"));
    }

    /** @inheritdoc */
    apply() {
        let langsBar = createElement("div", "d-flex repository-lang-stats-graph");
        let langsContainer = createElement("ol", "repository-lang-stats-numbers");
        let langsWrapper = createElement("details", {
            className: "details-reset mb-3",
            children: [
                createElement("summary", {
                    title: "Click for language details",
                    children: [langsBar]
                }),
                createElement("div", {
                    className: "repository-lang-stats",
                    children: [langsContainer]
                })
            ],
            attributes: settings.openLanguagesByDefault.value ? { open: "" } : { }
        });

        let languagesData = [...document.querySelector("main .BorderGrid-row .Progress").parentElement.nextElementSibling.children];
        for (let langData of languagesData.map(this._extractLanguageData)) {
            let barItem = createElement("span", {
                className: "language-color",
                attributes: {
                    "aria-label": `${langData.name} ${langData.percent}`,
                    "itemprop": "keywords"
                },
                innerText: langData.name,
                style: {
                    width: langData.percent,
                    backgroundColor: langData.color
                }
            });
            langsBar.append(barItem);

            let langItem = createElement(langData.link ? "a" : "span", {
                href: langData.link,
                children: [
                    createElement("span", {
                        className: "color-block language-color",
                        style: {
                            backgroundColor: langData.color
                        }
                    }),
                    createElement("span", {
                        className: "lang",
                        innerText: ` ${langData.name} `
                    }),
                    createElement("span", {
                        className: "percent",
                        innerText: langData.percent
                    })
                ]
            });
            langsContainer.append(createElement("li", { children: [langItem] }));
        }

        document.querySelector(".repository-content").prepend(langsWrapper);
    }

    /**
     * Extracts language details from the DOM element.
     *
     * @param {HTMLElement} element Language element.
     * @returns {{ name: string, percent: string, color: string, link: string }}
     * Language details.
     */
    _extractLanguageData(element) {
        if (element.querySelector("a")) {
            return {
                name: element.querySelector("span").innerText,
                percent: element.querySelectorAll("span")[1].innerText,
                color: element.querySelector("svg").style.color,
                link: element.querySelector("a").href
            };
        } else {
            return {
                name: element.querySelectorAll("span")[1].innerText,
                percent: element.querySelectorAll("span")[2].innerText,
                color: element.querySelector("svg").style.color,
                link: ""
            }
        }
    }
}