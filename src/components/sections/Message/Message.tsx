"use client";

import { useState } from "react";

import { Icon } from "@/components";

import MessageProps from "./Message.types";
import styles from "./Message.module.css";

export default function Message({ content = "this is a message", time = new Date, is_own = true }: MessageProps) {

    const sectionClassName = `${styles.section} ${is_own ? styles.own: ""}`;

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