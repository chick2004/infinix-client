"use client";

import { useState, useEffect } from "react";

import SwitchProps from "./Switch.types";
import styles from "./Switch.module.scss";

export default function Switch(props: SwitchProps) {

    const { style, label = "", checked = false, disabled = false, onChange } = props;

    const [isChecked, setIsChecked] = useState<boolean>(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const handleChange = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onChange?.(newChecked);
    };

    return (
        <label style={style} className={styles.switch}>
            <input type="checkbox" checked={isChecked} className={styles.input} disabled={disabled} onChange={handleChange}/>
            <div className={styles.slider}></div>
            {label && <p className={styles.label}>{label}</p>}
        </label>
    );
}