import { isProfileSettings } from "../tools/path-detector";
import createElement from "../tools/create-element";
import { waitUntilElementsReady } from "../tools/wait-until-ready";
import Fixer from "./fixer";
import settings from "../tools/settings";

export default class SettingsFixer extends Fixer {
    isApplieble(location) {
        return isProfileSettings(location);
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady(".Subhead--spacious");
    }

    apply() {
        let nextTitle = document.querySelector(".Subhead--spacious");
        
        let title = createElement("div", { 
            className: "Subhead Subhead--spacious",
            children: [createElement("h2", {
                className: "Subhead-heading",
                innerText: "GitHub-Defreshed settings"
            })]
        });

        let fakeButton = createElement("button", {
            className: "btn",
            type: "submit",
            innerText: "Update preferences"
        });
        fakeButton.addEventListener("click", function (e) {
            e.preventDefault();
            location.reload();
        });

        let form = createElement("form", {
            className: "edit_user",
            children: [...this.generateSettings().filter(x => x), fakeButton]
        });

        nextTitle.parentElement.insertBefore(title, nextTitle);
        nextTitle.parentElement.insertBefore(form, nextTitle);
    }

    generateSettings() {
        return settings.map(x => this.generateProperty(x));
    }

    generateProperty(property) {
        switch (typeof property.defaultValue) {
            case "boolean":
                return this.generateBooleanProperty(property);
            default:
                return null;
        }
    }

    generateBooleanProperty(property) {
        let checkbox = createElement("input", {
            id: `github-defreshed_${property.name}`,
            type: "checkbox",
            checked: property.value
        });
        checkbox.addEventListener("change", function (e) {
            property.value = this.checked;
        });

        let label = createElement("label", { 
            for: checkbox.id,
            innerText: property.title
        });

        let description = property.description ? createElement("span", {
            className: "note",
            innerText: property.description
        }) : null;

        return createElement("div", {
            className: "form-checkbox mt-0",
            children: [
                checkbox,
                label,
                description
            ]
            .filter(x => x)
        });
    }
}