"use client";

import { useState, useRef, useEffect } from "react";

import styles from "./Textarea.module.css";

export function Textarea({ defaultValue = "", disable = false, rows, placeholder, onChange }) {

    const [value, setValue] = useState(defaultValue);
    const textareaRef = useRef(null);

    const handleChange = (e) => {
        setValue(e.target.value);
        onChange?.(e.target.value);

        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);
    
    return (
        <div className={styles.component}>
            <textarea className={styles.textarea} value={value} rows={rows} onChange={handleChange} ref={textareaRef} spellCheck={false} disabled={disable} placeholder={placeholder}></textarea>
        </div>
    )
}