"use client";

import { useState, useEffect } from "react";

import RadioGroupProps from "./RadioGroup.types";
import styles from "./RadioGroup.module.scss";

export default function RadioGroup({name = "", label, value, options, onChange} : RadioGroupProps) {

    const [selectedValue, setSelectedValue] = useState<string>(value || "");

    const handleChange = (val: string) => {
        if (val !== selectedValue) {
            setSelectedValue(val);
            onChange?.(val);
        }
    };

    return (
        <div className={styles.radio_group_container}>
            <div className={styles.radio_group_label}>{label}</div>
            <div className={styles.radio_group}>
                {options?.map((option) => (
                    <label key={option.value} className={styles.radio}>
                        <input className={styles.radio_input} type="radio" name={name} value={option.value} checked={selectedValue === option.value} onChange={() => handleChange(option.value)}/>
                        <span>{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
