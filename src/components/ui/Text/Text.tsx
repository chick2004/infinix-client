import clsx from "clsx";
import TextProps from "./Text.types";
import styles from "./Text.module.scss";

export default function Text({ className, style, ref, appearance = "text", type = "body", color = "primary", children }: TextProps) {
    
    const root = clsx(
        styles[appearance],
        styles[type],
        styles[color],
        className
    );

    return (
        <span className={root} style={style} ref={ref}>
            {children}
        </span>
    );
}