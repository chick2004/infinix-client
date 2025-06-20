"use client";

import { useFetch, useAuth } from "@/hooks";
import ClientLayout from "@/layouts/ClientLayout/ClientLayout";
import { ProfileCard, ProfileMediaGalleryCard, CreatePostCard, PostCard, Skeleton, FriendListCard, GroupListCard, FollowingListCard } from "@/components";
import styles from './page.module.scss';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {


    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
        router.replace(`/profile/${user.id}`);
        }
    }, [user]);
    
    return null
}