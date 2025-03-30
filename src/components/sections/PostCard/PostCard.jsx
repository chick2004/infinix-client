"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import clsx from "clsx";

import { Icon, Button, Textarea } from "@/components";
import styles from "./PostCard.module.css";

export function PostCard({ media = [] }) {
    
    const [imageCount, setImageCount] = useState(media.length);
    const [isOpenGallery, setIsOpenGallery] = useState(false);
    const extraMediaCount = imageCount > 5 ? imageCount - 5 : 0;

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % imageCount);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + imageCount) % imageCount);
    };

    useEffect(() => {
        setImageCount(media.length);
    }, [media]);

    const mediaGalleryClassName = () => {
        let subClassName = "";
        switch (imageCount) {
            case 1:
                subClassName = styles.one_image;
                break;
            case 2:
                subClassName = styles.two_images;
                break;
            case 3:
                subClassName = styles.three_images;
                break;
            case 4:
                subClassName = styles.four_images;
                break;
            case 5:
                subClassName = styles.five_images;
                break;
            default:
                subClassName = styles.more_images;
                break;
        }
        return clsx(styles.media_gallery, subClassName);
    };

    return (
        <>
            <div className={styles.section}>
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
                {media.length > 0 && (
                    <div className={mediaGalleryClassName()} onClick={() => setIsOpenGallery(true)}>
                        {media.slice(0, 5).map((src, index) => (
                            <div key={index} className={styles.media_item}>
                                <Image src={src} alt={`media-${index}`} fill />
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

            {isOpenGallery && (
                <div className={styles.dialog}>
                    <div className={styles.detail_post}>
                        <div className={styles.gallery_carousel}>
                            <div className={styles.list}>
                                <div className={styles.item}>
                                    <Image src={media[currentIndex]} alt={`media-${currentIndex}`} fill />
                                </div>
                            </div>
                            <Button appearance={"standard"} className={styles.prev} onClick={prevSlide}>
                                <Icon name={"chevron_left"}></Icon>
                            </Button>
                            <Button appearance={"standard"} className={styles.next} onClick={nextSlide}>
                                <Icon name={"chevron_right"}></Icon>
                            </Button>
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
}
