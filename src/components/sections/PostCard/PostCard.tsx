"use client";

import Image from "next/image";
import { useState, memo } from "react";

import { Icon, Button, Textarea, Video } from "@/components";

import PostCardProps from "./PostCard.types";
import styles from "./PostCard.module.css";

export default memo(function PostCard({ content = "", time = "2025-04-04 11:40:28", visibility = "public", medias = [], likes_count = 0, comments_count = 0, shares_count = 0, user_id = "", user_display_name = "", user_profile_photo = "/images/avatar.png" }: PostCardProps) {

    const [isOpenGallery, setIsOpenGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const extraMediaCount = medias.length > 5 ? medias.length - 5 : 0;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % medias.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + medias.length) % medias.length);
    };

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

    const date = new Date(time.replace(" ", "T"));

    return (
        <>
            <div className={styles.section}>
                <div className={styles.header}>
                    <div className={styles.avatar_container}>
                        <Image src={user_profile_photo || "/images/avatar.png"} width={40} height={40} alt="Avatar" />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.display_name}>{user_display_name}</div>
                        <div className={styles.post_info_container}>
                            <p className={styles.date}>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p className={styles.time}>{date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                            <Icon name={"earth"} size={16} />
                        </div>
                    </div>
                    <Button appearance={"subtle"}> 
                        <Icon name={"more_horizontal"} size={16}></Icon>
                    </Button>
                </div>
                <div className={styles.content}>
                    <p>{content}</p>
                </div>
                {medias.length > 0 && (
                    <div className={mediaGalleryClassName()} onClick={(e) => {e.preventDefault(); setIsOpenGallery(true); }}>
                        {medias.slice(0, 5).map((media, index) => (
                            <div key={index} className={styles.media_item}>
                                {media.type.startsWith("video/") ? (
                                    <Video src={process.env.NEXT_PUBLIC_API_URL + "/media"+ media.path} controls autoPlay muted loop playsInline/>
                                ) : (
                                    <Image src={process.env.NEXT_PUBLIC_API_URL + "/media" + media.path} alt={`media-${index}`} fill />
                                )}
                                {index === 4 && extraMediaCount > 0 && (
                                    <div className={styles.overlay}>+{extraMediaCount}</div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                <div className={styles.footer}>
                    <div className={styles.footer_left}>
                        <Button appearance={"subtle"}>
                            100
                            <Icon name={"heart"} size={20} type={"regular"}></Icon>
                        </Button>
                        <Button appearance={"subtle"} onClick={() => setIsOpenGallery(true)}>
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

            {isOpenGallery && Array.isArray(medias) && medias.length > 0  && (
                <div className={styles.dialog}>
                    <div className={styles.detail_post}>
                        <div className={styles.gallery_carousel}>
                            <div className={styles.list}>
                                <div className={styles.item}>
                                    {medias[currentIndex].type.startsWith("video/") ? (
                                        <Video className={styles.media} src={process.env.NEXT_PUBLIC_API_URL + "/media" + medias[currentIndex].path} controls autoPlay muted loop playsInline/>
                                    ) : (
                                        <Image src={process.env.NEXT_PUBLIC_API_URL + "/media" + medias[currentIndex].path} alt={`media-${currentIndex}`} fill />
                                    )}
                                </div>
                            </div>
                            {medias.length > 1 && (
                                <>
                                    <Button appearance={"standard"} className={styles.prev} onClick={prevSlide}>
                                        <Icon name={"chevron_left"}></Icon>
                                    </Button>
                                    <Button appearance={"standard"} className={styles.next} onClick={nextSlide}>
                                        <Icon name={"chevron_right"}></Icon>
                                    </Button>
                                </>
                            )}
                            <Button appearance={"standard"} className={styles.close} onClick={() => setIsOpenGallery(false)}>
                                <Icon name={"dismiss"}></Icon>
                            </Button>
                        </div>
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
                                <Button appearance={"subtle"}> 
                                    <Icon name={"more_horizontal"} size={16}></Icon>
                                </Button>
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
                </div>
            )}
        </>
    );
});
