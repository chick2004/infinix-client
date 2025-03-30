"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

import { Button, Icon, Input, Textarea, Select, EmojiPicker } from "@/components";
import { useFetch } from "@/hooks";
import styles from "./CreatePostCard.module.css";

interface MediaFile {
    url: string;
    file: File;
}

export function CreatePostCard() {
    // Content handler
    const [postContent, setPostContent] = useState<string>("");

    const handlePostContentChange = (value: string) => {
        setPostContent(value);
    };

    // Media handler
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
    const scrollRef = useRef<HTMLDivElement | null>(null);
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

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            if (scrollRef.current) {
                event.preventDefault();
                scrollRef.current.scrollLeft += event.deltaY;
            }
        };
        const scrollContainer = scrollRef.current;

        if (scrollContainer) {
            scrollContainer.addEventListener("wheel", handleWheel);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("wheel", handleWheel);
            }
        };
    }, [mediaFiles]);

    // Emoji picker handler
    const [emojiPickerOpen, setEmojiPickerOpen] = useState<boolean>(false);

    const handleToggleEmojiPicker = () => {
        setEmojiPickerOpen((prev) => !prev);
    };

    const handleEmojiSelect = (emoji: { character: string }) => {
        setPostContent((prev) => prev + emoji.character);
    };

    // Formdata handler
    const handleSubmit = () => {
        // Handle form submission logic
    };

    return (
        <div className={styles.section}>
            <div className={styles.avatar_container}>
                <Image src={"/images/avatar.png"} alt={""} width={35} height={35}></Image>
            </div>
            <div className={styles.post_container}>
                <Textarea placeholder={"What is on your mind?"} value={postContent} onChange={handlePostContentChange}></Textarea>

                {mediaFiles.length > 0 && (
                    <div className={styles.media_gallery} ref={scrollRef}>
                        {mediaFiles.map((media, index) => (
                            <div key={index} className={styles.media_item}>
                                {media.file.type.startsWith("image/") ? (
                                    <Image src={media.url} alt={""} width={100} height={100} />
                                ) : (
                                    <video src={media.url} width={100} height={100} controls></video>
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
                            {emojiPickerOpen && (
                                <div className={styles.emoji_picker}>
                                    <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                                </div>
                            )}
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
                        <button>
                            <Icon name={"earth"} size={20} type={"regular"}></Icon>
                            <Icon name={"caret_down"} size={16} type={"filled"}></Icon>
                        </button>
                    </div>
                    <Button appearance={"accent"} onClick={handleSubmit}>
                        Post
                        <Icon name={"send"} size={20}></Icon>
                    </Button>
                </div>

                <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*,video/*" multiple onChange={handleFileChange} />
            </div>
        </div>
    );
}
