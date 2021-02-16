import SettingsInput from "./settings-input";

export default class SettingsCheckbox extends SettingsInput<boolean> {
    render() {
        const property = this.props.property;
        return (
            <div className="form-checkbox mt-0">
                <input
                    id={this.id}
                    type="checkbox"
                    onChange={function() { property.setValue(this.checked); }}
                    ref={input => property.getValue().then(x => input.checked = x)}
                />
                <label htmlFor={this.id}>{property.title}</label>
                { property.description &&
                    <span className="note">{property.description}</span>
                }
            </div>
        );
    }
}