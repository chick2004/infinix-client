"use client";

import React from "react";
import RadioProps from "./Radio.types";
import styles from "./Radio.module.scss";

export default function Radio(props: RadioProps) {

    const { style, className, name, value = "", label = "", checked = false, onChange } = props;
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(value || "");
    };

    return (
        <label key={value} style={style}  className={`${styles.radio} ${className}`}>
            <input className={styles.radio_input} type="radio" name={name} value={value} checked={checked} onChange={handleChange}/>
            <span>{label}</span>
        </label>
    );
}
