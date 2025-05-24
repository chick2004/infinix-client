"use client";

import { useState, useEffect, useRef } from "react";
import { Icon, Textarea, Button, MessageGroup } from "@/components";
import MessageProps from "@/components/card/Message/Message.types";
import MessageGroupProps from "@/components/card/MessageGroup/MessageGroup.types";
import styles from "./Chatbox.module.scss";

export default function Chatbox() {

    const [replyMessage, setReplyMessage] = useState<MessageProps | null>(null);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Array<MessageProps>>([
        {
            id: 1, user_id: 1, user_displayname: "John Doe", content: "Hello, how are you?", time: new Date(), avatar: "/images/avatar.png", is_own: true
        },
        {
            id: 2, user_id: 1, user_displayname: "John Doe", content: "Are you there?", time: new Date(), avatar: "/images/avatar.png", is_own: true
        },
        {
            id: 3, user_id: 2, user_displayname: "Jen", content: "I'm good, thank you.", time: new Date(), avatar: "/images/avatar.png", is_own: false
        }
    ]);

    const [groupMessages, setGroupMessages] = useState<MessageGroupProps[]>([]);
    const messageListRef = useRef<HTMLDivElement | null>(null);

    const groupMessagesBySender = (messages: Array<MessageProps>) => {
        const grouped = [];
        const TIME_LIMIT = 5 * 60 * 1000;
        let currentGroup: MessageGroupProps | null = null;

        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            const prevMessage = messages[i - 1];

            const isDifferentSender = !prevMessage || prevMessage.user_id !== message.user_id;
            const isTimeExceeded = prevMessage && (message.time.getTime() - prevMessage.time.getTime()) > TIME_LIMIT;

            if (!currentGroup || isDifferentSender || isTimeExceeded) {
                currentGroup = { avatar: message.avatar, user_displayname: message.user_displayname, user_id: message.user_id, messages: [], time: message.time };
                grouped.push(currentGroup);
            }

            currentGroup.messages.push({ id: message.id, user_id: message.user_id, user_displayname: message.user_displayname, content: message.content, time: message.time, avatar: message.avatar, is_own: message.is_own });
        }

        return grouped;
    };

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            setMessages((prev) => [
                ...prev,
                { id: new Date().getTime(), user_id: 1, user_displayname: "John Doe", content: message.trim(), time: new Date(), avatar: "/images/avatar.png", is_own: true }
            ]);
            setMessage("");
        }
    };

    useEffect(() => {
        const grouped = groupMessagesBySender(messages);
        setGroupMessages(grouped);
        
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        console.log(message);
    }, [message]);

    return (
        <div className={styles.section}>
            <div className={styles.message_list_container} ref={messageListRef}>
                {groupMessages.map((group, index) => {
                    const prevGroup = groupMessages[index - 1];
                    const showTimeLabel = !prevGroup || (new Date(group.time).getTime() - new Date(prevGroup.time).getTime()) > 5 * 60 * 1000;

                    return (
                        <div key={index}>
                            {showTimeLabel && (
                                <div className={styles.time_label}>
                                    {new Date(group.time).toLocaleString([], { hour: "2-digit", minute: "2-digit" })}
                                </div>
                            )}
                            <MessageGroup messages={group.messages} avatar={group.avatar} user_displayname={group.user_displayname} user_id={group.user_id} time={group.time} />
                        </div>
                    );
                })}
            </div>
            <div className={styles.input_container}>
                {replyMessage && (
                    <div className={styles.reply_message}>
                        <Icon name={"arrow_reply"} size={16} type={"regular"} />
                        <p>{replyMessage.content}</p>
                    </div>
                )}
                <div className={styles.text_container}>
                    <Textarea value={message} onChange={setMessage} />
                </div>
                <div className={styles.buttons}>
                    <div className={styles.button_left}>
                        <Button appearance={"subtle"}><Icon name={"image"} type={"regular"} size={20} /></Button>
                        <Button appearance={"subtle"}><Icon name={"attach"} type={"regular"} size={20} /></Button>
                        <Button appearance={"subtle"}><Icon name={"emoji"} type={"regular"} size={20} /></Button>
                    </div>
                    <div className={styles.button_right}>
                        <Button appearance={"accent"} onClick={handleSendMessage}>Send<Icon name={"send"} type={"regular"} size={20} /></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
