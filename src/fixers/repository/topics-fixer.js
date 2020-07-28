import { isRepoRoot } from "../../tools/path-detector";
import createElement from "../../tools/create-element";
import { waitUntilElementsReady, checkIfElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";

export default class TopicsFixer extends Fixer {
    isApplieble(location) {
        return isRepoRoot(location);
    }

    async waitUntilFixerReady() {
        return  (await waitUntilElementsReady("main:nth-child(1) .repository-content .BorderGrid-row")) &&
                (await checkIfElementsReady("main:nth-child(1) .repository-content .BorderGrid-cell .topic-tag"));
    }

    apply() {
        let firstTopic = document.querySelector("main .repository-content .BorderGrid-cell .topic-tag");
        document
            .querySelector("main .repository-content")
            .prepend(createElement("div", {
                className: "repository-topics-container mt-2 mb-3 js-topics-list-container",
                children: [firstTopic.parentElement]
            }));
    }
}