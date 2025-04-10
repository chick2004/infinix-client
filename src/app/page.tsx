import Image from "next/image";
import styles from "./page.module.css";

import { Input } from "@/components";

export default function Home() {
    return (
        <div className={styles.page}>
            <Input type="date"/>
        </div>
    );
}
