"use client";

import { useState, memo, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useClickOutside } from "@/hooks";
import { DropdownSearch, Icon, NotificationsCard, Layer } from "@/components";
import styles from "./Header.module.scss";

export default memo(function Header() {

    const [showNotifications, setShowNotifications] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);
    useClickOutside(notificationsRef, () => setShowNotifications(false));
    const pathname = usePathname();

    return (
        <Layer className={styles.header}>
            <div className={styles.header_left}>
                <Image src="/images/logo.png" alt="logo" width={35} height={35}></Image>
            </div>
            <div className={styles.header_center}>
                <DropdownSearch style={{width: "100%"}} suggestions={["option1", "option2"]} placeholder={"Search somethings"}/>
            </div>
            <div className={styles.header_right}>
                <Link href="/home" className={pathname === "/home" ? styles.active : ""} onClick={() => setShowNotifications(false)}>
                    <Icon name="home" size={24} type={pathname === "/home" ? "filled" : "regular"}/>
                </Link>

                <div className={styles.notification_button} ref={notificationsRef} onClick={() => setShowNotifications(!showNotifications)}>
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
        </Layer>
    )
});