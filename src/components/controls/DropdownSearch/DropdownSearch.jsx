"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./DropdownSearch.module.css";
import { Icon } from "@/components";

export function DropdownSearch({ suggestions = [], defaultValue = "", disabled = false, placeholder, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(defaultValue);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange?.(newValue);
    };

    const handleClear = () => {
        setValue("");
        onChange?.("");
    };

    const handleSelect = (selectedValue) => {
        setValue(selectedValue);
        setIsOpen(false);
        onChange?.(selectedValue);
    };

    const filteredSuggestions = suggestions.filter((item) => 
        item.toLowerCase().includes(value.toLowerCase())
    );

    return (
        <div className={styles.dropdown_search_input} ref={containerRef}>
            <div className={`${styles.input_group} ${disabled ? styles.disabled : ""} ${isOpen ? styles.opened : ""}`}>
                <input 
                    ref={inputRef} 
                    className={styles.input} 
                    type="search" 
                    disabled={disabled} 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={handleChange} 
                    onFocus={() => setIsOpen(filteredSuggestions.length > 0)}
                />
                {value && (
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
};
