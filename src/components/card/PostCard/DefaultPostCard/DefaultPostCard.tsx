"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, memo } from "react";

import { Icon, Button, MediaBox, AcrylicCard, MicaCard} from "@/components";
import { useClickOutside, useMotion, MotionName } from "@/hooks";

import DefaultPostCardProps from "./DefaultPostCard.types";
import styles from "./DefaultPostCard.module.scss";

function renderWithTags(text: string) {
    const parts = text.split(/(#\w+)/g);
    return parts.map((part, index) => {
        if (/^#\w+$/.test(part)) {
            return <Link key={index} href={`/hashtag/${part.slice(1)}`} className={styles.tag}>{part}</Link>;
        }
        return <span key={index}>{part}</span>;
    });
}

export default memo(function DefaultPostCard(props: DefaultPostCardProps) {
    
    const [isOpenActions, setIsOpenActions] = useState(false);
    const actionsRef = useRef<HTMLDivElement>(null);
    useClickOutside(actionsRef, () => {
        setIsOpenActions(false);
    });
    const { shouldRender, animationStyle} = useMotion(isOpenActions, {appear: MotionName.SLIDE_DOWN_IN, appearDistance: 10, disappear: MotionName.SLIDE_UP_OUT, disappearDistance: 10});

    const { id, content = "", visibility = "public", medias = [], shared_post, user, created_at, updated_at, deleted_at } = props;

    return (
        <div className={styles.section} style={props.style}>
            <div className={styles.header}>
                <div className={styles.avatar_container}>
                    <Image src={user?.profile?.profile_photo ? process.env.NEXT_PUBLIC_SERVER_URL + "/" + user?.profile?.profile_photo : "/images/avatar.png"} width={40} height={40} alt="Avatar" />
                </div>
                <div className={styles.info}>
                    <div className={styles.display_name}>{user?.profile?.display_name}</div>
                    <div className={styles.post_info_container}>
                        <p className={styles.date}>{(new Date(created_at?.replace(" ", "T") || "")).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p className={styles.time}>{(new Date(created_at?.replace(" ", "T") || "")).toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                        {visibility === "public" ? (
                            <Icon name={"earth"} size={16} type={"regular"}></Icon>
                        ) : visibility === "private" ? (
                            <Icon name={"lock_closed"} size={16} type={"regular"}></Icon>
                        ) : (
                            <Icon name={"person"} size={16} type={"regular"}></Icon>
                        )}
                    </div>
                </div>
                <div className={styles.post_actions_container} ref={actionsRef}>
                    <Button appearance={"subtle"} onClick={() => setIsOpenActions(prev => !prev)}>
                        <Icon name={"more_horizontal"} size={16}></Icon>
                    </Button>
                    {shouldRender && (
                        <div className={styles.post_actions_list} style={animationStyle}>
                            <div className={styles.post_actions_item} onClick={props.handleOpenEditPost}>
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
            {content && (
                <div className={styles.content}>
                    <p>{renderWithTags(content)}</p>
                </div>
            )}

            {Array.isArray(medias) && medias.length > 0 && (
                <MediaBox medias={medias} onClick={props.handleOpenDetailPost}></MediaBox>
            )}

            <div className={styles.footer}>
                <div className={styles.footer_left}>
                    <Button appearance={"subtle"}>
                        100
                        <Icon name={"heart"} size={20} type={"regular"}></Icon>
                    </Button>
                    <Button appearance={"subtle"} onClick={props.handleOpenDetailPost}>
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
    );
});
