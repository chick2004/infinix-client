"use client";

import { useState, useEffect } from "react";

import ToggleSwitchProps from "./ToggleSwitch.types";
import styles from "./ToggleSwitch.module.css";

export default function ToggleSwitch({ value, label, checked = false, onChange, disabled }: ToggleSwitchProps) {

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
        <label className={styles.switch}>
            <input type="checkbox" checked={isChecked} className={styles.input} disabled={disabled} onChange={handleChange}/>
            <div className={styles.slider}></div>
            {label && <p className={styles.label}>{label}</p>}
        </label>
    );
}