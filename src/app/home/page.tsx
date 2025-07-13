"use client";

import { useEffect, useRef, useMemo } from "react";
import { requestInit } from "@/lib";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual"
import { useAuth } from "@/hooks";
import ClientLayout from "@/layouts/ClientLayout/ClientLayout";
import { Skeleton, Spinner, TrendingTagsCard, SuggestionUsersCard, CreatePostCard, FriendRequestListCard, PostCard, FriendListCard, GroupListCard, FollowingListCard } from "@/components";
import styles from "./page.module.css";
import { useCallback } from "react";

export default function Page() {

    const { user } = useAuth();

    const postQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/posts";
    const queryPosts = async ({ pageParam = 1 }) => {
        const response = await fetch(postQueryUrl + "?page=" + pageParam, requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }
        return response.json();
    }
    const postQuery = useInfiniteQuery({
        queryKey: [postQueryUrl],
        queryFn: ({ pageParam }) => queryPosts({ pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.meta.current_page + 1;
            return nextPage <= lastPage.meta.last_page ? nextPage : undefined;
        },
        gcTime: 1000 * 60 * 5,
        staleTime: 1000 * 60 * 5,
    });

    const allPosts = useMemo(() => {
        return postQuery.data?.pages.flatMap(page => page.data) ?? [];
    }, [postQuery.data]);


    // const virtualizer = useVirtualizer({
    //     count: allPosts.length + (postQuery.hasNextPage ? 1 : 0),
    //     getScrollElement: () => parentRef.current,
    //     estimateSize: () => 160,
    //     measureElement: (el) => {
    //         if (!el) return 160;
    //         return ((el as HTMLElement).offsetHeight || el.getBoundingClientRect().height || 150) + 10;
    //     },
    //     overscan: 5,
    // });

    // useEffect(() => {
    //     const virtualItems = virtualizer.getVirtualItems();
    //     const [lastItem] = [...virtualItems].reverse();

    //     if (!lastItem) {
    //         return;
    //     }

    //     if (lastItem.index >= allPosts.length - 1 && postQuery.hasNextPage && !postQuery.isFetchingNextPage) {
    //         postQuery.fetchNextPage();
    //     }
    // }, [postQuery, allPosts, virtualizer]);

    // useEffect(() => {
    //     if (!parentRef.current) return;

    //     const resizeObserver = new ResizeObserver(() => {
    //         virtualizer.measure();
    //     });

    //     const virtualItems = parentRef.current.querySelectorAll('[data-index]');
    //     virtualItems.forEach(item => resizeObserver.observe(item));

    //     return () => {
    //         resizeObserver.disconnect();
    //     };
    // }, [virtualizer, allPosts.length]);

    // useEffect(() => {
    //     if (allPosts.length > 0) {
    //         virtualizer.measure();
    //     }
    // }, [allPosts.length, virtualizer]);

    const parentRef = useRef<HTMLDivElement>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (
                target.isIntersecting &&
                postQuery.hasNextPage &&
                !postQuery.isFetchingNextPage
            ) {
                postQuery.fetchNextPage();
            }
        },
        [postQuery]
    );

    useEffect(() => {
        const option = {
            root: parentRef.current,
            rootMargin: "0px",
            threshold: 0.1,
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
            observer.disconnect();
        };
    }, [handleObserver, allPosts.length]);

    const friendRequestsQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/users/" + user?.id + "/friend-requests";
    const queryFriendRequests = async () => {
        const response = await fetch(friendRequestsQueryUrl, requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch friend requests");
        }
        return response.json();
    }
    const friendRequestsQuery = useQuery({
        queryKey: [friendRequestsQueryUrl],
        queryFn: queryFriendRequests,
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
                <div className={styles.center} ref={parentRef}>
                    <CreatePostCard></CreatePostCard>
                    {postQuery.isPending ? (
                        <>
                            <Skeleton animation={"pulse"} style={{width: "100%", height: "128px", borderRadius: "4px"}}></Skeleton>
                            <Skeleton animation={"pulse"} style={{width: "100%", height: "128px", borderRadius: "4px"}}></Skeleton>
                            <Skeleton animation={"pulse"} style={{width: "100%", height: "128px", borderRadius: "4px"}}></Skeleton>
                        </>
                    ) : (
                        // <div style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
                        //     {virtualizer.getVirtualItems().map((virtualItem) => {
                        //         const isLoaderRow = virtualItem.index > allPosts.length - 1;
                        //         const post = allPosts[virtualItem.index];

                        //         return (
                        //             <div key={virtualItem.index} data-index={virtualItem.index} ref={(node) => virtualizer.measureElement(node)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', transform: `translateY(${virtualItem.start}px)`, marginBottom: '10px' }}>
                        //                 {isLoaderRow ? (
                        //                     postQuery.hasNextPage ? (
                        //                         <Skeleton animation={"pulse"} style={{ width: "100%", height: "128px", borderRadius: "4px" }} />
                        //                     ) : null
                        //                 ) : (
                        //                     <PostCard post={post} />
                        //                 )}
                        //             </div>
                        //         );
                        //     })}
                        // </div>
                        <>
                            {allPosts.map((post, index) => (
                                <PostCard key={index} post={post} />
                            ))}
                            {postQuery.hasNextPage && (
                                <Spinner ref={loaderRef} style={{margin: "20px auto"}}></Spinner>
                            )}
                        </>
                    )}
                </div>
                <div className={styles.right}>
                    {Array.isArray(friendRequestsQuery.data?.data) && friendRequestsQuery.data.data.length > 0 && (
                        <FriendRequestListCard friend_requests={friendRequestsQuery.data.data}></FriendRequestListCard>
                    )}
                    <FriendListCard></FriendListCard>
                    <GroupListCard></GroupListCard>
                    <FollowingListCard></FollowingListCard>
                </div>
            </div>
        </ClientLayout>
    );
}