"use client";
import Image from 'next/image';


import { Spinner } from "@/components";
import styles from './LoadingPage.module.css';

export function LoadingPage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.logo_container}>
                    <Image src={"/images/logo.png"} alt={"logo"} width={50} height={50}></Image>
                    <p className={styles.name}>Infinix</p>
                </div>
                <Spinner size={"large"}></Spinner>
            </div>
        </div>
    );
}