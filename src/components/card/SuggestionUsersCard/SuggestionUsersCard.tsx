"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import type { User } from "@/types";
import { Button, Skeleton, Layer, Spinner } from "@/components";
import { requestInit } from "@/lib";
import { useQuery, useMutation } from "@tanstack/react-query";

import SuggestionUsersCardProps from "./SuggestionUsersCard.types";
import styles from "./SuggestionUsersCard.module.scss";

export default function SuggestionUsersCard({ style, className, ref }: SuggestionUsersCardProps) {

    const root = clsx(
        styles.section,
        className
    );

    const usersQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/users";
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
        staleTime: 1000 * 60 * 5,
    });

    const mutateFollow = async (user_id: number) => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + user_id + "/follow", requestInit("POST"));
        if (!response.ok) {
            throw new Error("Failed to follow user");
        }
        return response.json();
    }
    const followMutation = useMutation({
        mutationFn: mutateFollow,
        onSuccess: () => {
            usersQuery.refetch();
        },
        onError: (error) => {
            console.error("Error following user:", error);
        }
    });

    return (
        <Layer stroke className={root} style={style} ref={ref}>
            <div className={styles.title_bar}>
                <p>Suggestion users</p>
                <Link href="" className={styles.see_all}>See all</Link>
            </div>
                {usersQuery.isPending ? (
                    <>
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "60px", borderRadius: "4px"}}></Skeleton>
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "60px", borderRadius: "4px"}}></Skeleton>
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "60px", borderRadius: "4px"}}></Skeleton>
                    </>
                ) : (
                    Array.isArray(usersQuery.data?.data) ? usersQuery.data.data : []).slice(0, 3).map((user: User) => {
                        return (
                            <Link href={""} key={user.id} className={styles.user}>
                                <div className={styles.user_image}>
                                    <Image src={user.profile.profile_photo || "/images/avatar.png"} alt="" width={40} height={40}></Image>
                                </div>
                                <div className={styles.user_info}>
                                    <p className={styles.display_name}>{user.profile.display_name}</p>
                                    <p className={styles.username}>{user.username}</p>
                                </div>
                                {followMutation.isPending && followMutation.variables == user.id ? (
                                    <Button appearance={"standard"}>
                                        <Spinner></Spinner>
                                    </Button>
                                ) : (
                                    <Button appearance={"standard"} onClick={() => followMutation.mutate(user.id)}>
                                        Follow
                                    </Button>
                                )}
                            </Link>
                        );
                    }
                )}
        </Layer>
    )
}