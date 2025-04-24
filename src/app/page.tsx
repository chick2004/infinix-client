import Image from "next/image";
import styles from "./page.module.css";

import { RadioGroup, Radio } from "@/components";

export default function Home() {
    return (
        <div className={styles.page}>
            <Radio name="radio" value="radio_1" label="radio 1"></Radio>
            <Radio name="radio" value="radio_2" label="radio 2"></Radio>
            {/* <RadioGroup name="group" label="radio group" options={[{label: "label 1", value: "value 1"}, {label: "label 2", value: "value 2"}]}/> */}
        </div>
    );
}
