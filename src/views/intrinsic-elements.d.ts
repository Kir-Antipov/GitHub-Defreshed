import { HTMLAttributes, DetailedHTMLProps } from "jsx-dom";

interface RelativeTimeHTMLAttributes<T> extends HTMLAttributes<T> {
    datetime?: string
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "relative-time": DetailedHTMLProps<RelativeTimeHTMLAttributes<HTMLElement>, HTMLElement>
        }
    }
}