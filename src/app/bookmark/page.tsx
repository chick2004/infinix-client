"use client";
import { useEffect } from 'react';
import { requestInit } from '@/lib';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks';
import { ClientLayout } from '@/layouts';
import { BookmarkFilterCard, PostCard } from '@/components';
import styles from './page.module.scss';

export default function Page() {

    const{ user } = useAuth();
    const bookmarksQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/users/" + user?.id + "/bookmarks";
    const queryBookmarks = async () => {
        const response = await fetch(bookmarksQueryUrl, requestInit("GET"));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }
    const bookmarksQuery = useQuery({
        queryKey: [bookmarksQueryUrl],
        queryFn: queryBookmarks,
        refetchOnWindowFocus: false,
        retry: true,
        staleTime: 1000 * 60 * 5,
        enabled: !!user,
    });

    useEffect(() => {
        if (bookmarksQuery.data?.data) {
            console.log("Bookmarks fetched successfully:", bookmarksQuery.data.data);
        }
    }, [bookmarksQuery.data?.data]);

    return (
        <ClientLayout>
            <div className={styles.page}>
                <div className={styles.left}>
                    <BookmarkFilterCard></BookmarkFilterCard>
                </div>
                <div className={styles.right}>
                    <div className={styles.posts}>
                        {bookmarksQuery.isPending ? (
                            <div>Loading...</div>
                        ) : (
                            Array.isArray(bookmarksQuery.data?.data) ? (
                                bookmarksQuery.data.data.map((post: any, index: number) => (
                                    <PostCard key={index} post={post}></PostCard>
                                ))
                            ) : (
                                <div>no content</div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}