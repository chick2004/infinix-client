"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { AcrylicCard, MicaCard } from "@/components";

export default function Home() {
    
    return (
        <div className={styles.page} style={{background: "url(https://wallpapers.microsoft.design/images/feature-16.jpg) center/cover"}}>
            <AcrylicCard style={{width: "200px", height: "200px", padding: "20px"}}>content</AcrylicCard>
            <MicaCard style={{width: "200px", height: "200px", padding: "20px"}}>content</MicaCard>
        </div>
    );
}
