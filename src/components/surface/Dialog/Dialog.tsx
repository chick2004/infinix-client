import clsx from 'clsx';

import DialogProps from "./Dialog.types";
import styles from "./Dialog.module.scss";

export default function Dialog({ className, style, ref, stroke = false, shadow = false, appearance = "base", children }: DialogProps) {

    const root = clsx(
        styles[`dialog_${appearance}`],
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