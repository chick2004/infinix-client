"use client";
import clsx from "clsx";
import { useState, useEffect } from "react";

import InputProps from "./Input.types";
import styles from "./Input.module.scss";

export function TextInput({ style, className, ref, name, value = "", disabled = false, placeholder = "", onChange }: InputProps) {

    const root = clsx(
        styles.input_group,
        styles.text_input,
        className,
        {
            [styles.disabled]: disabled
        }
    );

    const [internalValue, setInternalValue] = useState<string | number>(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
        onChange?.(e.target.value);
    }

    return (
        <div style={style} ref={ref} className={root}>
            <input type="text" value={internalValue} name={name} disabled={disabled} placeholder={placeholder} onChange={handleChange}/>
        </div>
    );
}