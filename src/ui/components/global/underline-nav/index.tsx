import { FC } from "jsx-dom";
import { KebabHorizontalIcon } from "@primer/octicons-react";

const UnderlineNav: FC = ({ children }) => (
    <div className="UnderlineNav-actions js-responsive-underlinenav-overflow position-absolute pr-3 pr-md-4 pr-lg-5 right-0">
        <details className="details-overlay details-reset position-relative">
            <summary role="button">
                <div className="UnderlineNav-item mr-0 border-0">
                    <KebabHorizontalIcon />
                    <span className="sr-only">More</span>
                </div>
            </summary>
            <div>
                <details-menu role="menu" className="dropdown-menu dropdown-menu-sw">
                    <ul>
                        {
                            children && [].concat(...(children as JSX.Element[])).map(x => {
                                if (x instanceof HTMLElement) {
                                    x.classList.add("js-selected-navigation-item", "dropdown-item");
                                } else if (x) {
                                    x = (
                                        <div className="js-selected-navigation-item dropdown-item">
                                            {x}
                                        </div>
                                    );
                                }

                                return <li>{x}</li>;
                            })
                        }
                    </ul>
                </details-menu>
            </div>
        </details>
    </div>
);

export default UnderlineNav;
