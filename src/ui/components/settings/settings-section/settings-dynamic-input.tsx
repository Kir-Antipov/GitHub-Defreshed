import SettingsText from "./settings-text";
import SettingsInput from "./settings-input";
import SettingsCheckbox from "./settings-checkbox";
import SettingsSelect from "./settings-select";

export default class SettingsDynamicInput extends SettingsInput<any> {
    render() {
        switch (typeof this.props.property.defaultValue) {
            case "boolean":
                return <SettingsCheckbox {...this.props}/>;
            case "string":
                return this.props.property.options
                    ? <SettingsSelect {...this.props}/>
                    : <SettingsText {...this.props}/>;
            default:
                return null;
        }
    }
}