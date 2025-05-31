"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { Video, Slider } from "@/components";

export default function Home() {
    
    return (
        <div className={styles.page}>
            <Video src={process.env.NEXT_PUBLIC_API_URL + "/media" + "/storage/uploads/1748279564_original-e2dbe8c001af16d76769f35ac29a6d5d.mp4"}></Video>
            
        </div>
    );
}
