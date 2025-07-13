"use client";

import clsx from "clsx";
import SpinnerProps from "./Spinner.types";
import styles from "./Spinner.module.scss";

export default function Spinner({ style, className, ref, size = "small"}: SpinnerProps) {

    const root = clsx(
        styles.root,
        styles[size],
        className
    );

    return (
        <div className={root} style={style} ref={ref}>
            <svg className={styles.inner} viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20"></circle>
            </svg>
            <svg className={styles.background} viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20"></circle>
            </svg>
        </div>
    );
}