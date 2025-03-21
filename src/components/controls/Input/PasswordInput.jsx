"use client";

import { useState, useEffect, useCallback } from "react";

import { Icon } from "@/components/utilities/Icon/Icon";

import styles from "./Input.module.css";

export function PasswordInput({ defaultValue = "", name, disable = false, placeholder, onChange }) {

    const [value, setValue] = useState(defaultValue);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const handleChange = useCallback((e) => {
        setValue(e.target.value);
        onChange?.(e);
    }, [onChange]);

    const handleShowPassword = useCallback(() => {
        setShowPassword(pre => !pre);
    }, []);

    return (
        <div className={styles.input_group}>
            <input type={showPassword ? "text" : "password"} value={value} name={name} disabled={disable} placeholder={placeholder} onChange={handleChange}/>
            <button type="button" onClick={handleShowPassword}>
                <Icon name={showPassword ? "eye_off" : "eye"} size={16} type="regular"></Icon>
            </button>
        </div>
    );
}