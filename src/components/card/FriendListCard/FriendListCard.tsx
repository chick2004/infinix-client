"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import type { User } from "@/types";
import { Button, Layer, Skeleton, Icon } from "@/components";
import { requestInit } from "@/lib";
import { useAuth } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import FriendListCardProps from "./FriendListCard.types";
import styles from './FriendListCard.module.scss';

export default function FriendListCard({ style, className, ref }: FriendListCardProps) {

    const root = clsx(
        styles.section,
        className
    );

    const { user } = useAuth();
    const friendsQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/users/" + user?.id + "/friends";
    const queryFriends = async () => {
        const response = await fetch(friendsQueryUrl, requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch friends");
        }
        return response.json();
    }
    const friendsQuery = useQuery({
        queryKey: [friendsQueryUrl],
        queryFn: queryFriends,
        gcTime: 1000 * 60 * 5,
        staleTime: 1000 * 60 * 5,
    });

    if (friendsQuery.isLoading) {
        return (
            <Skeleton animation={"pulse"} style={{width: "100%", height: "100px", borderRadius: "8px"}}></Skeleton>
        );
    }

    return (
        <Layer stroke className={root} style={style} ref={ref}>
            <div className={styles.title_bar}>
                <p>Friends</p>
                {Array.isArray(friendsQuery.data?.data) && friendsQuery.data.data.length > 5 && (
                    <Link href="" className={styles.see_all}>See all</Link>
                )}
            </div>
            <div className={styles.users}>
                {Array.isArray(friendsQuery.data?.data) && friendsQuery.data.data.length > 0 ? (
                    friendsQuery.data?.data.slice(0, 5).map((user: User, index: number) => {
                        return (
                            <Link href={""} key={index} className={styles.user}>
                                <div className={styles.user_image}>
                                    <Image src={user.profile.profile_photo || "/images/avatar.png"} alt="" width={40} height={40}></Image>
                                </div>
                                <div className={styles.user_info}>
                                    <p className={styles.display_name}>{user.profile.display_name}</p>
                                    <p className={styles.username}>{user.username}</p>
                                </div>
                                <Button appearance={"standard"}>Chat</Button>
                            </Link>
                        );
                    })
                ) : (
                    <div className={styles.no_friends}>
                        <p>You have no friends yet.</p>
                        <Button appearance="accent">
                            <Icon name={"person_add"} size={16}></Icon>
                            Find
                        </Button>
                    </div>
                )}
            </div>
        </Layer>
    )
}