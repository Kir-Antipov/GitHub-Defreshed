import { FC } from "jsx-dom";

const About: FC<{ website?: string }, JSX.Element> = ({ website, children }) => (
    <div>
        <div className="f4">
            <span className="text-gray-dark mr-2">
                {children}
            </span>
            {website &&
                <span>
                    <a href={website} title={website} role="link" target="_blank" rel="noopener noreferrer">
                        {website}
                    </a>
                </span>
            }
        </div>
    </div>
);

export default About;