import SettingsInput from "./settings-input";
import SettingsNote from "./settings-note";

export default class SettingsText extends SettingsInput<string> {
    render() {
        const property = this.props.property;
        return (
            <dl className="form-group">
                <dt>
                    <label htmlFor={this.id}>
                        {property.title}
                    </label>
                </dt>
                <dd>
                    <input
                        id={this.id}
                        type="text"
                        className="form-control"
                        onChange={function () { property.setValue(this.value); }}
                        ref={input => property.then(x => input.value = x)}
                    />
                    <SettingsNote text={property.description}/>
                </dd>
            </dl>
        );
    }
}