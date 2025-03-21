"use client";

import { useState } from "react";
import clsx from "clsx";

import { Icon } from "@/components";
import styles from "./Message.module.css";

export function Message({ content, time, is_own = true }) {

    const sectionClassName = clsx(styles.section, {
        [styles.own]: is_own
    });

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
    }
    
    return (
        <div className={sectionClassName}>
            <p className={styles.content}>{content}</p>
            <div className={styles.flyout_container}>
                <div className={styles.flyout}>
                    <div className={styles.flyout_button}>
                        <Icon name={"arrow_reply"} size={20} type={"regular"}></Icon>
                        Reply this message
                    </div>
                    <div className={styles.flyout_button} onClick={handleCopy}>
                        <Icon name={"copy"} size={20} type={"regular"}></Icon>
                        Copy this message
                    </div>
                    <div className={styles.flyout_button}>
                        <Icon name={"edit"} size={20} type={"regular"}></Icon>
                        Edit
                    </div>
                    <div className={styles.flyout_button}>
                        <Icon name={"pin"} size={20} type={"regular"}></Icon>
                        Pin
                    </div>
                </div>
            </div>
        </div>
    );
}