"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { Field, Input } from "@/components";

export default function Home() {
    
    return (
        <div className={styles.page}>
            <Field label="text">
                <Input type="text"></Input>
            </Field>
            <br />
            <Field label="number">
                <Input type="number"></Input>
            </Field>
            <br />
            <Field label="date">
                <Input type="date"></Input>
            </Field>
        </div>
    );
}
