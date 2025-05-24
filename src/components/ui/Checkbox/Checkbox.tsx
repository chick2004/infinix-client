"use client";

import { useState, useEffect } from "react";

import CheckboxProps from "./Checkbox.types";
import styles from "./Checkbox.module.scss";

export default function Checkbox(props: CheckboxProps) {

    const { label, checked = false, style, className, onChange } = props;

    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    return (
        <label style={style} className={`${styles.label} ${className}`}>
            <input className={styles.checkbox} type="checkbox" checked={isChecked} onChange={e => { setIsChecked(e.target.checked); onChange?.(e.target.checked); }} />
            <span>{label}</span>
        </label>
    );
}
