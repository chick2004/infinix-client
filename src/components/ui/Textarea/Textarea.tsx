"use client";

import clsx from "clsx";
import { useState, useRef, useEffect } from "react";

import TextareaProps from "./Textarea.types";
import styles from "./Textarea.module.scss";

export default function Textarea({ style, className, ref, value = "", rows, placeholder, disabled = false, onChange }: TextareaProps) {

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

    const root  = clsx(
        styles.root,
        className,
        {
            [styles.disabled]: disabled
        }
    )
    
    return (
        <div style={style} className={root}>
            <textarea className={styles.textarea} value={internalValue} rows={rows} onChange={handleChange} ref={textareaRef} spellCheck={false} disabled={disabled} placeholder={placeholder}></textarea>
        </div>
    )
}