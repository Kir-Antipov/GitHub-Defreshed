import { isProfileSettings } from "../../tools/path-detector";
import createElement from "../../tools/create-element";
import { waitUntilElementsReady } from "../../tools/wait-until-ready";
import Fixer from "../fixer";
import { settings, SettingsProperty } from "../../tools/settings";

/**
 * Generates a section with script settings at https://github.com/settings/profile.
 */
export default class ScriptSettingsFixer extends Fixer {
    /** @inheritdoc */
    isApplieble(location) {
        return isProfileSettings(location);
    }

    /** @inheritdoc */
    waitUntilFixerReady() {
        return waitUntilElementsReady(".Subhead--spacious");
    }

    /** @inheritdoc */
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

    /**
     * Generates sections for all settings' options.
     */
    generateSettings() {
        return settings.map(x => this.generateProperty(x));
    }

    /**
     * Generates a section for the specified option.
     * 
     * @param {SettingsProperty<*>} property Target option.
     * @returns {HTMLElement} Option's section.
     */
    generateProperty(property) {
        switch (typeof property.defaultValue) {
            case "boolean":
                return this.generateBooleanProperty(property);
            default:
                return null;
        }
    }

    /**
     * Generates a section for the boolean option.
     * 
     * @param {SettingsProperty<boolean>} property Target option.
     * @returns {HTMLElement} Option's section.
     */
    generateBooleanProperty(property) {
        let checkbox = createElement("input", {
            id: `github-defreshed_${property.name}`,
            type: "checkbox",
            checked: property.value
        });
        checkbox.addEventListener("change", function () {
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