"use client";

import clsx from "clsx";
import { useState, useEffect } from "react";
import { Icon } from "@/components";
import InputProps from "./Input.types";
import styles from "./Input.module.scss";

export function PasswordInput({ style, className, ref, name, value = "", disabled = false, placeholder = "", onChange }: InputProps) {

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

    const root = clsx(
        styles.root,
        className,
        {
            [styles.disabled]: disabled
        }
    );

    return (
        <div style={style} className={root} ref={ref}>
            <input type={showPassword ? "text" : "password"} value={internalValue} name={name} disabled={disabled} placeholder={placeholder} onChange={handleChange}/>
            <button className={styles.input_button} type="button" onClick={handleShowPassword}>
                <Icon name={showPassword ? "eye_off" : "eye"} size={16} type="regular"></Icon>
            </button>
        </div>
    );
}