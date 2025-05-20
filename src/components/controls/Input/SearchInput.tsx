"use client";

import { useState, useEffect } from "react";

import { Icon } from "@/components";

import InputProps from "./Input.types";
import styles from "./Input.module.scss";

export function SearchInput(props: InputProps) {

    const { style, name, value = "", disabled = false, placeholder = "", onChange, onSearch } = props;

    const [internalValue, setInternalValue] = useState<string>(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
        onChange?.(e.target.value);
    }

    const handleClear = () => {
        setInternalValue("");
        onChange?.("");
    }

    const handleSearch = () => {
        onSearch?.(internalValue);
    }

    return (
        <div style={style} className={`${styles.input_group} ${disabled ? styles.disabled : ""}`}>
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