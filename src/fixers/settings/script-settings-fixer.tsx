import { isProfileSettings } from "@utils/path-detector";
import { waitUntilElementsReady } from "@utils/wait-until-ready";
import { settings, SettingsProperty } from "@utils/settings";
import config from "@config";
import Fixer from "@fixers/fixer";

/**
 * Generates a section with script settings at https://github.com/settings/profile.
 */
export default class ScriptSettingsFixer extends Fixer {
    isApplieble(location: string) {
        return isProfileSettings(location);
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady(".Subhead--spacious");
    }

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
     */
    generateProperty(property: SettingsProperty) {
        switch (typeof property.defaultValue) {
            case "boolean":
                return this.generateBooleanProperty(property as SettingsProperty<boolean>);
            case "string":
                return this.generateStringProperty(property as SettingsProperty<string>);
            default:
                return null;
        }
    }

    /**
     * Generates a section for the boolean option.
     */
    generateBooleanProperty(property: SettingsProperty<boolean>) {
        let id = `${config.name}_${property.name}`;

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
     */
    generateStringProperty(property: SettingsProperty<string>) {
        let id = `${config.name}_${property.name}`;

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