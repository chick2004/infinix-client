"use client";

import React, { useMemo } from "react";
import clsx from "clsx";

import styles from "./Button.module.css";

export function Button({children, appearance = "standard", type = "button", disabled = false, className, onClick}) {

    const button_type = useMemo(() => {
        
        const has_text = React.Children.toArray(children).some(child => typeof child === "string");
        const has_icon = React.Children.toArray(children).some(child => React.isValidElement(child));

        return has_text ? (has_icon ? "text-with-icon" : "text-only") : "icon-only";

    }, [children]);

    const classes = clsx(
        styles[`button-${appearance}`],
        styles[`button-${button_type}`],
        className
    );

    return (
        <button className={classes} disabled={disabled} onClick={onClick} type={type}>
            {children}
        </button>
    );

};