"use client";

import Image from "next/image";
import dynamic from 'next/dynamic';
import { useState, useReducer , useRef, useCallback, memo } from "react";
import type { Post, ApiPaginatedResponse, InfiniteQueryData } from "@/types";
import { Button, Icon, Textarea, Spinner, Flyout } from "@/components";
import { useClickOutside, useMotion, MotionName } from "@/hooks";
import { requestInit } from "@/lib";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import styles from "./CreatePostCard.module.scss";

const EmojiPicker = dynamic(() => import('@/components').then(mod => ({ default: mod.EmojiPicker })), {
    loading: () => <Flyout stroke shadow className={styles.emoji_picker_loading}><Spinner></Spinner></Flyout>,
    ssr: false,
});

export default memo(function CreatePostCard() {

    const initialState  = {
        content: "",
        visibility: "public",
        medias: [] as { file: File, url: string }[],
    };

    type Action = { type: "SET_CONTENT"; payload: string } | { type: "SET_VISIBILITY"; payload: "public" | "private" | "friends" } | { type: "ADD_MEDIA"; payload: { file: File; url: string } } | { type: "REMOVE_MEDIA"; payload: number } | { type: "CLEAR" };

    const reducer = (state: typeof initialState, action: Action) => {
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

    const queryClient = useQueryClient();
    const postQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/posts"
    const mutateCreatePost = async (payload: { content: string; visibility: "public" | "private" | "friends"; medias: File[] }): Promise<ApiPaginatedResponse<Post>> => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/posts', requestInit("POST", payload));
        if (!response.ok) {
            throw new Error("Failed to create post");
        }
        return response.json();
    }
    const createPostMutation = useMutation({
        mutationFn: mutateCreatePost,
        onError: (error) => {
            console.error("Error creating post:", error);
        },
        onSuccess: (data) => {
            if (data.status == 201) {
                dispatch({ type: "CLEAR" });
                queryClient.setQueryData([postQueryUrl], (oldData: InfiniteQueryData<ApiPaginatedResponse<Post>>) => {
                    if (!oldData) return;
                    return {
                        ...oldData,
                        pages: [
                            {
                                data: [data.data, ...oldData.pages[0].data],
                                meta: oldData.pages[0].meta,
                            },
                            ...oldData.pages.slice(1),
                        ],
                    };
                });
            }
        }
    });


    const handleSubmit = function() {
        if (!state.content.trim() && state.medias.length === 0) {
            return;
        }
        const postData = {
            ...state,
            visibility: state.visibility as "public" | "private" | "friends",
            medias: state.medias.map(media => media.file),
        };
        createPostMutation.mutate(postData);
    }

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [isOpenVisibilityCard, setIsOpenVisibilityCard] = useState<boolean>(false);
    const { shouldRender, animationStyle } = useMotion(isOpenVisibilityCard, { appear: MotionName.SLIDE_DOWN_IN, appearDistance: 20, disappear: MotionName.SLIDE_UP_OUT, disappearDistance: 20 });
    const visibilityCardRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(visibilityCardRef, () => {
        setIsOpenVisibilityCard(false);
    });

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
        <div className={`${styles.section} ${createPostMutation.isPending ? styles.disabled_section : ""}`}>
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
                        <div className={styles.visibility_dropdown} ref={visibilityCardRef}>
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
                            { shouldRender && (
                                <Flyout stroke shadow className={styles.visibility_list} style={animationStyle}>
                                    <div className={styles.visibility_item} onClick={() => {dispatch({ type: "SET_VISIBILITY", payload: "public" }); setIsOpenVisibilityCard(false);}}>
                                        <Icon name={"earth"} size={16} type={"regular"}></Icon>
                                        <span>Public</span>
                                    </div>
                                    <div className={styles.visibility_item} onClick={() => {dispatch({ type: "SET_VISIBILITY", payload: "private" }); setIsOpenVisibilityCard(false);}}>
                                        <Icon name={"lock_closed"} size={16} type={"regular"}></Icon>
                                        <span>Private</span>
                                    </div>
                                    <div className={styles.visibility_item} onClick={() => {dispatch({ type: "SET_VISIBILITY", payload: "friends" }); setIsOpenVisibilityCard(false);}}>
                                        <Icon name={"person"} size={16} type={"regular"}></Icon>
                                        <span>Friends</span>
                                    </div>
                                </Flyout>
                            )}
                        </div>
                    </div>
                    {createPostMutation.isPending ? (
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
