"use client";

import { useState, useEffect } from "react";

import CheckboxProps from "./Checkbox.types";
import styles from "./Checkbox.module.css";

export default function Checkbox({label = "", checked = false, onChange} : CheckboxProps) {

    const [isChecked, setIsChecked] = useState<boolean>(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.target.checked;
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
