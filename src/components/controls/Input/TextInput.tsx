"use client";

import { useState, useEffect } from "react";

import InputProps from "./Input.types";
import styles from "./Input.module.scss";

export function TextInput({ value = "", name, disabled, placeholder, onChange }: InputProps) {

    const [internalValue, setInternalValue] = useState<string | number>(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
        onChange?.(e.target.value);
    }

    return (
        <div className={`${styles.input_group} ${disabled ? styles.disabled : ""}`}>
            <input type="text" value={internalValue} name={name} disabled={disabled} placeholder={placeholder} onChange={handleChange}/>
        </div>
    );
}