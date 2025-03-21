"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import EmojiPicker from 'emoji-picker-react';

import { Button, Icon, Input, Textarea } from "@/components";
import styles from "./CreatePostCard.module.css";

export function CreatePostCard() {

    const [mediaFiles, setMediaFiles] = useState([]);

    const scrollRef = useRef(null);
    const fileInputRef = useRef(null);

    const [postContent, setPostContent] = useState("");
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

    const handleToggleEmojiPicker = () => {
        setEmojiPickerOpen((prev) => !prev);
    };

    const handleEmojiClick = (emojiObject, event) => {
        setPostContent((prev) => prev + emojiObject.emoji);
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newMedia = files.map((file) => ({
            url: URL.createObjectURL(file),
            file,
        }));
        setMediaFiles((prev) => [...prev, ...newMedia]);
        fileInputRef.current.value = "";
    }

    const handleRemoveMedia = (index) => {
        setMediaFiles((prev) => prev.filter((_, i) => i !== index));
        fileInputRef.current.value = "";
    };

    useEffect(() => {

        const handleWheel = (event) => {
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
    }, []);

    return (
        <div className={styles.section}>
            <div className={styles.avatar_container}>
                <Image src={'/images/avatar.png'} alt={''} width={35} height={35}></Image>
            </div>
            <div className={styles.post_container}>

                <Textarea placeholder={'What is on your mind?'} defaultValue={postContent}></Textarea>

                {mediaFiles.length > 0 && (
                    <div className={styles.media_gallery} ref={scrollRef}>
                    {mediaFiles.map((media, index) => (
                        <div key={index} className={styles.media_item}>
                            <Image src={media.url} alt={""} width={100} height={100} />
                            <button className={styles.remove_media_button} onClick={() => handleRemoveMedia(index)}>
                                <Icon name={"dismiss"} size={16} />
                            </button>
                        </div>
                    ))}
                </div>
                )}

                <div className={styles.actions}>
                    <div className={styles.actions_left}>
                        <button onClick={() => fileInputRef.current.click()}>
                            <Icon name={"image"} size={20} type={"regular"}></Icon>
                        </button>
                        <div className={styles.emoji_picker_container}>
                            <button onClick={handleToggleEmojiPicker}>
                                <Icon name={"emoji"} size={20} type={"regular"}></Icon>
                            </button>
                            <div>
                                <EmojiPicker className={styles.emoji_picker} open={emojiPickerOpen} onEmojiClick={handleEmojiClick} emojiStyle={"facebook"} lazyLoadEmojis={true}/>
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
                    </div>
                    <Button appearance={"accent"}>
                        Post
                        <Icon name={"send"} size={20}></Icon>
                    </Button>
                </div>

                <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*,video/*" multiple onChange={handleFileChange}/>
            </div>
        </div>
    )
}