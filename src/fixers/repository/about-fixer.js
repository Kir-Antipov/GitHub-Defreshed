import { isRepoRoot } from "../../tools/path-detector";
import createElement from "../../tools/create-element";
import { waitUntilElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

/**
 * Moves "About" section to its usual location.
 */
export default class AboutFixer extends Fixer {
    /** @inheritdoc */
    isApplieble(location) {
        return isRepoRoot(location);
    }

    /** @inheritdoc */
    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) .repository-content .BorderGrid-row");
    }

    /** @inheritdoc */
    apply() {
        let repositoryContent = document.querySelector("main .repository-content");
        let cell = repositoryContent.querySelector(".BorderGrid-cell");
        let about = cell.querySelector(".f4");
        let firstTopic = cell.querySelector(".topic-tag");
        let topics = firstTopic ? firstTopic.parentElement : null;
        let websiteElement = cell.querySelector(".octicon-link");
        if (websiteElement)
            websiteElement = websiteElement.parentElement.querySelector("a");
        let website = websiteElement ? websiteElement.href : "";

        repositoryContent
            .prepend(createElement("div", {
                className: topics ? "" : "mb-3",
                children: [
                    createElement("div", {
                        className: "f4",
                        children: [
                            createElement("span", {
                                className: "text-gray-dark mr-2",
                                innerHTML: about.innerHTML
                            }),
                            website ? createElement("span", {
                                children: [createElement("a", {
                                    href: website,
                                    title: website,
                                    role: "link",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    innerText: website
                                })]
                            }) : null
                        ]
                        .filter(x => x)
                    })
                ]
            }));
    }
}