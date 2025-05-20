import Image from "next/image";
import { useState, useRef } from "react";
import { useClickOutside } from "@/hooks";
import { Video, Button, Icon, Textarea, Carousel } from "@/components"

import DetailPostProps from "./DetailPost.types";
import styles from "./DetailPost.module.scss";

export default function DetailPost(props: DetailPostProps) {

    const { content, time, visibility, medias} = {
        content: "content #2025",
        medias: [
            // { "id": 24, "post_id": 14, "path": "/storage/uploads/1744992934_default_wallpaper.png", "type": "image/jpeg", "created_at": "2025-04-18T16:15:35.000000Z", "updated_at": "2025-04-18T16:15:35.000000Z" },
            // { "id": 24, "post_id": 14, "path": "/storage/uploads/1744992934_default_wallpaper.png", "type": "image/jpeg", "created_at": "2025-04-18T16:15:35.000000Z", "updated_at": "2025-04-18T16:15:35.000000Z" },
            // { "id": 24, "post_id": 14, "path": "/storage/uploads/1744992934_default_wallpaper.png", "type": "image/jpeg", "created_at": "2025-04-18T16:15:35.000000Z", "updated_at": "2025-04-18T16:15:35.000000Z" },
            // { "id": 24, "post_id": 14, "path": "/storage/uploads/1744992934_default_wallpaper.png", "type": "image/jpeg", "created_at": "2025-04-18T16:15:35.000000Z", "updated_at": "2025-04-18T16:15:35.000000Z" },
            // { "id": 24, "post_id": 14, "path": "/storage/uploads/1744992934_default_wallpaper.png", "type": "image/jpeg", "created_at": "2025-04-18T16:15:35.000000Z", "updated_at": "2025-04-18T16:15:35.000000Z" },
            // { "id": 24, "post_id": 14, "path": "/storage/uploads/1744992934_default_wallpaper.png", "type": "image/jpeg", "created_at": "2025-04-18T16:15:35.000000Z", "updated_at": "2025-04-18T16:15:35.000000Z" }
        ],
        time: "2025-04-06 10:24:37",
        visibility: "public"
    };

    const medias_path = Array.isArray(medias) && medias.length > 0 ? medias.map((media) => {
        return process.env.NEXT_PUBLIC_API_URL + "/media"+ media.path;
    }) : [];

    
    
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => {
        // setIsOpenDetail(false);
    });

    return (
        <div ref={ref} className={`${styles.detail_post} ${Array.isArray(medias) && medias.length > 0 ? styles.detail_post_with_media : ""}`} style={props.style}>
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
                        <Image src="/images/avatar.png" width={40} height={40} alt="Avatar" />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.display_name}>Châu Thành Cường</div>
                        <div className={styles.post_info_container}>
                            <p className={styles.date}>19/2/2025</p>
                            <p className={styles.time}>11:58 PM</p>
                            <Icon name={"earth"} size={16} />
                        </div>
                    </div>
                    <div className={styles.post_detail_info_buttons}>
                        <Button appearance={"subtle"}> 
                            <Icon name={"more_horizontal"} size={16}></Icon>
                        </Button>
                        <Button appearance={"subtle"}> 
                            <Icon name={"dismiss"} size={16}></Icon>
                        </Button>
                    </div>
                </div>
                <div className={styles.content}>
                    <p>Lorem ipsum dolor sit amet consectetur. Id suscipit pharetra sagittis amet sed elementum nibh consequat. Mattis morbi congue donec mattis tortor porta dignissim.</p>
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