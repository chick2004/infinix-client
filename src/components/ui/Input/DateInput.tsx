"use client";

import clsx from "clsx";
import { useState, useEffect } from "react";
import { Icon, Button } from "@/components";
import { useMotion, MotionName } from "@/hooks";
import InputProps from "./Input.types";
import styles from "./Input.module.scss";

export function DateInput({ style, className, ref, name, value, disabled = false, placeholder, onChange }: InputProps) {

    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const { shouldRender, animationStyle } = useMotion(showDatePicker, { appear: MotionName.SLIDE_DOWN_IN, appearDistance: 10, disappear: MotionName.SLIDE_UP_OUT, disappearDistance: 10});
    
    const today = new Date();

    const [internalValue, setInternalValue] = useState<Date | undefined>(() => {
        if (!value) {
            return undefined
        }
        return new Date(value);
    });

    const [viewingMonth, setViewingMonth] = useState<number>(internalValue != undefined ? internalValue.getMonth() : today.getMonth());
    const [viewingYear, setViewingYear] = useState<number>(internalValue != undefined ? internalValue.getFullYear() : today.getFullYear());

    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        setInternalValue(internalValue);
        if (onChange) {
            onChange(internalValue?.toISOString() || "");
        }
    }, [internalValue, onChange]);

    const handleMonthChange = (action: "increment" | "decrement") => {
        if (action === "increment") {
            if (viewingMonth === 11) {
                setViewingMonth(0);
                setViewingYear(viewingYear + 1);
            } else {
                setViewingMonth(viewingMonth + 1);
            }
        } else {
            if (viewingMonth === 0) {
                setViewingMonth(11);
                setViewingYear(viewingYear - 1);
            } else {
                setViewingMonth(viewingMonth - 1);
            }
        }
    }

    const handleYearChange = (action: "increment" | "decrement") => {
        if (action === "increment") {
            setViewingYear(viewingYear + 1);
        } else {
            setViewingYear(viewingYear - 1);
        }
    }

    const handleClear = () => {
        setInternalValue(undefined);
        setViewingMonth(today.getMonth());
        setViewingYear(today.getFullYear());
        if (onChange) {
            onChange("");
        }
    }

    const goToToday = () => {
        setViewingMonth(today.getMonth());
        setViewingYear(today.getFullYear());
    }

    const isSelectedDate = (_date: number) => {
        return viewingYear === internalValue?.getFullYear() && viewingMonth === internalValue.getMonth() && _date === internalValue.getDate();
    }

    const isToday = (_date: number) => {
        return viewingYear === today.getFullYear() && viewingMonth === today.getMonth() && _date === today.getDate();
    }

    const getDaysInMonth = (year: number, month: number) =>{
        const date = new Date(year, month + 1, 0);
        return date.getDate();
    }

    const startDateIndex = new Date(viewingYear, viewingMonth, 1).getDay();

    const root = clsx(
        styles.root,
        className,
        styles.input_date,
        { [styles.disabled]: disabled }
    )

    return (
        <div>
            <div style={style} className={root} ref={ref} onClick={() => setShowDatePicker(!showDatePicker)}>
                <input type="text" readOnly value={internalValue?.toLocaleDateString("en-ES", {weekday: "short", year: "numeric", month: "short", day: "numeric"}) || ""} name={name} disabled={disabled} placeholder={placeholder}/>
                <button type="button" className={styles.input_button}>
                    <Icon name="calendar" size={16} type="regular" />
                </button>
            </div>
                {shouldRender && (
                    <div className={styles.date_picker} style={animationStyle}>
                        <div className={styles.date_content}>
                            <div className={styles.date_header}>
                                <span className={styles.date_header_title}>{monthList[viewingMonth]} {viewingYear}</span>
                                <button type="button" className={styles.input_button} onClick={() => handleMonthChange("increment")}>
                                    <Icon name="arrow_up" size={16} type="regular" />
                                </button>
                                <button type="button" className={styles.input_button} onClick={() => handleMonthChange("decrement")}>
                                    <Icon name="arrow_down" size={16} type="regular" />
                                </button>
                            </div>
                            <div className={styles.date_list_container}>
                                <div className={styles.days_of_week}>
                                    {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                                        <span key={index} className={styles.day}>{day}</span>
                                    ))}
                                </div>
                                <div className={styles.dates_of_month}>
                                    {Array.from({ length: startDateIndex }, (_, index) => (
                                        <span key={index} className={styles.empty_date}></span>
                                    ))}
                                    {Array.from({ length: getDaysInMonth(viewingYear, viewingMonth) }, (_, index) => (
                                        <button key={index} className={`${styles.date} ${isSelectedDate(index + 1) ? styles.selected_date : ""} ${isToday(index + 1) ? styles.today : ""}`} onClick={() => {setInternalValue(new Date(viewingYear, viewingMonth, index + 1)); setShowDatePicker(false)}}>{index + 1}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={styles.month_content}>
                            <div className={styles.month_header}>
                                <span className={styles.month_header_title}>{viewingYear}</span>
                                <button type="button" className={styles.input_button} onClick={() => handleYearChange("increment")}>
                                    <Icon name="arrow_up" size={16} type="regular" />
                                </button>
                                <button type="button" className={styles.input_button} onClick={() => handleYearChange("decrement")}>
                                    <Icon name="arrow_down" size={16} type="regular" />
                                </button>
                            </div>
                            <div className={styles.month_list_container}>
                                {monthList.map((month, index) => (
                                    <span key={index} className={styles.month} onClick={() => {setViewingMonth(index);}}>
                                        {month.slice(0, 3)}
                                    </span>
                                ))}
                            </div>
                            <div className={styles.today_button}>
                                <Button appearance="subtle" onClick={handleClear} disabled={!internalValue}>
                                    Clear
                                </Button>
                                <Button appearance="subtle" onClick={goToToday} disabled={viewingMonth === today.getMonth() && viewingYear === today.getFullYear()}>
                                    Go to today
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}