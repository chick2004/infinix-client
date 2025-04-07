"use client";

import { useState, memo } from "react";
import { usePathname  } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { DropdownSearch, Icon, NotificationsCard } from "@/components";

import styles from "./ClientLayout.module.css";
import Head from "next/head";

const Header = memo(() => {

    const [showNotifications, setShowNotifications] = useState(false);
    const pathname = usePathname();

    return (
        <header className={styles.header}>
                <div className={styles.header_left}>
                    <Image src="/images/logo.png" alt="" width={35} height={35}></Image>
                </div>
                <div className={styles.header_center}>
                    <DropdownSearch suggestions={["option1", "option2"]} placeholder={"Search somethings"}/>
                </div>
                <div className={styles.header_right}>
                    <Link href="/home" className={pathname === "/home" ? styles.active : ""} onClick={() => setShowNotifications(false)}>
                        <Icon name="home" size={24} type={pathname === "/home" ? "filled" : "regular"}/>
                    </Link>

                    <div className={styles.notification_button} onClick={() => setShowNotifications(!showNotifications)}>
                        <button className={pathname === "/notifications" ? styles.active : ""}>
                            <Icon name="alert" size={24} type={pathname === "/notifications" ? "filled" : "regular"}/>
                        </button>
                        { showNotifications && <div className={styles.notifications}>
                            <NotificationsCard></NotificationsCard>
                        </div> }
                    </div>

                    <Link href="/chat" className={pathname === "/chat" ? styles.active : ""} onClick={() => setShowNotifications(false)}>
                        <Icon name="chat_multiple" size={24} type={pathname === "/chat" ? "filled" : "regular"}/>
                    </Link>

                    <Link href="/bookmarks" className={pathname === "/bookmarks" ? styles.active : ""} onClick={() => setShowNotifications(false)}>
                        <Icon name="bookmark" size={24} type={pathname === "/bookmarks" ? "filled" : "regular"}/>
                    </Link>

                    <Link href="/setting" className={pathname === "/setting" ? styles.active : ""} onClick={() => setShowNotifications(false)}>
                        <Icon name="settings" size={24} type={pathname === "/setting" ? "filled" : "regular"}/>
                    </Link>
                </div>
            </header>
    )
});

export default function ClientLayout({children}: {children: React.ReactNode}) {

    return (
        <div className={styles.layout}>
            <Header></Header>
            <div className={styles.main}> 
                {children}
            </div>
        </div>
    )
}