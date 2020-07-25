import { isRepoRoot } from "../../tools/path-detector";
import createElement from "../../tools/create-element";
import { waitUntilElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

export default class AboutFixer extends Fixer {
    isApplieble(location) {
        return isRepoRoot(location);
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady({ 
            selectors: ["main:nth-child(1) .flex-shrink-0.col-12.col-md-3 .f4"],
            timeout: 300 
        });
    }

    apply() {
        let repositoryContent = document.querySelector(".repository-content");
        let about = document.querySelector(".flex-shrink-0.col-12.col-md-3 .f4");
        let topics = repositoryContent.querySelector("div.list-topics-container.f6");

        if (about) {
            repositoryContent
                .prepend(createElement("div", {
                    className: topics ? "" : "mb-3",
                    children: [
                        createElement("div", {
                            className: "f4",
                            innerHTML: about.innerHTML
                        })
                    ]
                }));
        }
    }
}