"use client";

import { useEffect } from "react";
import { useAuth, useRequest } from "@/hooks";

import ClientLayout from "@/layouts/ClientLayout/ClientLayout";

import { TrendingTagsCard, SuggestionUsersCard, CreatePostCard, PostCard, FriendListCard, GroupListCard, FollowingListCard } from "@/components";


import styles from './page.module.css';

export default function Page() {

    const { user, setUser} = useAuth();
    const { data: postsRequestData, loading: postsRequestLoading, execute: postRequestExecute } = useRequest(process.env.NEXT_PUBLIC_API_URL + "/posts", "GET");
    
    useEffect(() => {
        postRequestExecute();
    }, []);

    useEffect(() => {
        if (postsRequestData) {
            console.log("postsRequestData:", postsRequestData);
        }
    }, [postsRequestLoading]);

    return (
        <ClientLayout>
            <div className={styles.page}>
                <div className={styles.left}>
                    <TrendingTagsCard></TrendingTagsCard>
                    <SuggestionUsersCard></SuggestionUsersCard>
                </div>
                <div className={styles.center}>
                    <CreatePostCard></CreatePostCard>
                    {Array.isArray(postsRequestData) && postsRequestData.map((post: any, index: number) => (
                        <PostCard key={post.id} id={post.id} content={post.content} medias={post.medias} time={post.created_at} visibility={post.visibility} user_id={post.user.id} user_display_name={post.user.display_name} user_profile_photo={post.user.profile_photo}></PostCard>
                    ))}
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