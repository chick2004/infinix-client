"use client";

import { useState, useEffect, useRef } from "react";
import { Icon } from "@/components";
import { useMotion, MotionName } from "@/hooks";

import SelectProps from "./Select.types";
import styles from "./Select.module.scss";

export default function Select({ options=["option1", "option2", "option3"], disabled = false }: SelectProps) {

    const [isOpen, setIsOpen] = useState(false);

    const { shouldRender, animationStyle } = useMotion(isOpen, { appear: MotionName.SLIDE_DOWN_IN, disappear: MotionName.SLIDE_UP_OUT});


    const [selected, setSelected] = useState(0);
    const [labelValue, setLabelValue] = useState(() => {
        return options ? options[0] : "Select";
    });
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleClick = () => {
        setIsOpen(pre => !pre);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }

    const handleSelect = (key: number, value: string) => {
        setSelected(key);
        setLabelValue(value);
        setIsOpen(false);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.select} ref={containerRef}>
            <div className={`${styles.select_group} ${disabled ? styles.disabled : ""} ${isOpen ? styles.opened : ""}`} onClick={handleClick}>
                {labelValue}
                <button type="button" className={styles.select_button}>
                    <Icon name="chevron_down" size={16} type="regular"></Icon>
                </button>
            </div>
            {shouldRender && 
                <ul className={styles.list} style={animationStyle}>
                    {
                        options && options.map((value, index) => {
                            const classes = `${styles.list_item} ${selected === index ? styles.active : ""}`;
                            return <li key={index} className={classes} onClick={() => handleSelect(index, value)}>{value}</li>
                        })
                    }
                </ul>
            }
        </div>
    );
}