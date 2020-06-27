import { isRepoRoot } from "../tools/path-detector";
import Fixer from "./fixer";
import createElement from "../tools/create-element";

export default class AboutFixer extends Fixer {
    isApplieble(_, __, location) {
        return isRepoRoot(location);
    }

    apply(_document) {
        let repositoryContent = _document.querySelector(".repository-content");
        let about = _document.querySelector(".flex-shrink-0.col-12.col-md-3 .f4");
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