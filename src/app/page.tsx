"use client";
import { Radio } from "@/components";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <Radio name="a" value="b"></Radio>
            <Radio name="a" value="c"></Radio>
        </div>
    );
}
