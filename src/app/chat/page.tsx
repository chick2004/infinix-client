"use client";

import { useState } from "react";
import Image from "next/image"; 

import ClientLayout from "@/layouts/ClientLayout/ClientLayout";

import { DropdownSearch, Button, Icon, Textarea, Chatbox, Checkbox } from "@/components";
import { useAuth } from "@/hooks";
import styles from './page.module.css';

export default function Page() {

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
                    <div className={styles.conversations_list_container}>
                        <div className={styles.title_container}>
                            <div className={styles.title}>Conversations</div>
                            <Button appearance={"subtle"}>
                                <Icon name={"chat_add"} type={"regular"}></Icon>
                            </Button>
                            <Button appearance={"subtle"}>
                                <Icon name={"more_horizontal"} type={"regular"}></Icon>
                            </Button>
                        </div>
                        <div className={styles.search_container}>
                            <DropdownSearch placeholder={"Search..."} suggestions={[]}></DropdownSearch>
                        </div>
                        <div className={styles.list_container}>
                            <div className={styles.item}>
                                <div className={styles.avatar}>
                                    <Image src={"/images/avatar.png"} width={45} height={45} alt={"avatar"}></Image>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.name}>John Doe</div>
                                    <div className={styles.message}>Hello, how are you? <span className={styles.time}>12:00 PM</span></div>
                                </div>
                                <Button appearance={"subtle"}>
                                    <Icon name={"more_horizontal"} type={"regular"}></Icon>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={mainClassname}>
                    
                    <div className={styles.center}>
                        <div className={styles.conversation_container}>
                            <div className={styles.header}>
                                <div className={styles.avatar}>
                                    <Image src={"/images/avatar.png"} width={45} height={45} alt={"avatar"}></Image>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.name}>John Doe</div>
                                    <div className={styles.status}>Online</div>
                                </div>
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
                            <div className={styles.chat_container}>
                                <Chatbox></Chatbox>
                            </div>
                        </div>
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