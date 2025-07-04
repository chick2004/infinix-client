"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { Video, Card, Spinner } from "@/components";
import { useEffect, useState } from "react";
import { useMotion, MotionName } from "@/hooks";

export default function Home() {
    return (
        <div className={styles.page}>
            <Spinner size="large"></Spinner>
        </div>
    );
}
