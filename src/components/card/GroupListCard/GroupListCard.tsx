"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

import { Button, Layer } from "@/components";
import GroupListCardProps from "./GroupListCard.types";
import styles from './GroupListCard.module.scss';

interface Group {
    group_name: string;
    member_count: number;
    group_image: string;
}

export default function GroupListCard({ style, className, ref }: GroupListCardProps) {

    const root = clsx(
        styles.section,
        className
    );

    const groups: Array<Group> = [
        {group_name: "John Doe", member_count: 10, group_image: "/images/avatar.png"},
        {group_name: "John Doe", member_count: 10, group_image: "/images/avatar.png"},
        {group_name: "John Doe", member_count: 10, group_image: "/images/avatar.png"},
    ];

    return (
        <Layer className={root} style={style} ref={ref}>
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
        </Layer>
    )
}