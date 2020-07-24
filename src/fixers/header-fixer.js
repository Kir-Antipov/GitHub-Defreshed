import { isRepo, isProject } from "../tools/path-detector";
import { waitUntilElementsReady } from "../tools/wait-until-ready";
import Fixer from "./fixer";

export default class HeaderFixer extends Fixer {
    isApplieble(location) {
        return isRepo(location);
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) > div > nav");
    }

    apply(location) {
        let header = document.querySelector("main > div > nav").parentElement;

        if (!isProject(location)) {
            header.className = "pagehead repohead hx_repohead readability-menu bg-gray-light pb-0 pt-3";
            header.firstElementChild.className = "d-flex container-lg mb-4 px-3";
        }
        header.querySelector("nav").className = "js-repo-nav js-sidenav-container-pjax clearfix hx_reponav reponav px-3 container-lg";
        header.querySelector("nav > ul").className = "list-style-none";

        [...header.querySelectorAll("nav > ul > li")].forEach(tabWrapper => {
            tabWrapper.className = "";
            let tab = tabWrapper.querySelector("a");
            let selected = tab.classList.contains("selected");
            tab.className = "js-selected-navigation-item reponav-item" + (selected ? " selected" : "");
        });
    }
}