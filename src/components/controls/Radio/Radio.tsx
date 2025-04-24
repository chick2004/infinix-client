"use client";

import React from "react";
import RadioProps from "./Radio.types";
import styles from "./Radio.module.css";

export default function Radio({ name = "", label, value, checked, onChange }: RadioProps) {
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(value || "");
    };

    return (
        <label key={value} className={styles.radio}>
            <input className={styles.radio_input} type="radio" name={name} value={value} checked={checked} onChange={handleChange}/>
            <span>{label}</span>
        </label>
    );
}
