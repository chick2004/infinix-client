"use client";

import SpinnerProps from "./Spinner.types";
import styles from "./Spinner.module.css";

export default function Spinner({ size = "small"}: SpinnerProps) {

    return (
        <div className={`${styles.spinner} ${styles[size]}`}>
            <svg className={styles.inner} viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20"></circle>
            </svg>
        </div>
    );
}