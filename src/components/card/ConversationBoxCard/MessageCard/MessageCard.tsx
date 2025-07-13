"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";
import { requestInit } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import { Icon, Flyout, Text, Card } from "@/components";
import MessageCardProps from "./MessageCard.types";
import styles from "./MessageCard.module.scss";

export default function MessageCard({ style, className, ref, message, is_own, onReply, onEdit }: MessageCardProps) {

    const root = clsx(
        styles.section,
        className,
        {
            [styles.own]: is_own
        }
    );

    const menuRef = useRef<HTMLDivElement>(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content || "");
    }
    const handleReply = () => {
        if (onReply) {
            onReply(message);
        }
    }
    const handleEdit = () => {
        if (onEdit) {
            onEdit(message);
        }
    }
    const handlePin = () => {
        pinMessageMutation.mutate();
    }

    const mutatePinMessage = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/messages/" + message.id + "/pin", requestInit("POST"));
        if (!response.ok) { 
            throw new Error("Failed to pin message");
        }
        return response.json();
    }
    const pinMessageMutation = useMutation({
        mutationFn: mutatePinMessage,
        onSuccess: () => {
        },
        onError: (error) => {
            console.error("Error pinning message:", error);
        }
    });

    
    return (
        <div className={root} style={style} ref={ref}>
            <div className={styles.content_and_actions}>
                {message.reply_to && (
                    <div className={styles.reply_to}>
                        {is_own ? (
                            <>
                                <Text color="secondary" type="caption">
                                    {message.reply_to.content
                                        ? message.reply_to.content.slice(0, 50) + (message.reply_to.content.length > 50 ? "..." : "")
                                        : ""}
                                </Text>
                                <Icon name="arrow_reply" size={16} type="filled"></Icon>
                            </>
                        ) : (
                            <>
                                <Icon name="arrow_reply" size={16} type="filled" style={{transform: "scaleX(-1)"}}></Icon>
                                <Text>
                                    {message.reply_to.content}
                                </Text>
                            </>
                        )}
                    </div>
                )}
                <div className={styles.content}>
                    {message.content}
                    {message.is_edited && (
                        <Text type="caption" color="secondary" className={styles.edited_text} appearance={is_own ? "text_on_accent" : "text"}>*edited</Text>
                    )}
                    
                    <div className={styles.flyout_container} ref={menuRef}>
                        <Flyout stroke shadow className={styles.flyout}>
                            <div className={styles.flyout_button} onClick={handleReply}>
                                <Icon name={"arrow_reply"} size={20} type={"regular"}></Icon>
                                Reply
                            </div>
                            <div className={styles.flyout_button} onClick={handleCopy}>
                                <Icon name={"copy"} size={20} type={"regular"}></Icon>
                                Copy
                            </div>
                            {is_own && (
                                <>
                                    <div className={styles.flyout_button} onClick={handleEdit}>
                                        <Icon name={"edit"} size={20} type={"regular"}></Icon>
                                        Edit
                                    </div>
                                </>
                            )}
                            <div className={styles.flyout_button} onClick={handlePin}>
                                <Icon name={"pin"} size={20} type={"regular"}></Icon>
                                Pin
                            </div>
                        </Flyout>
                    </div>
                </div>
            </div>
            {Array.isArray(message.medias) && message.medias.length > 0 && (
                <Card stroke shadow className={`${styles.medias} ${message.medias.length > 1 ? styles.multi_media : ""}`}>
                    {message.medias.slice(0, 3).map((media, index) => (
                        <div key={index} className={styles.media}>
                            <Image src={media.path} alt={`Media ${index + 1}`} className={styles.media_image} fill />
                        </div>
                    ))}
                </Card>
            )}
        </div>
    );
}