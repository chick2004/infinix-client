"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback, memo } from "react";

import { Button, Icon, MediaBox, Textarea, Spinner, EmojiPicker } from "@/components";
import { useRequest, useClickOutside } from "@/hooks";
import styles from "./EditPostCard.module.scss";
import EditPostCardProps from "./EditPostCard.types";

export default memo(function EditPostCard(props: EditPostCardProps) {

    const [postContent, setPostContent] = useState<string>("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    const handlePostContentChange = (value: string) => {
        setPostContent(value);
    };

    const [visibility, setVisibility] = useState<string>("public");
    const [isVisibilityOpen, setIsVisibilityOpen] = useState<boolean>(false);
    const handleVisibilityChange = (value: string) => {
        setVisibility(value);
        setIsVisibilityOpen(false);
    };

    const [mediaFiles, setMediaFiles] = useState<{url: string, file: File}[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        const newMedia = files.map((file) => ({
            url: URL.createObjectURL(file),
            file,
        }));
        setMediaFiles((prev) => [...prev, ...newMedia]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    const handleRemoveMedia = (index: number) => {
        setMediaFiles((prev) => prev.filter((_, i) => i !== index));
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const [emojiPickerOpen, setEmojiPickerOpen] = useState<boolean>(false);
    const emojiPickerRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(emojiPickerRef, () => {
        setEmojiPickerOpen(false);
    });
    const handleToggleEmojiPicker = () => {
        setEmojiPickerOpen((prev) => !prev);
    };
    const handleEmojiSelect = useCallback((emoji: { character: string }) => {
        setPostContent((prev) => prev + emoji.character);
    }, []);

    const extraMediaCount = mediaFiles.length > 5 ? mediaFiles.length - 5 : 0;

    const mediaGalleryClassName = () => {
        const subClassName = () => {
            switch (mediaFiles.length) {
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

    const date = new Date();

    return (
        <div ref={props.ref} style={styles} className={`${styles.section} ${props.className}`}>
            <div className={styles.header}>
                <div className={styles.avatar_container}>
                    <Image src={"/images/avatar.png"} width={40} height={40} alt="Avatar" />
                </div>
                <div className={styles.info}>
                    <div className={styles.display_name}>{"props.user_display_name"}</div>
                    <div className={styles.post_info_container}>
                        <p className={styles.date}>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p className={styles.time}>{date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                        {visibility === "public" ? (
                            <Icon name={"earth"} size={16} type={"regular"}></Icon>
                        ) : visibility === "private" ? (
                            <Icon name={"lock_closed"} size={16} type={"regular"}></Icon>
                        ) : (
                            <Icon name={"person"} size={16} type={"regular"}></Icon>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.post_container}>
                <Textarea style={{maxHeight: "200px"}} placeholder={"What is on your mind?"} value={postContent} onChange={handlePostContentChange}></Textarea>

                {mediaFiles.length > 0 && (
                    <div className={mediaGalleryClassName()}>
                        {mediaFiles.slice(0, 5).map((media, index) => (
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
                )}

                <div className={styles.actions}>
                    <div className={styles.actions_left}>
                        <button onClick={() => fileInputRef.current?.click()}>
                            <Icon name={"image"} size={20} type={"regular"}></Icon>
                        </button>
                        <div className={styles.emoji_picker_container}>
                            <button onClick={handleToggleEmojiPicker}>
                                <Icon name={"emoji"} size={20} type={"regular"}></Icon>
                            </button>
                            <div className={styles.emoji_picker}>
                                {emojiPickerOpen && <EmojiPicker ref={emojiPickerRef} onEmojiSelect={handleEmojiSelect} />}
                            </div>
                        </div>
                        <button>
                            <Icon name={"mic"} size={20} type={"regular"}></Icon>
                        </button>
                        {/* <button>
                            <Icon name={"attach"} size={20} type={"regular"}></Icon>
                        </button> */}
                        <button>
                            <Icon name={"data_histogram"} size={20} type={"regular"}></Icon>
                        </button>
                        <div className={`${styles.visibility_dropdown} ${isVisibilityOpen ? styles.active : ""}`}>
                            <button onClick={() => setIsVisibilityOpen((prev) => !prev)}>
                                {visibility === "public" ? (
                                    <Icon name={"earth"} size={20} type={"regular"}></Icon>
                                ) : visibility === "private" ? (
                                    <Icon name={"lock_closed"} size={20} type={"regular"}></Icon>
                                ) : (
                                    <Icon name={"person"} size={20} type={"regular"}></Icon>
                                )}
                                <Icon name={"caret_down"} size={16} type={"filled"}></Icon>
                            </button>
                            <div className={styles.visibility_list}>
                                <div className={styles.visibility_item} onClick={() => handleVisibilityChange("public")}>
                                    <Icon name={"earth"} size={16} type={"regular"}></Icon>
                                    <span>Public</span>
                                </div>
                                <div className={styles.visibility_item} onClick={() => handleVisibilityChange("private")}>
                                    <Icon name={"lock_closed"} size={16} type={"regular"}></Icon>
                                    <span>Private</span>
                                </div>
                                <div className={styles.visibility_item} onClick={() => handleVisibilityChange("friends")}>
                                    <Icon name={"person"} size={16} type={"regular"}></Icon>
                                    <span>Friends</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <Button appearance={"standard"} onClick={props.handleClose}>
                            Cancel
                        </Button>
                        <Button appearance={"accent"}>
                            Save
                            <Icon name={"send"} size={20} type={"filled"}></Icon>
                        </Button>
                    </div>
                </div>

                <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*,video/*" multiple onChange={handleFileChange} />
            </div>
        </div>
    );
})
