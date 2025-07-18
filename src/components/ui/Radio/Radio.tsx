"use client";

import { useEffect } from "react";
import RadioProps from "./Radio.types";
import styles from "./Radio.module.scss";
import { useRadioGroup } from "@/hooks";


export default function Radio({ style, className, ref, name, value = "", label = "", checked = false, onChange } : RadioProps) {
    
    const { selectedValue, setSelectedValue } = useRadioGroup(name);

    useEffect(() => {
        if (checked && !selectedValue) {
            setSelectedValue(value);
        }
    }, [checked, value, selectedValue]);

    const handleChange = () => {
        setSelectedValue(value);
        onChange?.(value);
    };

    return (
        <label key={value} style={style} ref={ref} className={`${styles.radio} ${className}`}>
            <input 
                className={styles.radio_input} 
                type="radio" 
                name={name} 
                value={value} 
                checked={selectedValue === value}
                onChange={handleChange}
            />
            <span>{label}</span>
        </label>
    );
}
