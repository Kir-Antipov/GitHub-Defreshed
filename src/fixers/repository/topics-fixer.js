import { isRepoRoot } from "../../tools/path-detector";
import createElement from "../../tools/create-element";
import { waitUntilElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

export default class TopicsFixer extends Fixer {
    isApplieble(location) {
        return isRepoRoot(location);
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady({ 
            selectors: ["main:nth-child(1) .repository-content a.topic-tag.topic-tag-link"],
            timeout: 300 
        });
    }

    apply() {
        let topic = document.querySelector("main:nth-child(1) .repository-content a.topic-tag.topic-tag-link");

        if (topic) {
            document
                .querySelector(".repository-content")
                .prepend(createElement("div", {
                    className: "repository-topics-container mt-2 mb-3 js-topics-list-container",
                    children: [topic.parentElement]
                }));
        }
    }
}