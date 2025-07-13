import Image from "next/image";

import clsx from "clsx";
import { Text } from "@/components";
import MessageCard from "./../MessageCard/MessageCard";

import MessageGroupCardProps from "./MessageGroupCard.types";
import styles from "./MessageGroupCard.module.scss";

export default function MessageGroupCard({ group, style, className, show_display_name = false, onReply, onEdit }: MessageGroupCardProps) {

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
                {show_display_name && <Text type="caption" className={styles.user_displayname}>{group.user_displayname}</Text>}
                <div className={styles.messages_container}>
                    {group.messages.map((message, index) => (
                        <MessageCard key={index} message={message} is_own={group.is_own} onReply={onReply} onEdit={onEdit}/>
                    ))}
                </div>
            </div>
        </div>
    );
}