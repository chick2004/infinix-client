"use client";

import { useState, useEffect } from "react";

import { Icon, Button } from "@/components";
import { useMotion, MotionName } from "@/hooks";

import InputProps from "./Input.types";
import styles from "./Input.module.scss";

const getDaysInMonth = (year: number, month: number) =>{
    const date = new Date(year, month + 1, 0);
    return date.getDate();
}

export function DateInput(props: InputProps) {

    const { style, className, name, value = "", disabled = false, placeholder, onChange } = props;

    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const { shouldRender, animationStyle } = useMotion(showDatePicker, { appear: MotionName.SLIDE_DOWN_IN, appearDistance: 10, disappear: MotionName.SLIDE_UP_OUT, disappearDistance: 10});
    
    const today = new Date();

    const [internalValue, setInternalValue] = useState<Date>(() => {
        const date = new Date(value);
        return isNaN(date.getTime()) ? today : date;
    });
    const [date, setDate] = useState<number>(internalValue.getDate());
    const [month, setMonth] = useState<number>(internalValue.getMonth());
    const [year, setYear] = useState<number>(internalValue.getFullYear());

    const [viewingMonth, setViewingMonth] = useState<number>(month);
    const [viewingYear, setViewingYear] = useState<number>(year);

    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        const newDate = new Date(year, month, date);
        setInternalValue(newDate);
        if (onChange) {
            onChange(newDate.toISOString());
        }
    }, [date, month, year, onChange]);

    const handleMonthChange = (action: "increment" | "decrement") => {
        if (action === "increment") {
            if (viewingMonth === 11) {
                setViewingMonth(0);
                setViewingYear(viewingYear + 1);
            } else {
                setViewingMonth(viewingMonth + 1);
            }
        } else {
            if (month === 0) {
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

    const goToToday = () => {
        setViewingMonth(today.getMonth());
        setViewingYear(today.getFullYear());
    }

    const isSelectedDate = (_date: number) => {
        return viewingYear === year && viewingMonth === month && _date === date;
    }

    const isToday = (_date: number) => {
        return viewingYear === today.getFullYear() && viewingMonth === today.getMonth() && _date === today.getDate();
    }


    const startDateIndex = new Date(viewingYear, viewingMonth, 1).getDay();

    return (
        <div>
            <div style={style} className={`${styles.input_group} ${className} ${styles.input_date} ${disabled ? styles.disabled : ""}`} onClick={() => setShowDatePicker(!showDatePicker)}>
                <input type="text" readOnly value={internalValue.toLocaleDateString("en-ES", {weekday: "short", year: "numeric", month: "short", day: "numeric"})} name={name} disabled={disabled} placeholder={placeholder}/>
                <button type="button" className={styles.input_button}>
                    <Icon name="calendar" size={16} type="regular" />
                </button>
            </div>
            <div style={animationStyle}>
                {shouldRender && (
                    <div className={styles.date_picker}>
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
                                        <button key={index} className={`${styles.date} ${isSelectedDate(index + 1) ? styles.selected_date : ""} ${isToday(index + 1) ? styles.today : ""}`} onClick={() => {setDate(index + 1); setMonth(viewingMonth); setYear(viewingYear); setShowDatePicker(false)}}>{index + 1}</button>
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
                                <Button appearance="subtle" onClick={goToToday} disabled={viewingMonth === today.getMonth() && viewingYear === today.getFullYear()}>
                                    Go to today
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}