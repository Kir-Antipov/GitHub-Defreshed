import SettingsInput from "./settings-input";
import SettingsNote from "./settings-note";

export default class SettingsSelect extends SettingsInput<string> {
    render() {
        const property = this.props.property;
        const value = property.getValue();
        return (
            <dl class="form-group">
                <dt>
                    <label htmlFor={this.id}>
                        {property.title}
                    </label>
                </dt>
                <dd>
                    <select
                        id={this.id}
                        className="form-select form-control"
                        onChange={function () { property.setValue(this.value); }}
                    >
                        {property.options.map(x => (
                            <option value={x} ref={it => value.then(v => it.selected = x === v)}>
                                {x}
                            </option>
                        ))}
                    </select>
                    <SettingsNote text={property.description}/>
                </dd>
            </dl>
        );
    }
}