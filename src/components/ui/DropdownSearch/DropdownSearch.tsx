"use client";

import clsx from "clsx";
import { useState, useEffect, useRef } from "react";

import { Icon } from "@/components";
import { useClickOutside } from "@/hooks";

import DropdownSearchProps from "./DropdownSearch.types";
import styles from "./DropdownSearch.module.scss";

export default function DropdownSearch(props: DropdownSearchProps) {

    const { suggestions, value = "", disabled = false, placeholder, style, className, onChange, onSearch} = props;
    
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [internalValue, setInternalValue] = useState<string>(value);
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setIsOpen(false));

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

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
        onSearch?.(selectedValue);
    };

    const handleSearch = () => {
        setInternalValue(internalValue.trim());
        setIsOpen(false);
        onSearch?.(internalValue.trim());  
    }

    const filteredSuggestions = Array.isArray(suggestions) ? suggestions.filter((item) => 
        item.toLowerCase().includes(internalValue.toLowerCase())
    ) : [];

    const root = clsx(
        styles.root,
        className
    );

    return (
        <div style={style} className={root} ref={ref}>
            <div className={`${styles.input_group} ${disabled ? styles.disabled : ""} ${isOpen ? styles.opened : ""}`}>
                <input className={styles.input} type="search" disabled={disabled} placeholder={placeholder} value={internalValue} onChange={handleChange} onClick={() => setIsOpen(filteredSuggestions.length > 0)}/>
                {internalValue && (
                    <button type="button" className={styles.input_button} onClick={handleClear}>
                        <Icon name="dismiss" size={16} type="regular" />
                    </button>
                )}
                <button type="button" className={styles.input_button} onClick={() => handleSearch}>
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
