"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { Button, Icon, Flyout } from "@/components";
import NotificationCardProps from "./NotificationsCard.types";
import styles from "./NotificationsCard.module.scss";

interface Notification {
    image: string;
    name: string;
    content: string;
    time: string;
}

export default function NotificationsCard({ style, className, ref }: NotificationCardProps) {

    const root = clsx(
        styles.section,
        className
    );

    const notifications: Array<Notification> = [
        {image: "/images/avatar.png", name: "John Doe", content: "started following you", time: "2 hours ago"},
        {image: "/images/avatar.png", name: "Jane Doe", content: "liked your post", time: "3 hours ago"},
        {image: "/images/avatar.png", name: "John Doe", content: "started following you", time: "2 hours ago"},
        {image: "/images/avatar.png", name: "Jane Doe", content: "liked your post", time: "3 hours ago"},
    ];

    return (
        <Flyout stroke shadow className={root} style={style} ref={ref}>
            <div className={styles.title_bar}>
                <p>Notifications</p>
                <Link href="" className={styles.see_all}>See all</Link>
            </div>
            <div className={styles.notifications}>
                {
                    notifications.map((notification, index) => {
                        return (
                            <Link href={""} key={index} className={styles.notification}>
                                <div className={styles.image}>
                                    <Image src={notification.image} alt="" width={40} height={40}></Image>
                                </div>
                                <div className={styles.info_container}>
                                    <p className={styles.content}>
                                        <span className={styles.name}>{notification.name}</span> {notification.content}
                                    </p>
                                    <p className={styles.time}>{notification.time}</p>
                                </div>
                                <Button appearance={"subtle"}>
                                    <Icon name={"more_horizontal"} size={20}></Icon>
                                </Button>
                            </Link>
                        );
                    })
                }
            </div>
        </Flyout>
    )
}