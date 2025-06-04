"use client";

import { useState, useRef, useEffect } from "react";
import SliderProps from "./Slider.type";
import styles from "./Slider.module.scss";

export default function Slider({ className, style, direction = "horizontal", min = 0, max = 100, step = 1, value = 0, disabled = false, onChange }: SliderProps) {

    const ref = useRef<HTMLInputElement>(null);
    const [infernalValue, setInternalValue] = useState(value);

    useEffect(() => {
        setInternalValue(value);
        updateRange(value);
    }, [value]);

    const updateRange = (newValue: number) => {
        const percent = ((newValue - min) / (max - min)) * 100;
        if (ref.current) {
            const linear_direction = direction === "horizontal" ? "to right" : "to top";
            ref.current.style.background = `linear-gradient(${linear_direction}, var(--accent-default) ${percent}%, var(--control-strong-stroke-default) ${percent}%)`;
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        updateRange(newValue);
        setInternalValue(newValue);
        onChange?.(newValue);
    }

    return (
        <input style={style} className={`${styles.input} ${className} ${direction == "horizontal" ? styles.horizontal : styles.vertical}`} type="range" min={min} max={max} step={step} ref={ref} onChange={handleChange} value={infernalValue}/>
    )
}