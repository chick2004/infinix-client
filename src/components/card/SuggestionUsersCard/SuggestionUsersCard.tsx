"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

import { Button, Skeleton } from "@/components";
import { useRequest } from "@/hooks";

import styles from "./SuggestionUsersCard.module.scss";

export default function SuggestionUsersCard() {

    const { data: usersData, loading: usersLoading, error: usersError, status: usersStatus, execute: usersExecute } = useRequest(process.env.NEXT_PUBLIC_API_URL + '/users', "GET");
    useEffect(() => {
        usersExecute();
    }, []);

    useEffect(() => {
        console.log("usersData", usersData);
    }, [usersData]);

    return (
        <div className={styles.section}>
            <div className={styles.title_bar}>
                <p>Suggestion users</p>
                <Link href="" className={styles.see_all}>See all</Link>
            </div>
                {usersLoading ? (
                    <>
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "24px", borderRadius: "4px"}}></Skeleton>
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "24px", borderRadius: "4px"}}></Skeleton>
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "24px", borderRadius: "4px"}}></Skeleton>
                    </>
                ) : (
                    Array.isArray(usersData) ? usersData : []).slice(0, 3).map((user: any) => {
                        return (
                            <Link href={""} key={user.id} className={styles.user}>
                                <div className={styles.user_image}>
                                    <Image src={user.profile.profile_photo || "/images/avatar.png"} alt="" width={40} height={40}></Image>
                                </div>
                                <div className={styles.user_info}>
                                    <p className={styles.display_name}>{user.profile.display_name}</p>
                                    <p className={styles.username}>{user.username}</p>
                                </div>
                                <Button appearance={"standard"}>Follow</Button>
                            </Link>
                        );
                    }
                )}
        </div>
    )
}