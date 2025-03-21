"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Button, Icon } from "@/components";
import styles from './FriendListCard.module.css';

export function FriendListCard() {

    const users = [
        {display_name: "John Doe", username: "@johndoe", profile_image: "/images/avatar.png"},
        {display_name: "John Doe", username: "@johndoe", profile_image: "/images/avatar.png"},
        {display_name: "John Doe", username: "@johndoe", profile_image: "/images/avatar.png"},
    ];

    return (
        <div className={styles.section}>
            <div className={styles.title_bar}>
                <p>Friends</p>
                <Link href="" className={styles.see_all}>See all</Link>
            </div>
            <div className={styles.users}>
                {
                    users.map((user, index) => {
                        return (
                            <Link href={""} key={index} className={styles.user}>
                                <div className={styles.user_image}>
                                    <Image src={user.profile_image} alt="" width={40} height={40}></Image>
                                </div>
                                <div className={styles.user_info}>
                                    <p className={styles.display_name}>{user.display_name}</p>
                                    <p className={styles.username}>{user.username}</p>
                                </div>
                                <Button appearance={"standard"}>Chat</Button>
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    )
}