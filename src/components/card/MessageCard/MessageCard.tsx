"use client";

import clsx from "clsx";
import { useState, useRef } from "react";

import { Icon, Flyout } from "@/components";
import { useMotion, MotionName } from "@/hooks";
import type { Message } from "@/types";
import MessageCardProps from "./MessageCard.types";
import styles from "./MessageCard.module.scss";

export default function MessageCard({ style, className, ref, message, is_own, onReply }: MessageCardProps) {

    const root = clsx(
        styles.section,
        className,
        {
            [styles.own]: is_own
        }
    );

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content || "");
    }



    
    return (
        <div className={root} style={style} ref={ref}>
            <p className={styles.content}>{message.content}</p>
            <div className={styles.flyout_container}>
                <Flyout stroke shadow className={styles.flyout}>
                    <div className={styles.flyout_button} onClick={() => onReply && onReply(message)}>
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
                </Flyout>
            </div>
        </div>
    );
}