"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback, useReducer, memo } from "react";

import { Button, Icon, Textarea, Spinner, EmojiPicker, Video, Surface } from "@/components";
import { useRequest, useClickOutside } from "@/hooks";
import styles from "./EditPostCard.module.scss";
import EditPostCardProps from "./EditPostCard.types";

export default memo(function EditPostCard({ style, className, ref, post, handleClose }: EditPostCardProps) {

    const initialState  = {
        content: post.content || "",
        visibility: post.visibility || "public",
        medias: [] as File[],
        deleted_medias: [] as number[],
    };

    const [currentMedias, setCurrentMedias] = useState<{ file: File | undefined, url: string, type: string, isNewMedia: boolean, id: number | undefined }[]>(post.medias?.map(media => ({ file: undefined, url: process.env.NEXT_PUBLIC_API_URL + "/media" + media.path, type: media.type, isNewMedia: false, id: Number(media.id) })) || []);


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
            case "REMOVE_OLD_MEDIA":
                return { ...state, deleted_medias: [...state.deleted_medias, action.payload] };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

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
        setCurrentMedias(prev => {
            const temp_media = prev[index];
            if (temp_media && temp_media.id !== undefined) {
                dispatch({ type: "REMOVE_OLD_MEDIA", payload: temp_media.id });
            }
            return prev.filter((_, i) => i !== index);
        });
    } , []);


    const { data, loading, error, status, execute } = useRequest(process.env.NEXT_PUBLIC_API_URL + '/posts/' + post.id, "PUT");
    
    const handleSubmit = function() {
        console.log("Submitting post edit", state);
        execute(state);
    }

    useEffect(() => {
        if (status === 200) {
            handleClose?.();
        }
    }, [status]);

    const root = clsx(
        styles.section,
        className,
        loading ? styles.disabled_section : ""
    );

    return (
        <Surface stroke shadow ref={ref} style={style} className={root}>
            <div className={styles.header}>
                <div className={styles.avatar_container}>
                    <Image src={"/images/avatar.png"} width={40} height={40} alt="Avatar" />
                </div>
                <div className={styles.info}>
                    <div className={styles.display_name}>{"props.user_display_name"}</div>
                    <div className={styles.post_info_container}>
                        <p className={styles.date}>{(new Date(post.created_at?.replace(" ", "T") || "")).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p className={styles.time}>{(new Date(post.created_at?.replace(" ", "T") || "")).toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                        {state.visibility === "public" ? (
                            <Icon name={"earth"} size={16} type={"regular"}></Icon>
                        ) : state.visibility === "private" ? (
                            <Icon name={"lock_closed"} size={16} type={"regular"}></Icon>
                        ) : (
                            <Icon name={"person"} size={16} type={"regular"}></Icon>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.post_container}>
                <Textarea style={{maxHeight: "200px"}} placeholder={"What is on your mind?"} value={state.content} onChange={(value) => {dispatch({type: "SET_CONTENT", payload: value})}}></Textarea>

                {Array.isArray(currentMedias) && currentMedias.length > 0 && (
                    <MediaBox medias={currentMedias} handleRemoveMedia={handleRemoveMedia} />
                )}

                <div className={styles.actions}>
                    <div className={styles.actions_left}>
                        <button onClick={() => fileInputRef.current?.click()}>
                            <Icon name={"image"} size={20} type={"regular"}></Icon>
                        </button>
                        <div className={styles.emoji_picker_container}>
                            <button onClick={() => {setIsOpenEmojiPickerCard((prev) => !prev)}}>
                                <Icon name={"emoji"} size={20} type={"regular"}></Icon>
                            </button>
                            <div className={styles.emoji_picker}>
                                {isOpenEmojiPickerCard && <EmojiPicker ref={emojiPickerRef} onEmojiSelect={handleEmojiSelect} />}
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
                                {post.visibility === "public" ? (
                                    <Icon name={"earth"} size={20} type={"regular"}></Icon>
                                ) : post.visibility === "private" ? (
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
                    <div className={styles.buttons}>
                        <Button appearance={"standard"} onClick={handleClose}>
                            Cancel
                        </Button>
                        {loading ? (
                            <Button appearance={"accent"}>
                                Save
                                <Spinner></Spinner>
                            </Button>
                        ) : (
                            <Button appearance={"accent"} onClick={handleSubmit}>
                                Save
                            </Button>
                        )}
                    </div>
                </div>

                <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*,video/*" multiple onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    files.forEach(file => {
                        dispatch({ type: "ADD_MEDIA", payload: file }); // chỉ truyền file
                        setCurrentMedias(prev => [...prev, { file: file, type: file.type, url: URL.createObjectURL(file), isNewMedia: true, id: undefined }]);
                    });
                    if (fileInputRef.current) fileInputRef.current.value = "";
                }}/>
            </div>
        </Surface>
    );
});


const MediaBox = memo(function MediaBox({ medias, handleRemoveMedia }: { medias: { url: string, type: string, isNewMedia: boolean }[], handleRemoveMedia: (index: number) => void }) {

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
                    {media.type.startsWith("image/") ? (
                        <Image src={media.url} alt={""} width={100} height={100} />
                    ) : (
                        <Video src={media.url} style={{width: "100%", height: "100%", objectFit: "cover"}} autoPlay={true} muted={true}></Video>
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
