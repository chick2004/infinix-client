"use client";

import { useEffect } from "react";
import { useFetch, useAuth } from "@/hooks";

import ClientLayout from "@/layouts/ClientLayout/ClientLayout";

import { TrendingTagsCard, SuggestionUsersCard, CreatePostCard, PostCard, FriendListCard, GroupListCard, FollowingListCard } from "@/components";


import styles from './page.module.css';

export default function Page() {

    const { user, setUser, loading} = useAuth();

    return (
        <ClientLayout>
            <div className={styles.page}>
                <div className={styles.left}>
                    <TrendingTagsCard></TrendingTagsCard>
                    <SuggestionUsersCard></SuggestionUsersCard>
                </div>
                <div className={styles.center}>
                    <CreatePostCard></CreatePostCard>
                    <PostCard media={["/images/splash1.webp", "/images/splash2.webp", "/images/splash3.webp", "/images/splash4.webp", "/images/splash5.webp", "/images/splash6.webp"]}></PostCard>
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