"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Button, Icon } from "@/components";
import styles from './GroupListCard.module.css';

interface Group {
    group_name: string;
    member_count: number;
    group_image: string;
}

export default function GroupListCard() {

    const groups: Array<Group> = [
        {group_name: "John Doe", member_count: 10, group_image: "/images/avatar.png"},
        {group_name: "John Doe", member_count: 10, group_image: "/images/avatar.png"},
        {group_name: "John Doe", member_count: 10, group_image: "/images/avatar.png"},
    ];

    return (
        <div className={styles.section}>
            <div className={styles.title_bar}>
                <p>Groups</p>
                <Link href="" className={styles.see_all}>See all</Link>
            </div>
            <div className={styles.groups}>
                {
                    groups.map((group, index) => {
                        return (
                            <Link href={""} key={index} className={styles.group}>
                                <div className={styles.group_image}>
                                    <Image src={group.group_image} alt="" width={40} height={40}></Image>
                                </div>
                                <div className={styles.group_info}>
                                    <p className={styles.group_name}>{group.group_name}</p>
                                    <p className={styles.member_count}>{group.member_count} members</p>
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