"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";

import type { Message, MessageGroup } from "@/types";
import { requestInit } from "@/lib";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Layer, Text, Button, Icon, Card, Spinner } from "@/components";
import MessageGroupCard from "./MessageGroupCard/MessageGroupCard";
import { useAuth } from "@/hooks";
import CreateMessageCard from "./CreateMessageCard/CreateMessageCard";
import ConversationBoxCardProps from "./ConversationBoxCard.types";
import styles from "./ConversationBoxCard.module.scss";

export default function ConversationBoxCard({ style, className, ref, conversation, is_expanded, onToggleExpand}: ConversationBoxCardProps) {
    
    const root = clsx(
        styles.root,
        className
    );

    const { user } = useAuth();

    const messagesQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/conversations/" + conversation.id + "/messages";
    const queryMessages = async ({ pageParam = 1 }) => {
        const response = await fetch(messagesQueryUrl + "?page=" + pageParam, requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch messages");
        }
        return response.json();
    };
    const messagesQuery = useInfiniteQuery({
        queryKey: [messagesQueryUrl],
        queryFn: ({ pageParam }) => queryMessages({ pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.meta.current_page + 1;
            return nextPage <= lastPage.meta.last_page ? nextPage : undefined;
        },
        getPreviousPageParam: (firstPage) => {
            const prevPage = firstPage.meta.current_page - 1;
            return prevPage >= 1 ? prevPage : undefined;
        },
        gcTime: 1000 * 60 * 5,
        staleTime: 1000 * 60 * 5,
    });

    const [groupedMessages, setGroupedMessages] = useState<Array<MessageGroup>>([]);
    const groupMessagesBySender = useCallback((messages: Array<Message>) => {
        const grouped = [];
        const TIME_LIMIT = 5 * 60 * 1000;
        let currentGroup: MessageGroup | null = null;

        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            const prevMessage = messages[i - 1];

            const isDifferentSender = !prevMessage || prevMessage.user.id !== message.user.id;
            const isTimeExceeded = prevMessage && (new Date(message.created_at.replace(" ", "T")).getTime() - new Date(prevMessage.created_at.replace(" ", "T")).getTime()) > TIME_LIMIT;

            if (!currentGroup || isDifferentSender || isTimeExceeded) {
                currentGroup = { avatar: message.user.profile.profile_photo || "/images/avatar.png", user_displayname: message.user.profile.display_name, user_id: message.user.id, messages: [], time: new Date(message.created_at.replace(" ", "T")), is_own: message.user.id == user?.id };
                grouped.push(currentGroup);
            }

            currentGroup.messages.push(message);
        }

        return grouped;
    }, [user?.id]);

    const allMessages = useMemo(() => {
        return messagesQuery.data?.pages.flatMap(page => page.data) ?? [];
    }, [messagesQuery.data]);

    useEffect(() => {
        if (messagesQuery.data) {
            const groupedMessages = groupMessagesBySender(allMessages);
            setGroupedMessages(groupedMessages);
        }
    }, [messagesQuery.data, groupMessagesBySender]);

    const parentRef = useRef<HTMLDivElement>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && messagesQuery.hasNextPage && !messagesQuery.isFetchingNextPage) {
                messagesQuery.fetchNextPage();
            }
        },
        [messagesQuery]
    );

    useEffect(() => {
        const option = {
            root: parentRef.current,
            rootMargin: "0px",
            threshold: 0.1,
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
            observer.disconnect();
        };
    }, [handleObserver, allMessages.length]);
    

    const [replyingMessage, setReplyingMessage] = useState<Message | null>(null);
    const [edittingMessage, setEdittingMessage] = useState<Message | null>(null);
    
    return (
        <Layer stroke className={root} style={style} ref={ref}>
            <Card className={styles.header}>
                <Image src={conversation.image || "/images/avatar.png"} alt="profile-photo" width={45} height={45}></Image>
                <div className={styles.info}>
                    <Text type="body_strong">{conversation.name}</Text>
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
                    <Button appearance={"subtle"} onClick={onToggleExpand}>
                        {is_expanded ? <Icon name={"panel_left_contract"} type={"filled"}></Icon> : <Icon name={"panel_right_contract"} type={"filled"}></Icon>}
                    </Button>
                </div>
            </Card>
            <div className={styles.message_list_container}>
                {groupedMessages.length > 0 && groupedMessages.map((group, index) => {
                    const prevGroup = groupedMessages[index - 1];
                    const showTimeLabel = !prevGroup || (new Date(group.time).getTime() - new Date(prevGroup.time).getTime()) > 5 * 60 * 1000;

                    return (
                        <div key={index} className={styles.group_and_time}>
                            {showTimeLabel && (
                                <Text type="caption" color="secondary" className={styles.time_label}>
                                    {new Date(group.time).toLocaleString([], { hour: "2-digit", minute: "2-digit" })}
                                </Text>
                            )}
                            <MessageGroupCard show_display_name={conversation.is_group} className={styles.message_group} group={group} onReply={(message) => setReplyingMessage(message)} onEdit={(message) => setEdittingMessage(message)}/>
                        </div>
                    );
                })}
                {messagesQuery.hasNextPage && (
                    <Spinner ref={loaderRef} style={{margin: "20px auto"}}></Spinner>
                )}
            </div>
            <CreateMessageCard conversation_id={conversation.id} reply_to={replyingMessage} onEndReply={() => setReplyingMessage(null)} editting_message={edittingMessage} onEndEdit={() => setEdittingMessage(null)}></CreateMessageCard>
        </Layer>
    );
}




