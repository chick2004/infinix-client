"use client";

import { useState, useCallback } from "react";
import { Icon } from "@/components/utilities/Icon/Icon";
import styles from "./Input.module.css";

export function NumberInput({ defaultValue = 0, name, disable = false, placeholder, min, max, step = 1, onChange }) {
    
    const [value, setValue] = useState(Number(defaultValue) || 0);

    const clamp = useCallback((val) => {
        if (max !== undefined) val = Math.min(val, max);
        if (min !== undefined) val = Math.max(val, min);
        return val;
    }, [min, max]);

    const handleChange = useCallback((e) => {
        let newValue = Number(e.target.value) || 0;
        newValue = clamp(newValue);
        setValue(newValue);
        onChange?.(e);  // 🛠️ Truyền toàn bộ event thay vì chỉ truyền value
    }, [clamp, onChange]);

    const handleIncrement = useCallback(() => {
        setValue((prev) => {
            let newValue = clamp(prev + step);
            onChange?.({ target: { name, value: newValue } });  // 🛠️ Tạo event giả
            return newValue;
        });
    }, [clamp, onChange, step, name]);

    const handleDecrement = useCallback(() => {
        setValue((prev) => {
            let newValue = clamp(prev - step);
            onChange?.({ target: { name, value: newValue } });  // 🛠️ Tạo event giả
            return newValue;
        });
    }, [clamp, onChange, step, name]);

    return (
        <div className={styles.input_group}>
            <input 
                type="number"
                value={value}
                name={name}
                disabled={disable}
                placeholder={placeholder}
                onChange={handleChange}
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
