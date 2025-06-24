"use client";

import { useState } from "react";
import Image from "next/image"; 

import { ClientLayout } from "@/layouts";

import { DropdownSearch, Button, Icon, ConversationListCard, ConversationBoxCard, Checkbox } from "@/components";
import { useAuth } from "@/hooks";
import styles from './page.module.css';

export default function Page() {

    
    const conversation = {
        id: 1,
        is_group: false,
        name: "Châu Thành Cường",
        image: "/images/avatar.png",
        messages: [
            {
                id: 1,
                conversation_id: 1,
                user_id: 1,
                user_displayname: "Châu Thành Cường",
                content: "Hello, how are you?",
                time: new Date(),
                avatar: "/images/avatar.png",
                is_own: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 2,
                conversation_id: 1,
                user_id: 2,
                user_displayname: "Jen",
                content: "I'm good, thank you.",
                time: new Date(),
                avatar: "/images/avatar.png",
                is_own: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ]
    }

    const [isExpanded, setIsExpanded] = useState(true);
    const [replyMessage, setReplyMessage] = useState("");
    const [showedNotificationDialog, setShowedNotificationDialog] = useState(false);
    const [selectedNotificationDuration, setSelectedNotificationDuration] = useState<number>(0);

    const handleSelectNotificationDuration = (duration: number) => {
        setSelectedNotificationDuration(duration);
    }

    const mainClassname = `${styles.main} ${isExpanded ? styles.expanded : ""}`;

    return (
        <ClientLayout>
            <div className={styles.page}>
                <div className={styles.left}>
                    <ConversationListCard></ConversationListCard>
                </div>
                <div className={mainClassname}>
                    <div className={styles.center}>
                        <ConversationBoxCard conversation={conversation} style={{ width: "100%", height: "100%"}}></ConversationBoxCard>
                    </div>
                    {!isExpanded && <div className={styles.right}>
                        <div className={styles.conversation_detail_container}>

                            <div className={styles.user_infomation_container}>
                                <Image src={"/images/avatar.png"} alt={"avatar"} width={100} height={100}></Image>
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
                                
                                <div className={styles.conversation_setting} onClick={() => setShowedNotificationDialog(true)}>
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
                {showedNotificationDialog &&
                <div className={styles.notification_dialog_container}>
                    <div className={styles.notification_dialog}>
                        <div className={styles.notification_dialog_header}>
                            <p>Turn off notification</p>
                            <p>Are you sure you want to turn off notifications for this conversation?</p>
                        </div>
                        <div className={styles.notification_dialog_body}>
                            <Checkbox label={"For 1 hour"} onChange={() => {setSelectedNotificationDuration(1)}} checked={selectedNotificationDuration == 1}></Checkbox>
                            <Checkbox label={"For 4 hours"} onChange={() => {setSelectedNotificationDuration(4)}} checked={selectedNotificationDuration == 4}></Checkbox>
                            <Checkbox label={"For 8 hours"} onChange={() => {setSelectedNotificationDuration(8)}} checked={selectedNotificationDuration == 8}></Checkbox>
                            <Checkbox label={"Until I turn them back on"} onChange={() => {setSelectedNotificationDuration(-1)}} checked={selectedNotificationDuration == -1}></Checkbox>
                        </div>
                        <div className={styles.notification_dialog_footer}>
                            <Button appearance={"standard"} onClick={() => setShowedNotificationDialog(false)}>Cancel</Button>
                            <Button appearance={"accent"}>Confirm</Button>
                        </div>
                    </div>
                </div>
                }
            </div>
        </ClientLayout>
    );
} 