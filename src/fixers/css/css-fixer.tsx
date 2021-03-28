import { waitUntilHeadReady } from "@utils/wait-until-ready";
import config from "@config";
import Fixer from "@fixers/fixer";
import Style from "@components/css/style/style";

/**
 * Base class for css injectors.
 */
export default class CSSFixer extends Fixer {
    private enable: boolean | PromiseLike<boolean>;
    private css: string;
    private name: string;

    /**
     * Initializes a new instance of the CSSFixer class.
     *
     * @param enable
     * Flag that indicates whether to apply this fixer.
     *
     * @param css CSS to be injected.
     *
     * @param name This fixer's name.
     */
    constructor(enable: boolean | PromiseLike<boolean>, css: any, name: string) {
        super();
        this.css = String(css);
        this.enable = enable;
        this.name = `${config.name}-${name}`;
    }

    async isApplieble() {
        return await this.enable && !document.querySelector(`head > style[${this.name}]`);
    }

    waitUntilFixerReady() {
        return waitUntilHeadReady();
    }

    apply() {
        document.head.append(
            <Style name={this.name}>
                {this.css}
            </Style>
        );
    }
}