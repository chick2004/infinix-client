import Image from "next/image";

import { Message } from "@/components";

import MessageGroupProps from "./MessageGroup.types";
import styles from "./MessageGroup.module.css";

export default function MessageGroup({ messages, avatar, user_displayname }: MessageGroupProps) {

    const sectionClassName = `${styles.section} ${messages[0].is_own ? styles.own : ""}`;

    return (
        <div className={sectionClassName}>
            <div className={styles.avatar_container}>
                <Image src={avatar} alt="avatar" width={35} height={35} />
            </div>
            <div className={styles.content_container}>
                <div className={styles.user_displayname}>{user_displayname}</div>
                <div className={styles.messages_container}>
                    {messages.map((message, index) => (
                        <Message key={index} {...message} />
                    ))}
                </div>
            </div>
        </div>
    );
}
