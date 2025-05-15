"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { PostCard, DropdownSearch } from "@/components";

export default function Home() {
    
    return (
        <div className={styles.page}>
            <div style={{ width: "600px" }}>

            <PostCard id="1" content="aaa" time="2025-04-06 10:24:37" visibility="private" user_display_name="Châu Thành Cường" user_id="1" user_profile_photo="" medias={[{ "id": 24, "post_id": 14, "path": "/storage/uploads/1744992934_default_wallpaper.png", "type": "image/jpeg", "created_at": "2025-04-18T16:15:35.000000Z", "updated_at": "2025-04-18T16:15:35.000000Z" }, { "id": 24, "post_id": 14, "path": "/storage/uploads/1744992934_default_wallpaper.png", "type": "image/jpeg", "created_at": "2025-04-18T16:15:35.000000Z", "updated_at": "2025-04-18T16:15:35.000000Z" }, { "id": 24, "post_id": 14, "path": "/storage/uploads/1744992934_default_wallpaper.png", "type": "image/jpeg", "created_at": "2025-04-18T16:15:35.000000Z", "updated_at": "2025-04-18T16:15:35.000000Z" }, { "id": 24, "post_id": 14, "path": "/storage/uploads/1744992934_default_wallpaper.png", "type": "image/jpeg", "created_at": "2025-04-18T16:15:35.000000Z", "updated_at": "2025-04-18T16:15:35.000000Z" }, { "id": 24, "post_id": 14, "path": "/storage/uploads/1744992934_default_wallpaper.png", "type": "image/jpeg", "created_at": "2025-04-18T16:15:35.000000Z", "updated_at": "2025-04-18T16:15:35.000000Z" }, { "id": 24, "post_id": 14, "path": "/storage/uploads/1744992934_default_wallpaper.png", "type": "image/jpeg", "created_at": "2025-04-18T16:15:35.000000Z", "updated_at": "2025-04-18T16:15:35.000000Z" }]}></PostCard>
            <PostCard id="1" content="aaa" time="2025-04-06 10:24:37" visibility="private" user_display_name="Châu Thành Cường" user_id="1" user_profile_photo=""></PostCard>

            </div>
        </div>
    );
}
