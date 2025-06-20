"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { Video, Card, ConversationBoxCard } from "@/components";
import { useEffect, useState } from "react";
import { useMotion, MotionName } from "@/hooks";

export default function Home() {

    const conversation = {
        id: 1,
        is_group: false,
        name: "Châu Thành Cường",
        image: "/images/avatar.png",
        last_message: "Hello, how are you?",
        messages: [
            {
                id: 1,
                conversation_id: 1,
                user_id: 1,
                user_displayname: "Châu Thành Cường",
                content: "Hello, how are you?",
                time: new Date(),
                avatar: "/images/avatar.png",
                is_own: true
            },
            {
                id: 2,
                conversation_id: 1,
                user_id: 2,
                user_displayname: "Jen",
                content: "I'm good, thank you.",
                time: new Date(),
                avatar: "/images/avatar.png",
                is_own: false
            }
        ]
    }
    
    return (
        <div className={styles.page}>
            <ConversationBoxCard conversation={conversation}></ConversationBoxCard>
        </div>
    );
}
