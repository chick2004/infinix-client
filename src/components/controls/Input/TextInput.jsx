"use client";

import { useState, useEffect } from "react";

import styles from "./Input.module.css";

export function TextInput({ defaultValue = "", name, disable = false, placeholder, onChange }) {

    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const handleChange = (e) => {
        setValue(e.target.value);
        onChange?.(e);
    }

    return (
        <div className={styles.input_group}>
            <input type="text" value={value} name={name} disabled={disable} placeholder={placeholder} onChange={handleChange}/>
        </div>
    );
}