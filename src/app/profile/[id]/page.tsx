"use client";

import { use } from "react";
import { useFetch, useAuth } from "@/hooks";
import ClientLayout from "@/layouts/ClientLayout/ClientLayout";
import { ProfileCard, ProfileMediaGalleryCard, CreatePostCard, PostCard, Skeleton, FriendListCard, GroupListCard, FollowingListCard } from "@/components";
import styles from './page.module.scss';

export default function Page({ params }: { params: Promise<{ id: string }> }) {

    const { id } = use(params);
    const { user } = useAuth();
    const { data: userData, loading: userLoading, error: userError, status: userStatus } = useFetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + id);
    const { data: postListData, loading: postListLoading, error: postListError, status: postListStatus } = useFetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + id + "/posts");



    return (
        <ClientLayout>
            <div className={styles.page}>
                <div className={styles.left}>
                    {userLoading ? (
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "384px", borderRadius: "8px"}}></Skeleton>
                    ) : (
                        <ProfileCard user={userData} is_owner={id == user.id ? true : false}></ProfileCard>
                    )}
                    <ProfileMediaGalleryCard></ProfileMediaGalleryCard>
                </div>
                <div className={styles.right}>
                    {id == user.id && <CreatePostCard></CreatePostCard>}
                    {postListLoading ? (
                        <>
                            <Skeleton animation={"pulse"} style={{width: "100%", height: "128px", borderRadius: "4px"}}></Skeleton>
                            <Skeleton animation={"pulse"} style={{width: "100%", height: "128px", borderRadius: "4px"}}></Skeleton>
                            <Skeleton animation={"pulse"} style={{width: "100%", height: "128px", borderRadius: "4px"}}></Skeleton>
                        </>
                    ) : (
                        Array.isArray(postListData) && postListData.map((postData: any) => (
                            <PostCard key={postData.id} post={postData}></PostCard>
                        ))
                    )}
                </div>
            </div>
        </ClientLayout>
    );
}