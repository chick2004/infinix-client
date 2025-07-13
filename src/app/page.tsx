"use client";
import { Textarea } from "@/components";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <Textarea rows={3} style={{height: "100px"}}></Textarea>
        </div>
    );
}
