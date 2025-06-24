import Image from "next/image";

import clsx from "clsx";
import { MessageCard } from "@/components";

import MessageGroupCardProps from "./MessageGroupCard.types";
import styles from "./MessageGroupCard.module.scss";

export default function MessageGroupCard({ group, style, className, onReply }: MessageGroupCardProps) {

    const root = clsx(
        styles.section,
        className,
        {
            [styles.own]: group.is_own
        }
    );

    return (
        <div className={root} style={style}>
            <div className={styles.avatar_container}>
                <Image src={group.avatar} alt="avatar" width={35} height={35} />
            </div>
            <div className={styles.content_container}>
                {/* <div className={styles.user_displayname}>{group.user_displayname}</div> */}
                <div className={styles.messages_container}>
                    {group.messages.map((message, index) => (
                        <MessageCard key={index} message={message} is_own={group.is_own} onReply={onReply}/>
                    ))}
                </div>
            </div>
        </div>
    );
}