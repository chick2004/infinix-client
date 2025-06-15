import clsx from "clsx";

import CardProps from "./Card.types";
import styles from "./Card.module.scss";

export default function Card({ className, style, ref, stroke = false, shadow = false, appearance = "default", children }: CardProps) {

    const root = clsx(
        styles[`card_${appearance}`],
        className,
        {
            [styles.stroke]: stroke,
            [styles.shadow]: shadow,
        }
    );

    return (
        <div className={root} style={style} ref={ref}>
            {children}
        </div>
    );
}