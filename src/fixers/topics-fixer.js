import { isRepoRoot } from "../tools/path-detector";
import createElement from "../tools/create-element";
import waitUntilReady from "../tools/wait-until-ready";
import Fixer from "./fixer";

export default class TopicsFixer extends Fixer {
    isApplieble(location) {
        return isRepoRoot(location);
    }

    waitUntilFixerReady() {
        return waitUntilReady({ 
            selectors: ["main:nth-child(1) .flex-shrink-0.col-12.col-md-3 div.list-topics-container.f6"],
            timeout: 300 
        });
    }

    apply() {
        let topics = document.querySelector(".flex-shrink-0.col-12.col-md-3 div.list-topics-container.f6");

        if (topics) {
            document
                .querySelector(".repository-content")
                .prepend(createElement("div", {
                    className: "repository-topics-container mt-2 mb-3 js-topics-list-container",
                    children: [topics]
                }));
        }
    }
}