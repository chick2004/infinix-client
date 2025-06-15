import clsx from 'clsx';

import FlyoutProps from "./Flyout.types";
import styles from "./Flyout.module.scss";

export default function Flyout({ className, style, ref, stroke = false, shadow = false, children }: FlyoutProps) {

    const root = clsx(
        styles.flyout,
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