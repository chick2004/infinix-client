"use client";

import dynamic from 'next/dynamic';
import Image from "next/image";
import { useState, useEffect, useRef, useReducer } from "react";
import { useRequest } from "@/hooks";

import { Button, Icon, Textarea, Spinner } from "@/components";
import { useClickOutside } from "@/hooks";
import CreateCommentCardProps from "./CreateCommentCard.types";
import styles from "./CreateCommentCard.module.scss";

const EmojiPicker = dynamic(() => import('@/components').then(mod => ({ default: mod.EmojiPicker })), {
    loading: () => <div className={styles.emoji_picker_loading}><Spinner></Spinner></div>,
    ssr: false,
});

export default function CreateCommentCard({ post_id }: CreateCommentCardProps) {

    const [isOpenEmojiPickerCard, setIsOpenEmojiPickerCard] = useState<boolean>(false);
    const emojiPickerRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(emojiPickerRef, () => {
        setIsOpenEmojiPickerCard(false);
    });

    const { data, loading, error, status, execute } = useRequest(process.env.NEXT_PUBLIC_API_URL + "/posts/" + post_id + "/comments", "POST");

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const initialState = {
        content: "",
        post_id: post_id,
        reply_to_comment_id: undefined,
        media:  {} as { file: File, url: string }
    }

    const reducer = (state: typeof initialState, action: any) => {
        switch (action.type) {
            case "SET_CONTENT":
                return { ...state, content: action.payload };
            case "SET_REPLY_TO_COMMENT_ID":
                return { ...state, reply_to_comment_id: action.payload };
            case "SET_MEDIA":
                return { ...state, media: action.payload };
            case "REMOVE_MEDIA":
                return { ...state, media: {} };
            case "CLEAR":
                return { ...initialState };
            default:
                return state;
        }
    }


    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSubmit = () => {
        if (state.content.trim() === "" && state.media) {
            return;
        }
        execute({ ...state, media: state.media ? [state.media.file] : [] });
    }

    useEffect(() => {
        if (status === 200) {
            console.log("Comment created successfully", data);
            dispatch({ type: "CLEAR" });
        }
    }, [status]);

    return (
        <div className={styles.comment_input}>
            <div className={styles.media_list}>
                {state.media.url && (
                    <div className={styles.media_item}>
                        <Image src={state.media.url} alt={"media"} width={75} height={75} style={{objectFit: "cover"}} />
                        <button onClick={() => dispatch({type: "SET_MEDIA"})}>
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
                    {loading ? (
                        <Button appearance={"accent"}>
                            Sending
                            <Spinner></Spinner>
                        </Button>
                    ) : (
                        <Button appearance={"accent"} onClick={handleSubmit}>
                            Send
                            <Icon name={"send"} type={"regular"} size={20} />
                        </Button>
                    )}
                </div>
            </div>

            

            <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*,video/*" onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                dispatch({ type: "SET_MEDIA", payload: { file, url: URL.createObjectURL(file) } });
                if (fileInputRef.current) fileInputRef.current.value = "";
            }}/>
        </div>
    )
}