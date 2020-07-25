import { isRepoRoot } from "../../tools/path-detector";
import createElement from "../../tools/create-element";
import { waitUntilElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

export default class LanguageBarFixer extends Fixer {
    isApplieble(location) {
        return isRepoRoot(location);
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady({
            selectors: ["main:nth-child(1) .flex-shrink-0.col-12.col-md-3 .Progress"],
            timeout: 300
        });
    }

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
            ]
        });

        let languagesData = [...document.querySelector(".flex-shrink-0.col-12.col-md-3 .Progress").parentElement.nextElementSibling.children];
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