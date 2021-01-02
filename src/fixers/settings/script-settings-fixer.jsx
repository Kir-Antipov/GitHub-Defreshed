import { isProfileSettings } from "../../tools/path-detector";
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

        let title = (
            <div className="Subhead Subhead--spacious">
                <h2 className="Subhead-heading">
                    GitHub-Defreshed settings
                </h2>
            </div>
        );

        let form = (
            <form className="edit_user">
                {this.generateSettings()}
                <button className="btn" type="submit" onClick={e => { e.preventDefault(); location.reload(); }}>
                    Update preference
                </button>
            </form>
        );

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
            case "string":
                return this.generateStringProperty(property);
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
        let id = `github-defreshed_${property.name}`;

        const result = (
            <div className="form-checkbox mt-0">
                <input id={id} type="checkbox" onChange={function() { property.setValue(this.checked); }}/>
                <label htmlFor={id}>{property.title}</label>
                {
                    property.description &&
                    <span className="note">{property.description}</span>
                }
            </div>
        );

        property.getValue().then(x => result.querySelector("input").checked = x);

        return result;
    }

    /**
     * Generates a section for the string option.
     *
     * @param {SettingsProperty<string>} property Target option.
     * @returns {HTMLElement} Option's section.
     */
    generateStringProperty(property) {
        let id = `github-defreshed_${property.name}`;

        const result = (
            <dl className="form-group">
                <dt>
                    <label htmlFor={id}>
                        {property.title}
                    </label>
                </dt>
                <dd>
                    <input id={id} type="text" className="form-control" onChange={function() { property.setValue(this.value); }}/>
                    {
                        property.description &&
                        <div className="note">
                            {property.description}
                        </div>
                    }
                </dd>
            </dl>
        );

        property.getValue().then(x => result.querySelector("input").value = x);

        return result;
    }
}