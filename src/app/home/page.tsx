"use client";

import { useEffect } from "react";
import { useAuth, useRequest } from "@/hooks";
import { Skeleton } from "@/components";

import ClientLayout from "@/layouts/ClientLayout/ClientLayout";

import { TrendingTagsCard, SuggestionUsersCard, CreatePostCard, PostCard, FriendListCard, GroupListCard, FollowingListCard } from "@/components";


import styles from './page.module.css';

export default function Page() {

    const { data: postListData, loading: postListLoading, error: postListError, status: postListStatus, execute: postListExecute } = useRequest(process.env.NEXT_PUBLIC_API_URL + '/posts', "GET");

    useEffect(() => {
        postListExecute();
    }, []);

    useEffect(() => {
        if (Array.isArray(postListData) && postListData.length > 0) {
            console.log("postListData", postListData);
        }
    }, [postListData]);

    return (
        <ClientLayout>
            <div className={styles.page}>
                <div className={styles.left}>
                    <TrendingTagsCard></TrendingTagsCard>
                    <SuggestionUsersCard></SuggestionUsersCard>
                </div>
                <div className={styles.center}>
                    <CreatePostCard></CreatePostCard>
                    {postListLoading ? (
                        <>
                            <Skeleton animation={"pulse"} style={{width: "100%", height: "128px", borderRadius: "4px"}}></Skeleton>
                            <Skeleton animation={"pulse"} style={{width: "100%", height: "128px", borderRadius: "4px"}}></Skeleton>
                            <Skeleton animation={"pulse"} style={{width: "100%", height: "128px", borderRadius: "4px"}}></Skeleton>
                        </>
                    ) : (
                        Array.isArray(postListData) && postListData.map((postData: any) => (
                            <PostCard key={postData.id} {...postData}></PostCard>
                        ))
                    )}
                </div>
                <div className={styles.right}>
                    <FriendListCard></FriendListCard>
                    <GroupListCard></GroupListCard>
                    <FollowingListCard></FollowingListCard>
                </div>
            </div>
        </ClientLayout>
    );
}