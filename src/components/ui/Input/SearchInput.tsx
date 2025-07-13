"use client";

import clsx from "clsx";
import { useState, useEffect } from "react";
import { Icon } from "@/components";
import InputProps from "./Input.types";
import styles from "./Input.module.scss";

export function SearchInput({ style, className, ref, name, value = "", disabled = false, placeholder = "", onChange, onSearch }: InputProps) {

    const [internalValue, setInternalValue] = useState<string>(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        setInternalValue(e.target.value);
        onChange?.(e.target.value);
    }

    const handleClear = () => {
        if (disabled) return;
        setInternalValue("");
        onChange?.("");
    }

    const handleSearch = () => {
        if (disabled) return;
        onSearch?.(internalValue);
    }

    const root = clsx(
        styles.root,
        className,
        {
            [styles.disabled]: disabled
        }
    );

    return (
        <div style={style} className={root} ref={ref}>
            <input type="search" value={internalValue} name={name} disabled={disabled} placeholder={placeholder} onChange={handleChange}/>
            <button type="button" className={styles.input_button} onClick={handleClear}>
                <Icon name="dismiss" size={16} type="regular"></Icon>
            </button>
            <button type="button" className={styles.input_button} onClick={handleSearch}>
                <Icon name="search" size={16} type="regular"></Icon>
            </button>
        </div>
    );
}