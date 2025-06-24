"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState, useReducer, useEffect } from "react";

import type { Message, MessageGroup } from "@/types";
import { requestInit } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { Layer, Text, Button, Icon, Card, Textarea, MessageCard, MessageGroupCard } from "@/components";
import { useAuth } from "@/hooks";
import CreateMessageCard from "./CreateMessageCard/CreateMessageCard";
import ConversationBoxCardProps from "./ConversationBoxCard.types";
import styles from "./ConversationBoxCard.module.scss";

export default function ConversationBoxCard({ style, className, ref, conversation}: ConversationBoxCardProps) {
    
    const root = clsx(
        styles.root,
        className
    );

    const { user } = useAuth();

    const messagesQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/conversations/" + conversation.id + "/messages";
    const queryMessages = async () => {
        const response = await fetch(messagesQueryUrl, requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch messages");
        }
        return response.json();
    };
    const messagesQuery = useQuery({
        queryKey: [messagesQueryUrl],
        queryFn: queryMessages,
        refetchOnWindowFocus: false,
        retry: true,
        staleTime: 1000 * 60 * 5,
    });

    const [groupedMessages, setGroupedMessages] = useState<Array<MessageGroup>>([]);
    const groupMessagesBySender = (messages: Array<Message>) => {
        const grouped = [];
        const TIME_LIMIT = 5 * 60 * 1000;
        let currentGroup: MessageGroup | null = null;

        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            const prevMessage = messages[i - 1];

            const isDifferentSender = !prevMessage || prevMessage.user.id !== message.user.id;
            const isTimeExceeded = prevMessage && (new Date(message.created_at.replace(" ", "T")).getTime() - new Date(prevMessage.created_at.replace(" ", "T")).getTime()) > TIME_LIMIT;

            if (!currentGroup || isDifferentSender || isTimeExceeded) {
                currentGroup = { avatar: message.user.profile.profile_photo || "/images/avatar.png", user_displayname: message.user.profile.display_name, user_id: message.user.id, messages: [], time: new Date(message.created_at.replace(" ", "T")), is_own: message.user.id == user.id };
                grouped.push(currentGroup);
            }

            currentGroup.messages.push(message);
        }

        return grouped;
    };

    useEffect(() => {
        if (messagesQuery.data) {
            const groupedMessages = groupMessagesBySender(messagesQuery.data.data);
            setGroupedMessages(groupedMessages);
        }
    }, [messagesQuery.data]);

    const [isExpanded, setIsExpanded] = useState(true);
    const [replyingMessage, setReplyingMessage] = useState<Message | null>(null);
    
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
                {groupedMessages.map((group, index) => {
                    const prevGroup = groupedMessages[index - 1];
                    const showTimeLabel = !prevGroup || (new Date(group.time).getTime() - new Date(prevGroup.time).getTime()) > 5 * 60 * 1000;

                    return (
                        <div className={styles.group_and_time} key={index}>
                            {showTimeLabel && (
                                <Text type="caption" color="secondary" className={styles.time_label}>
                                    {new Date(group.time).toLocaleString([], { hour: "2-digit", minute: "2-digit" })}
                                </Text>
                            )}
                            <MessageGroupCard className={styles.message_group} group={group} onReply={(message) => setReplyingMessage(message)} />
                        </div>
                    );
                })}
            </div>
            <CreateMessageCard conversation_id={conversation.id} reply_to={replyingMessage} onEndReply={() => setReplyingMessage(null)}></CreateMessageCard>
        </Layer>
    );
}




