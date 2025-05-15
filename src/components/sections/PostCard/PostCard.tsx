"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, memo } from "react";

import { Icon, Button, MediaBox, Video, DetailPost } from "@/components";
import { useClickOutside } from "@/hooks";

import PostCardProps from "./PostCard.types";
import styles from "./PostCard.module.scss";

function renderWithTags(text: string) {
    const parts = text.split(/(#\w+)/g);
    return parts.map((part, index) => {
        if (/^#\w+$/.test(part)) {
            return <Link key={index} href={`/hashtag/${part.slice(1)}`} className={styles.tag}>{part}</Link>;
        }
        return <span key={index}>{part}</span>;
    });
}

export default memo(function PostCard(props: PostCardProps) {

    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [isOpenPostActions, setIsOpenPostActions] = useState(false);

    const postActionsRef = useRef<HTMLDivElement>(null);
    useClickOutside(postActionsRef, () => {
        setIsOpenPostActions(false);
    });
    const postDetailRef = useRef<HTMLDivElement>(null);
    useClickOutside(postDetailRef, () => {
        setIsOpenDetail(false);
    });

    const date = new Date(props.time.replace(" ", "T"));

    return (
        <>
            <div className={styles.section}>
                <div className={styles.header}>
                    <div className={styles.avatar_container}>
                        <Image src={props.user_profile_photo || "/images/avatar.png"} width={40} height={40} alt="Avatar" />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.display_name}>{props.user_display_name}</div>
                        <div className={styles.post_info_container}>
                            <p className={styles.date}>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p className={styles.time}>{date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                            {props.visibility === "public" ? (
                                <Icon name={"earth"} size={16} type={"regular"}></Icon>
                            ) : props.visibility === "private" ? (
                                <Icon name={"lock_closed"} size={16} type={"regular"}></Icon>
                            ) : (
                                <Icon name={"person"} size={16} type={"regular"}></Icon>
                            )}
                        </div>
                    </div>
                    <div className={styles.post_actions_container}>
                        <Button appearance={"subtle"} onClick={() => setIsOpenPostActions(!isOpenPostActions)}>
                            <Icon name={"more_horizontal"} size={16}></Icon>
                        </Button>
                        {isOpenPostActions && (
                            <div className={styles.post_actions_list} ref={postActionsRef}>
                                <div className={styles.post_actions_item}> 
                                    <Icon name={"edit"} size={16}></Icon>
                                    Edit this post
                                </div>
                                <div className={styles.post_actions_item}> 
                                    <Icon name={"delete"} size={16}></Icon>
                                    Delete this post
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.content}>
                    <p>{renderWithTags(props.content)}</p>
                </div>

                {Array.isArray(props.medias) && props.medias.length > 0 && (
                    <MediaBox medias={props.medias}></MediaBox>
                )}

                <div className={styles.footer}>
                    <div className={styles.footer_left}>
                        <Button appearance={"subtle"}>
                            100
                            <Icon name={"heart"} size={20} type={"regular"}></Icon>
                        </Button>
                        <Button appearance={"subtle"} onClick={() => setIsOpenDetail(true)}>
                            100
                            <Icon name={"chat_empty"} size={20} type={"regular"}></Icon>
                        </Button>
                        <Button appearance={"subtle"}>
                            100
                            <Icon name={"share"} size={20} type={"regular"}></Icon>
                        </Button>
                    </div>
                    <div className={styles.footer_right}>
                        <Button appearance={"subtle"}>
                            <Icon name={"bookmark"} size={20} type={"regular"}></Icon>
                        </Button>
                    </div>
                </div>
            </div>

            {isOpenDetail && (
                <div ref={postDetailRef} className={styles.post_detail_container}>
                    <DetailPost {...props}></DetailPost>
                </div>
            )}
        </>
    );
});
