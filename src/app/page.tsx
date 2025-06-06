"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { Video, Skeleton } from "@/components";
import { useEffect, useState } from "react";

export default function Home() {
    
    return (
        <div className={styles.page}>
            <Skeleton appearance="opaque" style={{width: "200px", height: "10px"}}></Skeleton>
            <Skeleton appearance="translucent" style={{width: "200px", height: "10px"}}></Skeleton>
            <br />
            <Skeleton appearance="opaque" animation="pulse" style={{width: "200px", height: "10px"}}></Skeleton>
            <Skeleton appearance="translucent" animation="pulse" style={{width: "200px", height: "10px"}}></Skeleton>
        </div>
    );
}
