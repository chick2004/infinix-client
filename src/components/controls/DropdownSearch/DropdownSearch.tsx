"use client";

import { useState, useEffect, useRef, useCallback } from "react";

import { Icon } from "@/components";
import DropdownSearchProps from "./DropdownSearch.types";
import styles from "./DropdownSearch.module.css";

export default function DropdownSearch({ suggestions = [], value = "", disabled = false, placeholder, onChange, onSearch}: DropdownSearchProps) {
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [internalValue, setInternalValue] = useState<string>(value);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
        onChange?.(e.target.value);
    };

    const handleClear = () => {
        setInternalValue("");
        onChange?.("");
    };

    const handleSelect = (selectedValue: string) => {
        setInternalValue(selectedValue);
        setIsOpen(false);
        onChange?.(selectedValue);
    };

    const filteredSuggestions = suggestions.filter((item) => 
        item.toLowerCase().includes(internalValue.toLowerCase())
    );

    return (
        <div className={styles.dropdown_search_input} ref={containerRef}>
            <div className={`${styles.input_group} ${disabled ? styles.disabled : ""} ${isOpen ? styles.opened : ""}`}>
                <input className={styles.input} type="search" disabled={disabled} placeholder={placeholder} value={internalValue} onChange={handleChange} onFocus={() => setIsOpen(filteredSuggestions.length > 0)}/>
                {internalValue && (
                    <button type="button" className={styles.input_button} onClick={handleClear}>
                        <Icon name="dismiss" size={16} type="regular" />
                    </button>
                )}
                <button type="button" className={styles.input_button} onClick={() => setIsOpen(false)}>
                    <Icon name="search" size={16} type="regular" />
                </button>
            </div>

            {isOpen && filteredSuggestions.length > 0 && (
                <ul className={styles.list}>
                    {filteredSuggestions.map((item, index) => (
                        <li key={index} className={styles.list_item} onClick={() => handleSelect(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
