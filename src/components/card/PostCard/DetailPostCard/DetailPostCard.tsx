import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFetch } from "@/hooks";
import { Video, Button, Icon, Carousel, Skeleton, Surface, Card, Layer, Text } from "@/components"

import DetailPostCardProps from "./DetailPostCard.types";
import styles from "./DetailPostCard.module.scss";
import CommentCard from "../CommentCard/CommentCard";
import CreateCommentCard from "../CreateCommentCard/CreateCommentCard";

export default function DetailPostCard({ style, className, ref, post, handleClose }: DetailPostCardProps) {

    const root = clsx(
        styles.detail_post_card,
        className,
        {
            [styles.with_media]: Array.isArray(post.medias) && post.medias.length > 0
        }
    );

    const [edittingComment, setEditingComment] = useState<any>(null);
    const handleStartEditComment = (comment: any) => {
        setEditingComment(comment);
    }
    const handleCloseEditComment = () => {
        setEditingComment(null);
    }

    const { data: commentListData, loading: commentListLoading, error: commentListError, status: commentListStatus } = useFetch(process.env.NEXT_PUBLIC_API_URL + '/posts/' + post.id + '/comments');
    return (
        <Surface className={root} style={style} ref={ref} stroke shadow>
            {Array.isArray(post.medias) && post.medias.length > 0 && (
                <div className={styles.gallery_container}>
                    {Array.isArray(post.medias) && post.medias.length > 1 ? (
                        <Carousel medias={post.medias}></Carousel>
                    ) : post.medias[0].type.startsWith("image/") ? (
                        <Image src={process.env.NEXT_PUBLIC_API_URL + "/media" + post.medias[0].path} alt={`media`} fill style={{objectFit: "contain"}}/>
                    ) : post.medias[0].type.startsWith("video/") ? (
                        <Video src={process.env.NEXT_PUBLIC_API_URL + "/media"+ post.medias[0].path} controls autoPlay muted loop style={{objectFit: "contain", height: "100%", width: "100%"}}/>
                    ) : (
                        <></>
                    )}
                </div>
            )}
            <div className={styles.content_container}>
                <Layer className={styles.content_header}>
                    <div className={styles.user_info}>
                        <Image className={styles.avatar} src={post.user?.profile?.profile_photo ? process.env.NEXT_PUBLIC_SERVER_URL + "/" + post.user?.profile?.profile_photo : "/images/avatar.png"} width={40} height={40} alt="Avatar" />
                        <div className={styles.display_name_and_time}>
                            <Text type="body_strong" className={styles.user_display_name}>{post.user?.profile?.display_name}</Text>
                            <div className={styles.post_time_container}>
                                <Text type="caption" color="secondary" className={styles.date}>{(new Date(post.created_at?.replace(" ", "T") || "")).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                <Text type="caption" color="secondary" className={styles.time}>{(new Date(post.created_at?.replace(" ", "T") || "")).toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' })}</Text>
                                {post.visibility === "public" ? (
                                    <Icon name={"earth"} size={16} type={"regular"}></Icon>
                                ) : post.visibility === "private" ? (
                                    <Icon name={"lock_closed"} size={16} type={"regular"}></Icon>
                                ) : (
                                    <Icon name={"person"} size={16} type={"regular"}></Icon>
                                )}
                            </div>
                        </div>
                        <div className={styles.action_buttons}>
                            <Button appearance={"subtle"}> 
                                <Icon name={"more_horizontal"} size={16}></Icon>
                            </Button>
                            <Button appearance={"subtle"} onClick={handleClose}> 
                                <Icon name={"dismiss"} size={16}></Icon>
                            </Button>
                        </div>
                    </div>
                    <div className={styles.post_content}>
                        <Text>{renderWithTags(post.content)}</Text>
                    </div>
                    <div className={styles.post_action_buttons}>
                        <div className={styles.reaction_buttons}>
                            <Button appearance={"subtle"}>
                                <Icon name={"heart"} size={20} type={"regular"}></Icon>
                            </Button>
                            <Button appearance={"subtle"}>
                                <Icon name={"chat_empty"} size={20} type={"regular"}></Icon>
                            </Button>
                            <Button appearance={"subtle"}>
                                <Icon name={"share"} size={20} type={"regular"}></Icon>
                            </Button>
                        </div>
                        <Button appearance={"subtle"}>
                            <Icon name={"bookmark"} size={20} type={"regular"}></Icon>
                        </Button>
                    </div>
                </Layer>
                <div className={styles.comment_list}>
                    {commentListLoading && (
                        <>
                            <Skeleton animation={"pulse"} style={{ width: "100%", height: "60px", borderRadius: "4px" }}></Skeleton>
                            <Skeleton animation={"pulse"} style={{ width: "100%", height: "60px", borderRadius: "4px" }}></Skeleton>
                        </>
                    )}
                    {Array.isArray(commentListData) && commentListData.length > 0 && (
                        commentListData.map((comment: any) => (
                            <CommentCard comment={comment} key={comment.id} onStartEdit={handleStartEditComment}></CommentCard>
                        ))
                    )}
                </div>
                <Layer className={styles.create_comment_layer}>
                    <CreateCommentCard post_id={post.id} editting_comment={edittingComment} onEndEdit={handleCloseEditComment}></CreateCommentCard>
                </Layer>
            </div>
        </Surface>
    );
}

function renderWithTags(text: string | undefined) {
    if (!text) return <span></span>;
    const parts = text.split(/(#\w+)/g);
    return parts.map((part, index) => {
        if (/^#\w+$/.test(part)) {
            return <Link key={index} href={`/hashtag/${part.slice(1)}`} className={styles.tag}>{part}</Link>;
        }
        return <span key={index}>{part}</span>;
    });
}