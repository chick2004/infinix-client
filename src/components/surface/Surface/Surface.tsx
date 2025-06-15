import clsx from 'clsx';

import SurfaceProps from "./Surface.types";
import styles from "./Surface.module.scss";

export default function Surface({ className, style, ref, stroke = false, shadow = false, appearance = "base", children }: SurfaceProps) {

    const root = clsx(
        styles[`surface_${appearance}`],
        className,
        {
            [styles.stroke]: stroke,
            [styles.shadow]: shadow,
        }
    );


    return (
        <div className={root} ref={ref} style={style}>
            {children}
        </div>
    );
};