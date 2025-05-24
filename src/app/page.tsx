"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { EditPostCard } from "@/components";

export default function Home() {
    
    return (
        <div className={styles.page}>
            <EditPostCard></EditPostCard>
        </div>
    );
}
