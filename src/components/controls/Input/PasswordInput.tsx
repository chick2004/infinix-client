"use client";

import { useState, useEffect } from "react";

import { Icon } from "@/components";

import InputProps from "./Input.types";
import styles from "./Input.module.css";

export function PasswordInput({ value = "", name, disabled, placeholder, onChange }: InputProps) {

    const [internalValue, setInternalValue] = useState<string | number>(value);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
        onChange?.(e.target.value);
    };

    const handleShowPassword = () => {
        setShowPassword(pre => !pre);
    };

    return (
        <div className={`${styles.input_group} ${disabled ? styles.disabled : ""}`}>
            <input type={showPassword ? "text" : "password"} value={internalValue} name={name} disabled={disabled} placeholder={placeholder} onChange={handleChange}/>
            <button type="button" onClick={handleShowPassword}>
                <Icon name={showPassword ? "eye_off" : "eye"} size={16} type="regular"></Icon>
            </button>
        </div>
    );
}