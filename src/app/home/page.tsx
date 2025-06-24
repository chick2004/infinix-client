"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks";
import { requestInit } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import ClientLayout from "@/layouts/ClientLayout/ClientLayout";

import { Skeleton, TrendingTagsCard, SuggestionUsersCard, CreatePostCard, PostCard, FriendListCard, GroupListCard, FollowingListCard } from "@/components";


import styles from './page.module.css';

export default function Page() {

    const postQueryUrl = process.env.NEXT_PUBLIC_API_URL + '/posts';
    const queryPosts = async () => {
        const response = await fetch(postQueryUrl, requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }
        return response.json();
    }
    const postQuery = useQuery({
        queryKey: [postQueryUrl],
        queryFn: queryPosts,
        refetchOnWindowFocus: false,
        retry: true,
        staleTime: 1000 * 60 * 5,
    });

    return (
        <ClientLayout>
            <div className={styles.page}>
                <div className={styles.left}>
                    <TrendingTagsCard></TrendingTagsCard>
                    <SuggestionUsersCard></SuggestionUsersCard>
                </div>
                <div className={styles.center}>
                    <CreatePostCard></CreatePostCard>
                    {postQuery.isPending ? (
                        <>
                            <Skeleton animation={"pulse"} style={{width: "100%", height: "128px", borderRadius: "4px"}}></Skeleton>
                            <Skeleton animation={"pulse"} style={{width: "100%", height: "128px", borderRadius: "4px"}}></Skeleton>
                            <Skeleton animation={"pulse"} style={{width: "100%", height: "128px", borderRadius: "4px"}}></Skeleton>
                        </>
                    ) : (
                        Array.isArray(postQuery.data?.data) && postQuery.data.data.length > 0 && postQuery.data.data.map((postData: any) => (
                            <PostCard key={postData.id} post={postData}></PostCard>
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