"use client";

import Link from "next/link";

import { Icon, Button } from "@/components";

import styles from "./TrendingTagsCard.module.scss";

export default function TrendingTagsCard() {

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
    }

    const tags = [{name: "#2025", post_count: 10}, {name: "#2025", post_count: 10}, {name: "#2025", post_count: 10}];

    return (
        <div className={styles.section}>
            <div className={styles.title_bar}>
                <p>Trending tags</p>
                <Link href="" className={styles.see_all}>See all</Link>
            </div>
            {
                tags.map((tag, index) => {
                    return (
                        
                        <Link href={""} key={index} className={styles.tag_bar}>
                            <div>
                                <p className={styles.tag_name}>{tag.name}</p>
                                <p className={styles.post_count}>{tag.post_count} posts</p>
                            </div>
                            <Button appearance="subtle" onClick={() => handleClick}>
                                <Icon name="more_horizontal" size={16}></Icon>
                            </Button>
                        </Link>
                    );
                })
            }
        </div>
    );
}