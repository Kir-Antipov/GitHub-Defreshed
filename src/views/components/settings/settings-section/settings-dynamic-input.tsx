import SettingsText from "./settings-text";
import SettingsInput from "./settings-input";
import SettingsCheckbox from "./settings-checkbox";

export default class SettingsDynamicInput extends SettingsInput<any> {
    render() {
        switch (typeof this.props.property.defaultValue) {
            case "boolean":
                return <SettingsCheckbox {...this.props}/>;
            case "string":
                return <SettingsText {...this.props}/>;
            default:
                return null;
        }
    }
}