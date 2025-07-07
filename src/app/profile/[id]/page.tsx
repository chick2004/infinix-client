"use client";

import { use } from "react";
import { useAuth } from "@/hooks";
import type { Post } from "@/types";
import { requestInit } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import ClientLayout from "@/layouts/ClientLayout/ClientLayout";
import { ProfileCard, ProfileMediaGalleryCard, CreatePostCard, PostCard, Skeleton } from "@/components";
import styles from './page.module.scss';

export default function Page({ params }: { params: Promise<{ id: string }> }) {

    const { id } = use(params);
    const { user } = useAuth();

    const userQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/users/" + id;
    const queryUser = async () => {
        const response = await fetch(userQueryUrl, requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        return response.json();
    }
    const userQuery = useQuery({
        queryKey: [userQueryUrl],
        queryFn: queryUser,
        refetchOnWindowFocus: false,
        retry: true,
        staleTime: 1000 * 60 * 5,
    });

    const postsQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/users/" + id + "/posts";
    const queryPosts = async () => {
        const response = await fetch(postsQueryUrl, requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch user posts");
        }
        return response.json();
    }
    const postsQuery = useQuery({
        queryKey: [postsQueryUrl],
        queryFn: queryPosts,
        refetchOnWindowFocus: false,
        retry: true,
        staleTime: 1000 * 60 * 5,
    });


    return (
        <ClientLayout>
            <div className={styles.page}>
                <div className={styles.left}>
                    {userQuery.isPending ? (
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "384px", borderRadius: "8px"}}></Skeleton>
                    ) : (
                        <ProfileCard user={userQuery.data.data} is_owner={id == user.id ? true : false}></ProfileCard>
                    )}
                    <ProfileMediaGalleryCard></ProfileMediaGalleryCard>
                </div>
                <div className={styles.right}>
                    {id == user.id && <CreatePostCard></CreatePostCard>}
                    {postsQuery.isPending ? (
                        <>
                            <Skeleton animation={"pulse"} style={{width: "100%", height: "128px", borderRadius: "4px"}}></Skeleton>
                            <Skeleton animation={"pulse"} style={{width: "100%", height: "128px", borderRadius: "4px"}}></Skeleton>
                            <Skeleton animation={"pulse"} style={{width: "100%", height: "128px", borderRadius: "4px"}}></Skeleton>
                        </>
                    ) : (
                        Array.isArray(postsQuery.data?.data) && postsQuery.data.data.length > 0 && postsQuery.data.data.map((postData: Post) => (
                            <PostCard key={postData.id} post={postData}></PostCard>
                        ))
                    )}
                </div>
            </div>
        </ClientLayout>
    );
}