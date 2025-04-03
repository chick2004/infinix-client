"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button, Icon } from "@/components";
import styles from "./NotificationsCard.module.css";

interface Notification {
    image: string;
    name: string;
    content: string;
    time: string;
}

export default function NotificationsCard() {

    const notifications: Array<Notification> = [
        {image: "/images/avatar.png", name: "John Doe", content: "started following you", time: "2 hours ago"},
        {image: "/images/avatar.png", name: "Jane Doe", content: "liked your post", time: "3 hours ago"},
        {image: "/images/avatar.png", name: "John Doe", content: "started following you", time: "2 hours ago"},
        {image: "/images/avatar.png", name: "Jane Doe", content: "liked your post", time: "3 hours ago"},
    ];

    return (
        <div className={styles.section}>
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
        </div>
    )
}