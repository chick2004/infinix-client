"use client";

import clsx from "clsx";
import Image from "next/image";
import { Conversation } from "@/types";
import { Layer, Text, DropdownSearch, Button, Icon, Skeleton} from "@/components";
import { useAuth } from "@/hooks";
import { requestInit } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import ConversationListCardProps from "./ConversationListCard.types";
import styles from "./ConversationListCard.module.scss";

export default function ConversationListCard({ style, className, ref, conversations }: ConversationListCardProps) {

    const root = clsx(
        styles.root,
        className
    );

    const { user } = useAuth();
    
    const conversationsQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/users/" + user.id + "/conversations";
    const queryConversations = async () => {
        const response = await fetch(conversationsQueryUrl, requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch conversations");
        }
        return response.json();
    }

    const conversationsQuery = useQuery({
        queryKey: [conversationsQueryUrl],
        queryFn: queryConversations,
        refetchOnWindowFocus: false,
        retry: true,
        staleTime: 1000 * 60 * 5,
    });

    return (
        <Layer stroke className={root} style={style} ref={ref}>
            <div className={styles.header}>
                <Text type="body_strong">Conversations</Text>
                <Button appearance={"subtle"}>
                    <Icon name={"chat_add"} type={"regular"}></Icon>
                </Button>
                <Button appearance={"subtle"}>
                    <Icon name={"more_horizontal"} type={"regular"}></Icon>
                </Button>
            </div>
            <DropdownSearch className={styles.search_bar} placeholder={"Search..."} suggestions={[]}></DropdownSearch>
            <div className={styles.conversation_list}>
                {conversationsQuery.isLoading ? (
                    <>
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "64px", borderRadius: "4px"}}></Skeleton>
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "64px", borderRadius: "4px"}}></Skeleton>
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "64px", borderRadius: "4px"}}></Skeleton>
                    </>
                ) : Array.isArray(conversationsQuery.data?.data) && conversationsQuery.data.data.length > 0 && (
                    conversationsQuery.data.data.map((conversation: Conversation, index: number) => (
                        <div className={styles.conversation} key={index}>
                            <Image src={conversation.image || "/images/avatar.png"} width={45} height={45} alt={"avatar"}></Image>
                            <div className={styles.info}>
                                <Text type="body_strong">{conversation.name}</Text>
                                <div className={styles.last_message}>
                                    <Text color="secondary">{conversation.last_message?.content}</Text>
                                    <Text type="caption">{conversation.last_message?.created_at}</Text>
                                </div>
                            </div>
                            <Button appearance={"subtle"}>
                                <Icon name={"more_horizontal"} type={"regular"}></Icon>
                            </Button>
                        </div>
                    ))
                )}
            </div>
        </Layer>
    );
}
