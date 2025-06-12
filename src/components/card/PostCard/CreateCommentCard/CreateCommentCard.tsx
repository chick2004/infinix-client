"use client";

import Image from "next/image";
import { useEffect, useRef, useReducer } from "react";
import { useRequest } from "@/hooks";

import { Button, Icon, Textarea, Spinner } from "@/components";
import CreateCommentCardProps from "./CreateCommentCard.types";
import styles from "./CreateCommentCard.module.scss";

export default function CreateCommentCard({ post_id }: CreateCommentCardProps) {

    const { data, loading, error, status, execute } = useRequest(process.env.NEXT_PUBLIC_API_URL + '/posts/' + post_id + "/comments", "POST");

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const initialState = {
        content: "",
        post_id: post_id,
        reply_to_comment_id: undefined,
        medias: [] as { file: File, url: string }[]
    }

    const reducer = (state: typeof initialState, action: any) => {
        switch (action.type) {
            case 'SET_CONTENT':
                return { ...state, content: action.payload };
            case 'SET_REPLY_TO_COMMENT_ID':
                return { ...state, reply_to_comment_id: action.payload };
            case 'ADD_MEDIA':
                return { ...state, medias: [...state.medias, action.payload] };
            case 'REMOVE_MEDIA':
                return { ...state, medias: state.medias.filter((media, index) => index !== action.payload) };
            case 'CLEAR':
                return { ...initialState };
            default:
                return state;
        }
    }


    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSubmit = () => {
        if (state.content.trim() === "" && state.medias.length === 0) {
            return;
        }
        execute({ ...state, medias: state.medias.map(media => media.file) });
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
                {state.medias.map((media, index) => (
                    <div key={index} className={styles.media_item}>
                        <Image src={media.url} alt={`media-${index}`} width={75} height={75} style={{objectFit: "cover"}} />
                        <button onClick={() => dispatch({type: "REMOVE_MEDIA", payload: index})}>
                            <Icon name={"dismiss"} type={"regular"} size={16} />
                        </button>
                    </div>
                ))}
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
                    <Button appearance={"subtle"}>
                        <Icon name={"emoji"} type={"regular"} size={20} />
                    </Button>
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

            

            <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*,video/*" multiple onChange={(e) => {
                const files = Array.from(e.target.files || []);
                files.forEach(file => {
                    dispatch({ type: "ADD_MEDIA", payload: { file, url: URL.createObjectURL(file) } });
                });
                if (fileInputRef.current) fileInputRef.current.value = "";
            }}/>
        </div>
    )
}