import clsx from "clsx";

import LayerProps from "./Layer.types";
import styles from "./Layer.module.scss";

export default function Layer({ className, style, ref, stroke = false, appearance = "default", children }: LayerProps) {

    const root = clsx(
        styles[`layer_${appearance}`],
        className,
        {
            [styles.stroke]: stroke
        }
    );

    return (
        <div className={root} style={style} ref={ref}>
            {children}
        </div>
    );
}