"use client";

import Image from "next/image";
import { useState, useEffect, useReducer , useRef, useCallback, memo } from "react";

import { Button, Icon, Textarea, Spinner, EmojiPicker } from "@/components";
import { useRequest, useClickOutside } from "@/hooks";
import styles from "./CreatePostCard.module.scss";

export default memo(function CreatePostCard() {

    const initialState  = {
        content: "",
        visibility: "public",
        medias: [] as { file: File, url: string }[],
    };

    const reducer = (state: typeof initialState, action: any) => {
        switch (action.type) {
            case "SET_CONTENT":
                return { ...state, content: action.payload };
            case "SET_VISIBILITY":
                return { ...state, visibility: action.payload };
            case "ADD_MEDIA":
                return { ...state, medias: [...state.medias, action.payload] };
            case "REMOVE_MEDIA":
                return { ...state, medias: state.medias.filter((_, index) => index !== action.payload) };
            case "CLEAR":
                return { ...initialState };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const { data, loading, error, status, execute } = useRequest(process.env.NEXT_PUBLIC_API_URL + '/posts', "POST");

    const handleSubmit = function() {
        const postData = {
            ...state,
            medias: state.medias.map(media => media.file),
        };
        execute(postData);
    }

    useEffect(() => {
        if (status === 200) {
            dispatch({ type: "CLEAR" });
        }
    }, [status]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [isOpenVisibilityCard, setIsOpenVisibilityCard] = useState<boolean>(false);

    const [isOpenEmojiPickerCard, setIsOpenEmojiPickerCard] = useState<boolean>(false);

    const emojiPickerRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(emojiPickerRef, () => {
        setIsOpenEmojiPickerCard(false);
    });
    
    const handleEmojiSelect = useCallback((emoji: { character: string }) => {
        dispatch({ type: "SET_CONTENT", payload: state.content + emoji.character });
    }, [state.content]);

    const handleRemoveMedia = useCallback((index: number) => {
        dispatch({ type: "REMOVE_MEDIA", payload: index });
    } , []);

    return (
        <div className={`${styles.section} ${loading ? styles.disabled_section : ""}`}>
            <div className={styles.avatar_container}>
                <Image src={"/images/avatar.png"} alt={""} width={35} height={35}></Image>
            </div>
            <div className={styles.post_container}>
                <Textarea style={{maxHeight: "200px"}} placeholder={"What is on your mind?"} value={state.content} onChange={(value) => {dispatch({type: "SET_CONTENT", payload: value})}}></Textarea>

                {state.medias.length > 0 && (
                    <MediaBox medias={state.medias} handleRemoveMedia={handleRemoveMedia} />
                )}

                <div className={styles.actions}>
                    <div className={styles.actions_left}>
                        <button onClick={() => fileInputRef.current?.click()}>
                            <Icon name={"image"} size={20} type={"regular"}></Icon>
                        </button>
                        <div className={styles.emoji_picker_container} ref={emojiPickerRef}>
                            <button onClick={() => {setIsOpenEmojiPickerCard((prev) => !prev)}}>
                                <Icon name={"emoji"} size={20} type={"regular"}></Icon>
                            </button>
                            <div className={styles.emoji_picker}>
                                {isOpenEmojiPickerCard && <EmojiPicker onEmojiSelect={handleEmojiSelect} />}
                            </div>
                        </div>
                        <button>
                            <Icon name={"mic"} size={20} type={"regular"}></Icon>
                        </button>
                        <button>
                            <Icon name={"attach"} size={20} type={"regular"}></Icon>
                        </button>
                        <button>
                            <Icon name={"data_histogram"} size={20} type={"regular"}></Icon>
                        </button>
                        <div className={`${styles.visibility_dropdown} ${isOpenVisibilityCard ? styles.active : ""}`}>
                            <button onClick={() => setIsOpenVisibilityCard((prev) => !prev)}>
                                {state.visibility === "public" ? (
                                    <Icon name={"earth"} size={20} type={"regular"}></Icon>
                                ) : state.visibility === "private" ? (
                                    <Icon name={"lock_closed"} size={20} type={"regular"}></Icon>
                                ) : (
                                    <Icon name={"person"} size={20} type={"regular"}></Icon>
                                )}
                                <Icon name={"caret_down"} size={16} type={"filled"}></Icon>
                            </button>
                            <div className={styles.visibility_list}>
                                <div className={styles.visibility_item} onClick={() => dispatch({ type: "SET_VISIBILITY", payload: "public" })}>
                                    <Icon name={"earth"} size={16} type={"regular"}></Icon>
                                    <span>Public</span>
                                </div>
                                <div className={styles.visibility_item} onClick={() => dispatch({ type: "SET_VISIBILITY", payload: "private" })}>
                                    <Icon name={"lock_closed"} size={16} type={"regular"}></Icon>
                                    <span>Private</span>
                                </div>
                                <div className={styles.visibility_item} onClick={() => dispatch({ type: "SET_VISIBILITY", payload: "friends" })}>
                                    <Icon name={"person"} size={16} type={"regular"}></Icon>
                                    <span>Friends</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        <Button appearance={"accent"}>
                            Posting
                            <Spinner></Spinner>
                        </Button>
                    ) : (
                        <Button appearance={"accent"} onClick={handleSubmit}>
                            Post
                            <Icon name={"send"} size={20} type={"filled"}></Icon>
                        </Button>
                    )}
                </div>

                <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*,video/*" multiple onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    files.forEach(file => {
                        dispatch({ type: "ADD_MEDIA", payload: { file, url: URL.createObjectURL(file) } });
                    });
                    if (fileInputRef.current) fileInputRef.current.value = "";
                }}/>
            </div>
        </div>
    );
});

const MediaBox = memo(function MediaBox({ medias, handleRemoveMedia }: { medias: { file: File, url: string}[], handleRemoveMedia: (index: number) => void }) {

    const extraMediaCount = medias.length > 5 ? medias.length - 5 : 0;

    const mediaGalleryClassName = () => {
        const subClassName = () => {
            switch (medias.length) {
                case 1: return styles.one_image;
                case 2: return styles.two_images;
                case 3: return styles.three_images;
                case 4: return styles.four_images;
                case 5: return styles.five_images;
                default: return styles.more_images;
            }
        }
        return `${styles.media_gallery} ${subClassName()}`;
    };
    return (
        <div className={mediaGalleryClassName()}>
            {medias.slice(0, 5).map((media, index) => (
                <div key={index} className={styles.media_item}>
                    {media.file.type.startsWith("image/") ? (
                        <Image src={media.url} alt={""} width={100} height={100} />
                    ) : (
                        <video src={media.url} width={100} height={100} autoPlay muted></video>
                    )}
                    {index === 4 && extraMediaCount > 0 && (
                        <div className={styles.overlay}>+{extraMediaCount}</div>
                    )}
                    <button className={styles.remove_media_button} onClick={() => handleRemoveMedia(index)}>
                        <Icon name={"dismiss"} size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
});
