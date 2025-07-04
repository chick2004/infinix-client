"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import type { User, Conversation } from "@/types";
import { requestInit } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks";
import { Button, Layer, Skeleton } from "@/components";
import GroupListCardProps from "./GroupListCard.types";
import styles from './GroupListCard.module.scss';

export default function GroupListCard({ style, className, ref }: GroupListCardProps) {

    const root = clsx(
        styles.section,
        className
    );

    const { user } = useAuth();
    const groupsQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/users/" + user.id + "/group-conversations"; // Replace "1" with the actual user ID
    const queryGroups = async () => {
        const response = await fetch(groupsQueryUrl, requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch groups");
        }
        return response.json();
    }
    const groupsQuery = useQuery({
        queryKey: [groupsQueryUrl],
        queryFn: queryGroups,
        gcTime: 1000 * 60 * 5, // 5 minutes
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    if (groupsQuery.isLoading) {
        return (
            <Skeleton animation={"pulse"} style={{width: "100%", height: "100px", borderRadius: "8px"}}></Skeleton>
        );
    }


    return (
        <Layer className={root} style={style} ref={ref}>
            <div className={styles.title_bar}>
                <p>Groups</p>
                <Link href="" className={styles.see_all}>See all</Link>
            </div>
            <div className={styles.groups}>
                {Array.isArray(groupsQuery.data?.data) && groupsQuery.data.data.length > 0 && (
                    groupsQuery.data.data.slice(0, 5).map((conversation: Conversation, index: number) => {
                        return (
                            <Link href={""} key={index} className={styles.group}>
                                <div className={styles.group_image}>
                                    <Image src={conversation.image || "/images/avatar.png"} alt="" width={40} height={40}></Image>
                                </div>
                                <div className={styles.group_info}>
                                    <p className={styles.group_name}>{conversation.name}</p>
                                    <p className={styles.member_count}>{10} members</p>
                                </div>
                                <Button appearance={"standard"}>Chat</Button>
                            </Link>
                        );
                    })
                )}
            </div>
        </Layer>
    )
}