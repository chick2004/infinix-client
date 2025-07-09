"use client";

import clsx from "clsx";
import dynamic from 'next/dynamic';
import Image from "next/image";
import { useState, useEffect, useRef, useReducer } from "react";
import { requestInit } from "@/lib";
import { useMutation } from "@tanstack/react-query";

import { Button, Icon, Textarea, Spinner } from "@/components";
import { useClickOutside } from "@/hooks";
import CreateCommentCardProps from "./CreateCommentCard.types";
import styles from "./CreateCommentCard.module.scss";

const EmojiPicker = dynamic(() => import('@/components').then(mod => ({ default: mod.EmojiPicker })), {
    loading: () => <div className={styles.emoji_picker_loading}><Spinner></Spinner></div>,
    ssr: false,
});

export default function CreateCommentCard({ style, className, ref, post_id, editting_comment, onEndEdit }: CreateCommentCardProps) {

    const [isOpenEmojiPickerCard, setIsOpenEmojiPickerCard] = useState<boolean>(false);
    const emojiPickerRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(emojiPickerRef, () => {
        setIsOpenEmojiPickerCard(false);
    });

    const initialState = {
        content: "",
        post_id: post_id,
        reply_to_comment_id: undefined as number | undefined,
        media:  {} as { file: File | undefined, type: string, url: string } | undefined,
        remove_media: false as boolean | undefined,
    }

    type Action = 
        | { type: "SET_CONTENT"; payload: string }
        | { type: "SET_REPLY_TO_COMMENT_ID"; payload?: number }
        | { type: "SET_MEDIA"; payload?: { file: File | undefined, type: string, url: string } }
        | { type: "REMOVE_MEDIA" }
        | { type: "CLEAR" }
        | { type: "SET_ALL"; payload: typeof initialState };

    const reducer = (state: typeof initialState, action: Action) => {
        switch (action.type) {
            case "SET_CONTENT":
                return { ...state, content: action.payload };
            case "SET_REPLY_TO_COMMENT_ID":
                return { ...state, reply_to_comment_id: action.payload };
            case "SET_MEDIA":
                return { ...state, media: action.payload, remove_media: false };
            case "REMOVE_MEDIA":
                return { ...state, media: undefined, remove_media: true };
            case "CLEAR":
                return { ...initialState };
            case "SET_ALL":
                return { ...state, ...action.payload };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const mutateCreateComment = async (payload: { content: string, post_id: number, reply_to_comment_id: number | undefined, media: File | undefined, remove_media: boolean | undefined}) => {
        const response = await fetch(editting_comment ? process.env.NEXT_PUBLIC_API_URL + "/comments/" + editting_comment.id : process.env.NEXT_PUBLIC_API_URL + "/posts/" + post_id + "/comments", requestInit(editting_comment ? "PUT" : "POST", payload));
        if (!response.ok) {
            throw new Error("Failed to create comment");
        }
        return response.json();
    }

    const createCommentMutation = useMutation({
        mutationFn: mutateCreateComment,
        onError: (error) => {
            console.error("Error creating comment:", error);
        },
        onSuccess: (data) => {
            console.log("Comment created successfully:", data);
            dispatch({ type: "CLEAR" });
            onEndEdit?.();
        }
    });


    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = () => {
        if (state.content.trim() === "" && state.media) {
            return;
        }
        const payload = { ...state };
        if (payload.remove_media === false) {
            delete payload.remove_media;
        }
        createCommentMutation.mutate({ ...payload, media: state.media ? state.media.file : undefined });
    }

    useEffect(() => {
        if (editting_comment) {
            dispatch({
                type: "SET_ALL",
                payload: {
                    content: editting_comment.content || "",
                    post_id: editting_comment.post_id,
                    media: editting_comment.media ? { file: undefined, type: editting_comment.media.type, url: process.env.NEXT_PUBLIC_API_URL + "/media" + editting_comment.media.path } : undefined,
                    reply_to_comment_id: editting_comment.reply_to_comment_id,
                    remove_media: false,
                }
            });
        }
    }, [editting_comment]);

    const root = clsx(
        styles.root,
        className
    );

    return (
        <div className={root} style={style} ref={ref}>
            <div className={styles.media_list}>
                {state.media?.url && (
                    <div className={styles.media_item}>
                        <Image src={state.media.url} alt={"media"} width={75} height={75} style={{objectFit: "cover"}} />
                        <button onClick={() => dispatch({type: "REMOVE_MEDIA"})}>
                            <Icon name={"dismiss"} type={"regular"} size={16} />
                        </button>
                    </div>
                )}
            </div>
            <div className={styles.text_container}>
                <Textarea value={state.content} onChange={(value) => dispatch({type: "SET_CONTENT", payload: value})}/>
            </div>
            <div className={styles.buttons}>
                <div className={styles.button_left}>
                    <Button appearance={"subtle"} onClick={() => {fileInputRef.current?.click()}}>
                        <Icon name={"image"} type={"regular"} size={20} />
                    </Button>
                    <Button appearance={"subtle"}>
                        <Icon name={"camera"} type={"regular"} size={20} />
                    </Button>
                    <div className={styles.emoji_picker_container} ref={emojiPickerRef}>
                        <Button appearance={"subtle"} onClick={() => {setIsOpenEmojiPickerCard(!isOpenEmojiPickerCard)}}>
                            <Icon name={"emoji"} type={"regular"} size={20} />
                        </Button>
                        {isOpenEmojiPickerCard && (
                            <div className={styles.emoji_picker}>
                                <EmojiPicker onEmojiSelect={(emoji) => {
                                    dispatch({ type: "SET_CONTENT", payload: state.content + emoji.character });
                                }} />
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.button_right}>
                    {editting_comment ? createCommentMutation.isPending ? (
                        <>
                            <Button>
                                Cancel
                            </Button>
                            <Button appearance={"accent"}>
                                Saving
                                <Spinner></Spinner>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => { dispatch({ type: "CLEAR" }); onEndEdit?.()}}>
                                Cancel
                            </Button>
                            <Button appearance={"accent"} onClick={handleSubmit}>
                                Save
                                <Icon name={"send"} type={"filled"} size={20} />
                            </Button>
                        </>
                    ) : createCommentMutation.isPending ? (
                        <Button appearance={"accent"}>
                            Sending
                            <Spinner></Spinner>
                        </Button>
                    ) : (
                        <Button appearance={"accent"} onClick={handleSubmit}>
                            Send
                            <Icon name={"send"} type={"filled"} size={20} />
                        </Button>
                    )}
                </div>
            </div>

            

            <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*,video/*" onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                dispatch({ type: "SET_MEDIA", payload: { file: file, type: file.type, url: URL.createObjectURL(file) } });
                if (fileInputRef.current) fileInputRef.current.value = "";
            }}/>
        </div>
    )
}