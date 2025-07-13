"use client";

import clsx from "clsx";
import { useState } from "react";
import { Icon } from "@/components";
import InputProps from "./Input.types";
import styles from "./Input.module.scss";

export function NumberInput({ style, className, ref, name, value = "", disabled = false, placeholder = "", onChange, min, max, step = 1 }: InputProps) {
    
    const [internalValue, setInternalValue] = useState<number>(value === "" ? 0 : Number(value));

    const clamp = (val: number) => {
        if (max !== undefined) val = Math.min(val, max);
        if (min !== undefined) val = Math.max(val, min);
        return val;
    }

    const handleChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const newValue = clamp(Number(e.target.value));
        setInternalValue(newValue);
        onChange?.(String(newValue));
    }

    const handleIncrement = () => {
        if (disabled) return;
        setInternalValue((prev) => {
            const newValue = clamp(prev + step);
            onChange?.(String(newValue));
            return clamp(newValue);
        });
    }

    const handleDecrement = () => {
        if (disabled) return;
        setInternalValue((prev) => {
            const newValue = clamp(prev - step);
            onChange?.(String(newValue));
            return clamp(newValue);
        });
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
            <input type="number" value={internalValue} name={name} disabled={disabled} placeholder={placeholder} onChange={handleChange}
            />
            <button type="button" className={styles.input_button} onClick={handleIncrement}>
                <Icon name="chevron_up" size={16} type="regular" />
            </button>
            <button type="button" className={styles.input_button} onClick={handleDecrement}>
                <Icon name="chevron_down" size={16} type="regular" />
            </button>
        </div>
    );
}
