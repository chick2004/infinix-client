"use client";
import clsx from "clsx";
import { useState, useEffect } from "react";
import InputProps from "./Input.types";
import styles from "./Input.module.scss";

export function TextInput({ style, className, ref, name, value = "", disabled = false, placeholder = "", onChange }: InputProps) {

    const [internalValue, setInternalValue] = useState<string | number>(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        setInternalValue(e.target.value);
        onChange?.(e.target.value);
    }
    
    const root = clsx(
        styles.root,
        className,
        {
            [styles.disabled]: disabled
        }
    );

    return (
        <div style={style} ref={ref} className={root}>
            <input type="text" value={internalValue} name={name} disabled={disabled} placeholder={placeholder} onChange={handleChange}/>
        </div>
    );
}