import Image from "next/image";
import clsx from "clsx";
import { Message } from "@/components";
import styles from "./MessageGroup.module.css";

export function MessageGroup({ messages, avatar, user_displayname }) {
    const sectionClassName = clsx(styles.section, {
        [styles.own]: messages[0].is_own
    });

    return (
        <div className={sectionClassName}>
            <div className={styles.avatar_container}>
                <Image src={avatar} alt="avatar" width={35} height={35} />
            </div>
            <div className={styles.content_container}>
                <div className={styles.user_displayname}>{user_displayname}</div>
                <div className={styles.messages_container}>
                    {messages.map((message, index) => (
                        <Message key={index} content={message.content} time={message.time} is_own={message.is_own} />
                    ))}
                </div>
            </div>
        </div>
    );
}
