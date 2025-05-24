"use client";

import { useState, useRef, useEffect } from "react";

import TextareaProps from "./Textarea.types";
import styles from "./Textarea.module.scss";

export default function Textarea(props: TextareaProps) {

    const { value = "", rows, placeholder, disabled = false, style, onChange } = props;

    const [internalValue, setInternalValue] = useState(value);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInternalValue(e.target.value);
        onChange?.(e.target.value);

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, []);
    
    return (
        <div style={style} className={`${styles.component} ${props.className}`}>
            <textarea className={styles.textarea} value={internalValue} rows={rows} onChange={handleChange} ref={textareaRef} spellCheck={false} disabled={disabled} placeholder={placeholder}></textarea>
        </div>
    )
}