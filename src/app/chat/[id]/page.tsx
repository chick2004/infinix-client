"use client";

import { useState, use, useCallback } from "react";
import Image from "next/image"; 

import { ClientLayout } from "@/layouts";
import { requestInit } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { Dialog, Button, Icon, ConversationListCard, ConversationBoxCard, Checkbox, Skeleton } from "@/components";
import { useAuth } from "@/hooks";
import styles from './page.module.css';

export default function Page({ params }: { params: Promise<{ id: string }> }) {

    const { id } = use(params);

    const conversationQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/conversations/" + id;
    const queryConversation = async () => {
        const response = await fetch(conversationQueryUrl, requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch conversation");
        }
        return response.json();
    }
    const conversationQuery = useQuery({
        queryKey: [conversationQueryUrl],
        queryFn: queryConversation,
        refetchOnWindowFocus: false,
        retry: true,
        staleTime: 1000 * 60 * 5,
    });


    const [isExpanded, setIsExpanded] = useState(true);
    const toggleExpand = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    const mainClassname = `${styles.main} ${isExpanded ? styles.expanded : ""}`;

    return (
        <ClientLayout>
            <div className={styles.page}>
                <div className={styles.left}>
                    <ConversationListCard></ConversationListCard>
                </div>
                <div className={mainClassname}>
                    <div className={styles.center}>
                        {conversationQuery.isPending ? (
                            <Skeleton animation="pulse" style={{ width: "100%", height: "100%", borderRadius: "8px"}}></Skeleton>
                        ) : (
                            <ConversationBoxCard conversation={conversationQuery.data.data} is_expanded={isExpanded} onToggleExpand={toggleExpand} style={{ width: "100%", height: "100%"}}></ConversationBoxCard>
                        )}
                    </div>
                    {!isExpanded && <div className={styles.right}>
                        <div className={styles.conversation_detail_container}>

                            <div className={styles.user_infomation_container}>
                                <Image src={conversationQuery.data.data.image ?? "/images/avatar.png"} alt={"avatar"} width={100} height={100}></Image>
                                <div className={styles.user_infomation_displayname_container}>
                                    <div className={styles.user_infomation_displayname}>John Doe</div>
                                    <div className={styles.user_infomation_username}>@chick2004</div>
                                </div>
                            </div>

                            <div className={styles.conversation_settings}>
                                <div className={styles.conversation_setting}>
                                    <Icon name={"search"} size={20} type={"regular"}></Icon>
                                    <p>Search message</p>
                                </div>
                                
                                <div className={styles.conversation_setting}>
                                    <Icon name={"alert"} size={20} type={"regular"}></Icon>
                                    <p>Notification</p>
                                </div>

                                <div className={styles.conversation_setting}>
                                    <Icon name={"pin"} size={20} type={"regular"}></Icon>
                                    <p>Pinned messages</p>
                                </div>
                            </div>

                            <div className={styles.media_container}>
                                <div className={styles.media_gallery}>
                                    <div className={styles.media_gallery_item}>
                                        <Image src={"/images/splash1.webp"} alt={"splash"} fill></Image>
                                    </div>
                                    <div className={styles.media_gallery_item}>
                                        <Image src={"/images/splash1.webp"} alt={"splash"} fill></Image>
                                    </div>
                                    <div className={styles.media_gallery_item}>
                                        <Image src={"/images/splash1.webp"} alt={"splash"} fill></Image>
                                    </div>
                                    <div className={styles.media_gallery_item}>
                                        <Image src={"/images/splash1.webp"} alt={"splash"} fill></Image>
                                    </div>
                                    <div className={styles.media_gallery_item}>
                                        <Image src={"/images/splash1.webp"} alt={"splash"} fill></Image>
                                    </div>
                                </div>
                                <Button appearance={"standard"}>See all</Button>
                            </div>
                            
                            <div className={styles.conversation_settings}>
                                <div className={styles.conversation_setting}>
                                    <Icon name={"person_prohibited"} size={20} type={"regular"}></Icon>
                                    <p>Block this user</p>
                                </div>
                                
                                <div className={styles.conversation_setting}>
                                    <Icon name={"delete"} size={20} type={"regular"}></Icon>
                                    <p>Delete this conversation</p>
                                </div>
                            </div>

                        </div>
                    </div>}
                </div>
                {false &&
                <div className={styles.notification_dialog_container}>
                    <Dialog stroke shadow className={styles.notification_dialog}>
                        <div className={styles.notification_dialog_header}>
                            <p>Turn off notification</p>
                            <p>Are you sure you want to turn off notifications for this conversation?</p>
                        </div>
                        <div className={styles.notification_dialog_body}>
                            <Checkbox label={"For 1 hour"}></Checkbox>
                            <Checkbox label={"For 4 hours"}></Checkbox>
                            <Checkbox label={"For 8 hours"}></Checkbox>
                            <Checkbox label={"Until I turn them back on"}></Checkbox>
                        </div>
                        <div className={styles.notification_dialog_footer}>
                            <Button appearance={"standard"}>Cancel</Button>
                            <Button appearance={"accent"}>Confirm</Button>
                        </div>
                    </Dialog>
                </div>
                }
            </div>
        </ClientLayout>
    );
} 