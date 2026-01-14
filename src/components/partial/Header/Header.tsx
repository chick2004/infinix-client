"use client";

import { useState, useCallback, memo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useClickOutside, useAuth } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { DropdownSearch, Icon, NotificationsCard, Layer, Flyout, Text } from "@/components";
import styles from "./Header.module.scss";

export default memo(function Header() {

    const [showNotificationsCard, setShowNotificationsCard] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);
    useClickOutside(notificationsRef, () => setShowNotificationsCard(false));
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <Layer className={styles.header}>
            <div className={styles.header_left}>
                <Image src="/images/logo.png" alt="logo" width={35} height={35}></Image>
            </div>
            <div className={styles.header_center}>
                <DropdownSearch style={{width: "100%"}} suggestions={["option1", "option2"]} placeholder={"Search somethings"}/>
            </div>
            <div className={styles.header_right}>
                <Link href="/home" className={pathname === "/home" ? styles.active : ""} onClick={() => setShowNotificationsCard(false)}>
                    <Icon name="home" size={24} type={pathname === "/home" ? "filled" : "regular"}/>
                </Link>

                <div className={styles.notification_button} ref={notificationsRef} onClick={() => setShowNotificationsCard(!showNotificationsCard)}>
                    <button className={pathname === "/notifications" ? styles.active : ""}>
                        <Icon name="alert" size={24} type={pathname === "/notifications" ? "filled" : "regular"}/>
                    </button>
                    { showNotificationsCard && <div className={styles.notifications}>
                        <NotificationsCard></NotificationsCard>
                    </div> }
                </div>

                <Link href="/chat" className={pathname === "/chat" ? styles.active : ""} onClick={() => setShowNotificationsCard(false)}>
                    <Icon name="chat_multiple" size={24} type={pathname === "/chat" ? "filled" : "regular"}/>
                </Link>

                <Link href="/bookmark" className={pathname === "/bookmark" ? styles.active : ""} onClick={() => setShowNotificationsCard(false)}>
                    <Icon name="bookmark" size={24} type={pathname === "/bookmark" ? "filled" : "regular"}/>
                </Link>

                <Link href="/setting" className={pathname === "/setting" ? styles.active : ""} onClick={() => setShowNotificationsCard(false)}>
                    <Icon name="settings" size={24} type={pathname === "/setting" ? "filled" : "regular"}/>
                </Link>

                <div className={styles.avatar_container}>
                    <Image src="/images/avatar.png" alt="avatar" width={30} height={30} className={styles.avatar} onClick={() => {setShowAccountMenu(!showAccountMenu)}}/>
                    { showAccountMenu && (
                        <Flyout stroke shadow className={styles.avatar_flyout}>
                            <Link href={"/profile/" + user?.id} className={styles.avatar_link}>
                                <Icon name="person" size={20} type="regular" className={styles.avatar_icon}></Icon>
                                <Text>Profile</Text>
                            </Link>
                            <div className={styles.avatar_link} onClick={logout}>
                                <Icon name="person_arrow_left" size={20} type="regular" className={styles.avatar_icon}></Icon>
                                <Text>Logout</Text>
                            </div>
                        </Flyout>
                    )}
                </div>
            </div>
        </Layer>
    )
});