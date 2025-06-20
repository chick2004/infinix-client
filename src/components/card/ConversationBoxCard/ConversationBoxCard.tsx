"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState, useReducer } from "react";

import type { Message } from "@/types";
import { Layer, Text, Button, Icon, Card, Textarea } from "@/components";
import { useFetch, useRequest } from "@/hooks";
import ConversationBoxCardProps from "./ConversationBoxCard.types";
import styles from "./ConversationBoxCard.module.scss";

export default function ConversationBoxCard({ style, className, ref, conversation}: ConversationBoxCardProps) {
    
    const root = clsx(
        styles.root,
        className
    );

    const { data: messagesListData, loading: messagesListLoading, error: messagesListError, status: messagesListStatus } = useFetch(process.env.NEXT_PUBLIC_API_URL + "/conversations/" + conversation.id + "/messages");

    const [isExpanded, setIsExpanded] = useState(true);
    
    return (
        <Layer stroke className={root} style={style} ref={ref}>
            <Card className={styles.header}>
                <Image src={"/images/avatar.png"} alt="profile-photo" width={45} height={45}></Image>
                <div className={styles.info}>
                    <Text type="body_strong">Châu Thành Cường</Text>
                    <Text type="body">Online</Text>
                </div>
                <div className={styles.actions}>
                    <Button appearance={"subtle"}>
                        <Icon name={"video"} type={"filled"}></Icon>
                    </Button>
                    <Button appearance={"subtle"}>
                        <Icon name={"call"} type={"filled"}></Icon>
                    </Button>
                    <Button appearance={"subtle"}>
                        <Icon name={"more_horizontal"} type={"filled"}></Icon>
                    </Button>
                    <Button appearance={"subtle"} onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <Icon name={"panel_left_contract"} type={"filled"}></Icon> : <Icon name={"panel_right_contract"} type={"filled"}></Icon>}
                    </Button>
                </div>
            </Card>
            <div className={styles.message_list_container}>

            </div>
            <Card className={styles.message_input_container}>
                <div className={styles.reply_message}>
                    <Icon name={"arrow_reply"} size={16} type={"filled"} />
                    <p>aaaaa</p>
                </div>
                <div className={styles.text_container}>
                    <Textarea />
                </div>
                <div className={styles.buttons}>
                    <div className={styles.button_left}>
                        <Button appearance={"subtle"}><Icon name={"image"} type={"regular"} size={20} /></Button>
                        <Button appearance={"subtle"}><Icon name={"attach"} type={"regular"} size={20} /></Button>
                        <Button appearance={"subtle"}><Icon name={"emoji"} type={"regular"} size={20} /></Button>
                    </div>
                    <div className={styles.button_right}>
                        <Button appearance={"accent"}>Send<Icon name={"send"} type={"regular"} size={20} /></Button>
                    </div>
                </div>
            </Card>
        </Layer>
    );
}

interface MessageGroupProps {

    messages: Message[];

    avatar: string;

    user_displayname: string;

    user_id: number;

    time: Date;

    style?: React.CSSProperties;

    className?: string;

}

function MessageGroup({ messages, avatar, user_displayname, user_id, time, style, className }: MessageGroupProps) {
}
