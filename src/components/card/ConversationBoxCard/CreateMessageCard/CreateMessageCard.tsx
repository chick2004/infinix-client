"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useReducer, useRef, useCallback, useEffect } from "react";
import { Layer, Flyout, Text, Button, Icon, Card, Textarea, Spinner } from "@/components";
import { requestInit } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import { useClickOutside } from "@/hooks";
import CreateMessageCardProps from "./CreateMessageCard.types";
import styles from "./CreateMessageCard.module.scss";


const EmojiPicker = dynamic(() => import('@/components').then(mod => ({ default: mod.EmojiPicker })), {
    loading: () => <Flyout stroke shadow className={styles.emoji_picker_loading}><Spinner></Spinner></Flyout>,
    ssr: false,
});

export default function CreateMessageCard({ style, className, ref, conversation_id, reply_to, onEndReply }: CreateMessageCardProps) {
    
    const root = clsx(
        styles.root,
        className
    );

    const initialState = {
        content: "",
        medias: [] as { file: File, url: string }[],
        conversation_id: conversation_id,
        reply_to_message_id: reply_to ? reply_to.id : null,
    }

    const reducer = (state: typeof initialState, action: any) => {
        switch (action.type) {
            case "SET_CONTENT":
                return { ...state, content: action.payload };
            case "ADD_MEDIA":
                return { ...state, medias: [...state.medias, action.payload] };
            case "REMOVE_MEDIA":
                return { ...state, medias: state.medias.filter((_, index) => index !== action.payload) };
            case "CLEAR":
                return initialState;
            case "SET_REPLY_TO_MESSAGE_ID":
                return { ...state, reply_to_message_id: action.payload };
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    // Sync reply_to_message_id with prop reply_to
    useEffect(() => {
        dispatch({ type: "SET_REPLY_TO_MESSAGE_ID", payload: reply_to ? reply_to.id : null });
    }, [reply_to]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const mutateCreateMessage = async (payload: any) => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/conversations/" + state.conversation_id + "/messages", requestInit("POST", payload));
        if (!response.ok) {
            throw new Error("Failed to create message");
        }
        return response.json();
    }

    const createMessageMutation = useMutation({
        mutationFn: mutateCreateMessage,
        onSuccess: (data) => {
            dispatch({ type: "CLEAR" });
            onEndReply?.();
        },
        onError: (error) => {
            console.error("Error creating message:", error);
        }
    });

    const handleSubmit = () => {
        if (!state.content.trim() && state.medias.length === 0) {
            return;
        }
        const messageData = {
            ...state,
            medias: state.medias.map(media => media.file),
        };
        console.log("Submitting message:", messageData);
        createMessageMutation.mutate(messageData);
    }

    
    const [isOpenEmojiPickerCard, setIsOpenEmojiPickerCard] = useState<boolean>(false);
    const emojiPickerRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(emojiPickerRef, () => {
        setIsOpenEmojiPickerCard(false);
    });
    
    const handleEmojiSelect = useCallback((emoji: { character: string }) => {
        dispatch({ type: "SET_CONTENT", payload: state.content + emoji.character });
    }, [state.content]);
    

    return (
    <Card className={styles.root} style={style} ref={ref}>
        {reply_to && (
            <div className={styles.reply_message}>
                <Icon name={"arrow_reply"} size={16} type={"filled"} />
                <p>{reply_to.content}</p>
            </div>
        )}
        <div className={styles.media_list}>
            {state.medias.map((media, index) => (
                <div className={styles.media_item} key={index}>
                    <Image src={media.url} alt={"media"} width={75} height={75} style={{objectFit: "cover"}} />
                    <button onClick={() => dispatch({ type: "REMOVE_MEDIA", payload: index })}>
                        <Icon name={"dismiss"} type={"regular"} size={16} />
                    </button>
                </div>
            ))}
        </div>
        <div className={styles.text_container}>
            <Textarea style={{maxHeight: "200px"}} value={state.content} onChange={(value) => dispatch({type: "SET_CONTENT", payload: value})}/>
        </div>
        <div className={styles.buttons}>
            <div className={styles.button_left}>
                <Button appearance={"subtle"} onClick={() => {fileInputRef.current?.click()}}>
                    <Icon name={"image"} type={"regular"} size={20}/>
                </Button>
                <Button appearance={"subtle"}>
                    <Icon name={"attach"} type={"regular"} size={20} />
                </Button>
                <div className={styles.emoji_picker_container} ref={emojiPickerRef} onClick={() => {setIsOpenEmojiPickerCard(!isOpenEmojiPickerCard)}}>
                    <Button appearance={"subtle"}>
                        <Icon name={"emoji"} type={"regular"} size={20} />
                    </Button>
                    {isOpenEmojiPickerCard && <EmojiPicker className={styles.emoji_picker} onEmojiSelect={handleEmojiSelect}></EmojiPicker>}
                </div>
            </div>
            <div className={styles.button_right}>
                {createMessageMutation.isPending ? (
                    <Button appearance={"accent"}>
                        Send
                        <Spinner></Spinner>
                    </Button>
                ) : (
                    <Button appearance={"accent"} onClick={handleSubmit}>Send<Icon name={"send"} type={"regular"} size={20} /></Button>
                )}
            </div>
        </div>
        <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*,video/*" multiple onChange={(e) => {
            const files = Array.from(e.target.files || []);
            files.forEach(file => {
                dispatch({ type: "ADD_MEDIA", payload: { file: file, url: URL.createObjectURL(file) } });
                // setCurrentMedias(prev => [...prev, { file: file, type: file.type, url: URL.createObjectURL(file), isNewMedia: true, id: undefined }]);
            });
            if (fileInputRef.current) fileInputRef.current.value = "";
        }}/>
    </Card>
    );
}