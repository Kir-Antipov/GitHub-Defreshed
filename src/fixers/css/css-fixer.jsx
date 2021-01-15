import { waitUntilHeadReady } from "../../utils/wait-until-ready";
import { SettingsProperty } from "../../utils/settings";
import config from "../../../package.json";
import Fixer from "../fixer";

/**
 * Base class for css injectors.
 */
export default class CSSFixer extends Fixer {
    /**
     * Initializes a new instance of the CSSFixer class.
     *
     * @param {SettingsProperty<boolean>} option
     * Settings option that indicates whether to apply this fixer.
     *
     * @param {string} css CSS to be injected.
     *
     * @param {string} name This fixer's name.
     */
    constructor(option, css, name) {
        super();
        this._css = css.toString();
        this._option = option;
        this._name = `${config.name}-${name}`;
    }

    /** @inheritdoc */
    async isApplieble() {
        return await this._option.getValue() && !document.querySelector(`head > style[${this._name}]`);
    }

    /** @inheritdoc */
    waitUntilFixerReady() {
        return waitUntilHeadReady();
    }

    /** @inheritdoc */
    apply() {
        document.head.append(
            <style type="text/css" {...{ [this._name]: "" }}>
                {this._css}
            </style>
        );
    }
}