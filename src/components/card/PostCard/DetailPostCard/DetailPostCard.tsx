import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useClickOutside } from "@/hooks";
import { Video, Button, Icon, Textarea, Carousel } from "@/components"

import DetailPostCardProps from "./DetailPostCard.types";
import styles from "./DetailPostCard.module.scss";

export default function DetailPostCard(props: DetailPostCardProps) {

    const { id, content = "", visibility = "public", medias = [], shared_post, user, created_at, updated_at, deleted_at } = props;

    const medias_path = Array.isArray(medias) && medias.length > 0 ? medias.map((media) => {
        return process.env.NEXT_PUBLIC_API_URL + "/media"+ media.path;
    }) : [];

    return (
        <div ref={props.ref} style={props.style} className={`${styles.detail_post} ${props.className} ${Array.isArray(medias) && medias.length > 0 ? styles.detail_post_with_media : ""}`}>
            {Array.isArray(medias) && medias.length > 0 && (
                <div className={styles.gallery_carousel}>
                    {Array.isArray(medias) && medias.length > 1 ? (
                        <Carousel medias={medias_path}></Carousel>
                    ) : medias.length == 1 ? (
                        <Image src={medias_path[0]} alt="" fill style={{objectFit: "contain"}}/>
                    ) : (
                        <></>
                    )}
                </div>
            )}
            <div className={styles.post_detail_info}>
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
                    <div className={styles.post_detail_info_buttons}>
                        <Button appearance={"subtle"}> 
                            <Icon name={"more_horizontal"} size={16}></Icon>
                        </Button>
                        <Button appearance={"subtle"} onClick={props.handleClose}> 
                            <Icon name={"dismiss"} size={16}></Icon>
                        </Button>
                    </div>
                </div>
                <div className={styles.content}>
                    <p>{renderWithTags(content)}</p>
                </div>
                <div className={styles.footer}>
                    <div className={styles.footer_left}>
                        <Button appearance={"subtle"}>
                            100
                            <Icon name={"heart"} size={20} type={"regular"}></Icon>
                        </Button>
                        <Button appearance={"subtle"}>
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
                <div className={styles.comments_container}>

                    <div className={styles.comment}>
                        <div className={styles.avatar_container}>
                            <Image src="/images/avatar.png" width={30} height={30} alt="Avatar" />
                        </div>
                        <div className={styles.comment_content}>
                            <div className={styles.display_name}>Châu Thành Cường</div>
                            <div className={styles.comment_text}>
                                <p>Lorem ipsum dolor sit amet consectetur. Id suscipit pharetra sagittis amet sed elementum nibh consequat. Mattis morbi congue donec mattis tortor porta dignissim.</p>
                            </div>
                            <div className={styles.comment_time}>19/2/2025 11:58 PM</div>
                        </div>
                    </div>

                </div>
                <div className={styles.comment_input}>
                    <div className={styles.text_container}>
                        <Textarea />
                    </div>
                    <div className={styles.buttons}>
                        <div className={styles.button_left}>
                            <Button appearance={"subtle"}>
                                <Icon name={"image"} type={"regular"} size={20} />
                            </Button>
                            <Button appearance={"subtle"}>
                                <Icon name={"camera"} type={"regular"} size={20} />
                            </Button>
                            <Button appearance={"subtle"}>
                                <Icon name={"emoji"} type={"regular"} size={20} />
                            </Button>
                        </div>
                        <div className={styles.button_right}>
                            <Button appearance={"accent"}>
                                Send
                                <Icon name={"send"} type={"regular"} size={20} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function renderWithTags(text: string) {

    if (!text) return <span></span>;

    const parts = text.split(/(#\w+)/g);
    return parts.map((part, index) => {
        if (/^#\w+$/.test(part)) {
            return <Link key={index} href={`/hashtag/${part.slice(1)}`} className={styles.tag}>{part}</Link>;
        }
        return <span key={index}>{part}</span>;
    });
}