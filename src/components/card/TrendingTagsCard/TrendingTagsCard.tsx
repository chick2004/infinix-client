"use client";

import Link from "next/link";

import { useEffect, Suspense } from "react";
import { Icon, Button, Skeleton } from "@/components";
import { useRequest } from "@/hooks";

import styles from "./TrendingTagsCard.module.scss";

export default function TrendingTagsCard() {

    const { data: tagsData, loading: tagsLoading, error: tagsError, status: tagsStatus, execute: tagsExecute } = useRequest(process.env.NEXT_PUBLIC_API_URL + '/tags', "GET");
    useEffect(() => {
        tagsExecute();
    }, []);

    useEffect(() => {
        console.log("tagsData", tagsData);
    }, [tagsData]);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
    }

    return (
        <div className={styles.section}>
            <div className={styles.title_bar}>
                <p>Trending tags</p>
                <Link href="" className={styles.see_all}>See all</Link>
            </div>
                {tagsLoading ? (
                    <>
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "24px", borderRadius: "4px"}}></Skeleton>
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "24px", borderRadius: "4px"}}></Skeleton>
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "24px", borderRadius: "4px"}}></Skeleton>
                    </>
                ) : (
                    Array.isArray(tagsData) ? tagsData : []).slice(0, 5).map((tag: any) => {
                        return (
                            <Link href={""} key={tag.id} className={styles.tag_bar}>
                                <div>
                                    <p className={styles.tag_name}>{tag.name}</p>
                                    <p className={styles.post_count}>{tag.posts_count} posts</p>
                                </div>
                                <Button appearance="subtle" onClick={() => handleClick}>
                                    <Icon name="more_horizontal" size={16}></Icon>
                                </Button>
                            </Link>
                        );
                    }
                )}
        </div>
    );
}