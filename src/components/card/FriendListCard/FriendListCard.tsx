"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

import { Button, Layer } from "@/components";

import FriendListCardProps from "./FriendListCard.types";
import styles from './FriendListCard.module.scss';

interface User {
    display_name: string;
    username: string;
    profile_image: string;
}

export default function FriendListCard({ style, className, ref }: FriendListCardProps) {

    const root = clsx(
        styles.section,
        className
    );

    const users: Array<User> = [
        {display_name: "John Doe", username: "@johndoe", profile_image: "/images/avatar.png"},
        {display_name: "John Doe", username: "@johndoe", profile_image: "/images/avatar.png"},
        {display_name: "John Doe", username: "@johndoe", profile_image: "/images/avatar.png"},
    ];

    return (
        <Layer stroke className={root} style={style} ref={ref}>
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
        </Layer>
    )
}