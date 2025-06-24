import clsx from "clsx";
import Link from "next/link";
import { Icon, Button, Skeleton, Layer } from "@/components";
import { requestInit } from "@/lib";
import { useQuery } from "@tanstack/react-query";

import TrendingTagsProps from "./TrendingTagsCard.types";
import styles from "./TrendingTagsCard.module.scss";

export default function TrendingTagsCard({ style, className, ref }: TrendingTagsProps) {

    const tagsQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/tags";
    const queryTags = async () => {
        const response = await fetch(tagsQueryUrl, requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch tags");
        }
        return response.json();
    }

    const tagsQuery = useQuery({
        queryKey: [tagsQueryUrl],
        queryFn: queryTags,
        refetchOnWindowFocus: false,
        retry: true,
        staleTime: 1000 * 60 * 5,
    });

    const root = clsx(
        styles.section,
        className
    );

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
    }

    return (
        <Layer stroke className={root} style={style} ref={ref}>
            <div className={styles.title_bar}>
                <p>Trending tags</p>
                <Link href="" className={styles.see_all}>See all</Link>
            </div>
                {tagsQuery.isPending ? (
                    <>
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "24px", borderRadius: "4px"}}></Skeleton>
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "24px", borderRadius: "4px"}}></Skeleton>
                        <Skeleton animation={"pulse"} style={{width: "100%", height: "24px", borderRadius: "4px"}}></Skeleton>
                    </>
                ) : (
                    Array.isArray(tagsQuery.data?.data) ? tagsQuery.data.data : []).slice(0, 5).map((tag: any) => {
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
        </Layer>
    );
}