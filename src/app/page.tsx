import Image from "next/image";
import styles from "./page.module.css";

import { Input } from "@/components";

export default function Home() {
    return (
        <div className={styles.page}>
            <Input type="date"/>
            <input type="date" />
            <input type="datetime-local" />
            <input type="month" />
            <input type="time" />
            <input type="week" />
        </div>
    );
}
