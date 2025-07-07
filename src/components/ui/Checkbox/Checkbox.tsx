"use client";

import clsx from "clsx";
import { useState, useEffect } from "react";
import CheckboxProps from "./Checkbox.types";
import styles from "./Checkbox.module.scss";

export default function Checkbox({ style, className, ref, label, checked, onChange}: CheckboxProps) {

    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const root = clsx(styles.root, className);

    return (
        <label style={style} className={root} ref={ref}>
            <input className={styles.checkbox} type="checkbox" checked={isChecked} onChange={e => { setIsChecked(e.target.checked); onChange?.(e.target.checked); }} />
            <span>{label}</span>
        </label>
    );
}
