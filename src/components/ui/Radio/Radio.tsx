"use client";

import React, { useState, useEffect } from "react";
import RadioProps from "./Radio.types";
import styles from "./Radio.module.scss";

export default function Radio({ style, className, ref, name, value = "", label = "", checked = false, onChange } : RadioProps) {

    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setIsChecked(event.target.checked);
        onChange?.(value || "");
    };

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    return (
        <label key={value} style={style} ref={ref} className={`${styles.radio} ${className}`}>
            <input className={styles.radio_input} type="radio" name={name} value={value} checked={isChecked} onChange={handleChange}/>
            <span>{label}</span>
        </label>
    );
}
