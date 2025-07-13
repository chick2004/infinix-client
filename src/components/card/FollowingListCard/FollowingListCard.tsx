"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { requestInit } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types";
import { Button, Layer, Skeleton } from "@/components";
import { useAuth } from "@/hooks";

import FollowingListCardProps from "./FollowingListCard.types";
import styles from './FollowingListCard.module.scss';

export default function FollowingListCard({ style, className, ref }: FollowingListCardProps) {

    const root = clsx(
        styles.section,
        className
    );

    const { user } = useAuth();
    const usersQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/users/" + user?.id + "/following";
    const queryUsers = async () => {
        const response = await fetch(usersQueryUrl, requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        return response.json();
    }
    const usersQuery = useQuery({
        queryKey: [usersQueryUrl],
        queryFn: queryUsers,
        refetchOnWindowFocus: false,
        retry: true,
        gcTime: 1000 * 60 * 5,
        staleTime: 1000 * 60 * 5,
    });

    if (usersQuery.isLoading) {
        return (
            <Skeleton animation={"pulse"} style={{width: "100%", height: "100px", borderRadius: "8px"}}></Skeleton>
        );
    }

    if (usersQuery.data.data?.length == 0) {
        return (
            <></>
        )
    }

    return (
        <Layer stroke className={root} style={style} ref={ref}>
            <div className={styles.title_bar}>
                <p>Followings</p>
                <Link href="" className={styles.see_all}>See all</Link>
            </div>
            <div className={styles.users}>
                {Array.isArray(usersQuery.data?.data) && usersQuery.data.data?.length > 0 && (
                    usersQuery.data.data.slice(0, 5).map((user: User, index: number) => {
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
                )}
            </div>
        </Layer>
    )
}