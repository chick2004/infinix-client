"use client";

import { useState, useEffect } from "react";

import styles from "./Checkbox.module.css";

export function Checkbox({label = "", checked = false, onChange}) {

    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const handleChange = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onChange?.(newChecked);
    }

    return (
        <label className={styles.label}> 
            <input className={styles.checkbox} type="checkbox" checked={isChecked} onChange={handleChange}/>
            <span>{label}</span>
        </label>
    );
}
