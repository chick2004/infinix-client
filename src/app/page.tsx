import Image from "next/image";
import styles from "./page.module.css";

import { Video } from "@/components";

export default function Home() {
    return (
        <div className={styles.page}>
            <Video></Video>
        </div>
    );
}
