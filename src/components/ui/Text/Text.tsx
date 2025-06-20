import clsx from "clsx";
import TextProps from "./Text.types";
import styles from "./Text.module.scss";

export default function Text({ className, style, appearance = "text", type = "body", color = "primary", onClick, children }: TextProps) {
    
    const root = clsx(
        styles.root,
        styles[appearance],
        styles[type],
        styles[color],
        className
    );

    return (
        <p className={root} style={style} onClick={onClick}>
            {children}
        </p>
    );
}