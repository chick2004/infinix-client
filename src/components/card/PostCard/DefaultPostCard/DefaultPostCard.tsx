"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, memo } from "react";
import { requestInit } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import { Icon, Button, MediaBox, Layer, Flyout, Spinner} from "@/components";
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

export default memo(function DefaultPostCard({ style, className, ref, post, handleOpenDeletePost, handleOpenDetailPost, handleOpenEditPost }: DefaultPostCardProps) {
    
    const mutateBookmarkPost = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + post.user.id + "/bookmarks", requestInit("POST", {post_id: post.id}));
        if (!response.ok) {
            throw new Error("Failed to bookmark post");
        }
        return response.json();
    };
    const bookmarkPostMutation = useMutation({
        mutationFn: mutateBookmarkPost,
        onError: (error) => {
            console.error("Error bookmarking post:", error);
        },
        onSuccess: (data) => {
            if (data.status === 200) {
                post.is_bookmarked = false;
            }
            if (data.status === 201) {
                post.is_bookmarked = true;
            }
        }
    });

    const mutateLikePost = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/posts/" + post.id + "/like", requestInit("POST"));
        if (!response.ok) {
            throw new Error("Failed to like post");
        }
        return response.json();
    };

    const likePostMutation = useMutation({
        mutationFn: mutateLikePost,
        onError: (error) => {
            console.error("Error liking post:", error);
        },
        onSuccess: (data) => {
            if (data.status === 200) {
                post.is_liked = false;
                post.like_count -= 1;
            }
            if (data.status === 201) {
                post.is_liked = true;
                post.like_count += 1;
            }
        }
    });

    const handleBookmarkPost = () => {
        bookmarkPostMutation.mutate();
    }

    const handleLikePost = () => {
        likePostMutation.mutate();
    }

    const [isOpenActions, setIsOpenActions] = useState(false);
    const actionsRef = useRef<HTMLDivElement>(null);
    
    useClickOutside(actionsRef, () => {
        setIsOpenActions(false);
    });
    const { shouldRender, animationStyle} = useMotion(isOpenActions, {appear: MotionName.SLIDE_DOWN_IN, appearDistance: 10, disappear: MotionName.SLIDE_UP_OUT, disappearDistance: 10});
    
    const root = clsx(
        styles.root,
        className
    );

    return (
        <Layer stroke className={root} style={style} ref={ref}>
            <div className={styles.header}>
                <Link href={"profile/" + post.user.id}  className={styles.avatar_container}>
                    <Image src={post.user.profile.profile_photo || "/images/avatar.png"} width={40} height={40} alt="Avatar" />
                </Link>
                <div className={styles.info}>
                    <div className={styles.display_name}>{post.user.profile.display_name}</div>
                    <div className={styles.post_info_container}>
                        <p className={styles.date}>{(new Date(post.created_at.replace(" ", "T") || "")).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p className={styles.time}>{(new Date(post.created_at.replace(" ", "T") || "")).toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                        {post.visibility === "public" ? (
                            <Icon name={"earth"} size={16} type={"regular"}></Icon>
                        ) : post.visibility === "private" ? (
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
                        <Flyout className={styles.post_actions_list} style={animationStyle}>
                            <div className={styles.post_actions_item} onClick={handleOpenEditPost}>
                                <Icon name={"edit"} size={16}></Icon>
                                Edit this post
                            </div>
                            <div className={styles.post_actions_item}> 
                                <Icon name={"delete"} size={16}></Icon>
                                Delete this post
                            </div>
                        </Flyout>
                    )}
                </div>
            </div>
            {post.content && (
                <div className={styles.content}>
                    <p>{renderWithTags(post.content)}</p>
                </div>
            )}

            {Array.isArray(post.medias) && post.medias.length > 0 && (
                <MediaBox medias={post.medias} onClick={handleOpenDetailPost}></MediaBox>
            )}

            <div className={styles.footer}>
                <div className={styles.footer_left}>
                    {likePostMutation.isPending ? (
                        <Button appearance={"subtle"}>
                            {""}
                            <Spinner></Spinner>
                        </Button>
                    ) : post.is_liked ? (
                        <Button appearance={"subtle"} onClick={handleLikePost}>
                            {post.like_count > 0 ? post.like_count + "" : ""}
                            <Icon name={"heart"} size={20} type={"filled"} style={{color: "red"}}></Icon>
                        </Button>
                    ) : (
                        <Button appearance={"subtle"} onClick={handleLikePost}>
                            {post.like_count > 0 ? post.like_count + "" : ""}
                            <Icon name={"heart"} size={20} type={"regular"}></Icon>
                        </Button>
                    )}
                    <Button appearance={"subtle"} onClick={handleOpenDetailPost}>
                        {post.comment_count > 0 ? post.comment_count + "" : ""}
                        <Icon name={"chat_empty"} size={20} type={"regular"}></Icon>
                    </Button>
                    <Button appearance={"subtle"}>
                        {post.share_count > 0 ? post.share_count + "" : ""}
                        <Icon name={"share"} size={20} type={"regular"}></Icon>
                    </Button>
                </div>
                <div className={styles.footer_right}>
                    {bookmarkPostMutation.isPending ? (
                        <Button appearance={"subtle"}> 
                            <Spinner></Spinner>
                        </Button>
                    ) : (
                        <Button appearance={"subtle"} onClick={handleBookmarkPost}> 
                            {post.is_bookmarked ? (
                                <Icon name={"bookmark"} size={20} type={"filled"} style={{color: "var(--accent-default)"}}></Icon>
                            ) : (
                                <Icon name={"bookmark"} size={20} type={"regular"}></Icon>
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </Layer>
    );
});
