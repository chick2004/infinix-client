"use client";

import { createPortal } from "react-dom";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { requestInit } from "@/lib";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks";
import { useMotion, MotionName } from "@/hooks";
import { DropdownSearch, Icon, Field, Input, Button, Spinner, Switch, Select, Collapse, Radio, UpdatePasswordCard} from "@/components";

import { ClientLayout } from "@/layouts";
import styles from './page.module.css';
import { Setting, ApiResponse } from "@/types";
    
export default function Page() {

    const [updatingField, setUpdatingField] = useState<string | undefined>(undefined);
    const { user } = useAuth();
    const [viewingUsername, setViewingUsername] = useState(user?.username);
    const [viewingPhoneNumber, setViewingPhoneNumber] = useState(user?.phone_number);
    const [viewingEmail, setViewingEmail] = useState(user?.email);
    const [isShowingUpdatePassword, setIsShowingUpdatePassword] = useState(false);
    const settingsQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/users/" + user?.id + "/settings";
    const querySettings = async () => {
        const response = await fetch(settingsQueryUrl, requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch user settings");
        }
        return await response.json() as ApiResponse<Setting>;
    }
    const settingsQuery = useQuery({
        queryKey: [settingsQueryUrl],
        queryFn: querySettings,
        enabled: !!user?.id,
        gcTime: 1000 * 60 * 5, // 5 minutes
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    
    const [formData, setFormData] = useState({
        display_name: user?.profile.display_name,
        bio: user?.profile.bio,
        date_of_birth: user?.profile.date_of_birth,
        profile_photo: user?.profile.profile_photo,
        cover_photo: user?.profile.cover_photo,
        username: user?.username,
        phone_number: user?.phone_number,
        email: user?.email,
        theme: "",
        language: "",
    });

    const [formErrors, setFormErrors] = useState({
        display_name: "",
        bio: "",
        date_of_birth: "",
        profile_photo: "",
        cover_photo: "",
        username: "",
        phone_number: "",
        email: "",
        theme: "",
        language: "",
    });

    useEffect(() => {
        if (settingsQuery.data?.data) {
            setFormData({...formData, theme: settingsQuery.data.data.theme, language: settingsQuery.data.data.language });
        }
    }, [settingsQuery.data]);

    const [selectedTab, setSelectedTab] = useState("general");
    const [openedDropdown, setOpenedDropdown] = useState<string | undefined>(undefined);

    const accountTabMotion = useMotion(selectedTab === "account", { appear: MotionName.SLIDE_UP_IN, appearDistance: 20 });
    const generalTabMotion = useMotion(selectedTab === "general", { appear: MotionName.SLIDE_UP_IN, appearDistance: 20 });
    const appearanceTabMotion = useMotion(selectedTab === "appearance", { appear: MotionName.SLIDE_UP_IN, appearDistance: 20 });

    const handleDropdownClick = (dropdown: string) => {
        setOpenedDropdown(openedDropdown === dropdown ? "" : dropdown);
    };

    const mutateUpdate = async ({ name, payload }: { name: string; payload: any }) => {
        const requestBody = { [name]: payload };
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + user?.id + "/settings", requestInit("PUT", requestBody));
        if (!response.ok) {
            throw new Error("Failed to update user information");
        }
        return await response.json();
    }
    const updateMutation = useMutation({
        mutationFn: mutateUpdate,
        onSuccess: (data, {name, payload}) => {
            if (data.status !== 200) {
                if (data.errors.username) {
                    setFormErrors((prevErrors) => ({ ...prevErrors, username: "This username is already taken" }));
                }
            } else {
                setFormErrors({ ...formErrors, [name]: "" });
                setFormData((prevData) => ({ ...prevData, [name]: payload }));
                setUpdatingField(undefined);
                setOpenedDropdown(undefined);
                if (name === "username") {
                    setViewingUsername(payload);
                } else if (name === "phone_number") {
                    setViewingPhoneNumber(payload);
                } else if (name === "email") {
                    setViewingEmail(payload);
                }
            }

            setUpdatingField(undefined);
        },
        onError: (error) => {
            setUpdatingField(undefined);
            console.error("Update failed", error);
        }
    });

    const handleUpdate = (name: string, payload: any) => {
        setUpdatingField(name);
        updateMutation.mutate({ name, payload });
        console.log("Update called", name, payload);
    }

    const updatePasswordCardMotion = useMotion(isShowingUpdatePassword, { appear: MotionName.SCALE_UP_IN, appearDistance: 20 });

    return (
        <ClientLayout>
            <div className={styles.page}>
                <div className={styles.layout}>
                    <div className={styles.left}>
                        <div className={styles.tab_card}>
                            <div className={styles.setting_title}>Setting</div>
                            <DropdownSearch suggestions={[]}></DropdownSearch>
                            <div className={styles.settings_list}>
                                <div className={`${styles.settings_list_item} ${selectedTab === "general" ? styles.active : ""}`} onClick={() => setSelectedTab("general")}>
                                    <Icon name={"settings"} size={20}></Icon>
                                    General
                                </div>
                                <div className={`${styles.settings_list_item} ${selectedTab === "account" ? styles.active : ""}`} onClick={() => setSelectedTab("account")}>
                                    <Icon name={"person"} size={20}></Icon>
                                    Account
                                </div>
                                <div className={`${styles.settings_list_item} ${selectedTab === "appearance" ? styles.active : ""}`} onClick={() => setSelectedTab("appearance")}>
                                    <Icon name={"tv"} size={20}></Icon>
                                    Appearance
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        {generalTabMotion.shouldRender && (
                            <div className={styles.tab_content_card} style={generalTabMotion.animationStyle}>
                                <div className={styles.setting_group}>
                                    <div className={styles.setting_group_title}>Notification</div>
                                    <div className={styles.setting_group_item}>
                                        <div className={styles.setting_item_content}>
                                            <Icon name={"alert"}></Icon>
                                            <div className={styles.setting_item_desc_container}>
                                                <div className={styles.setting_item_title}>All notification</div>
                                                <div className={styles.setting_item_desc}>Allow all notification</div>
                                            </div>
                                            <Switch></Switch>
                                        </div>
                                    </div>
                                    <div className={styles.setting_group_item}>
                                        <div className={styles.setting_item_content}>
                                            <Icon name={"alert"}></Icon>
                                            <div className={styles.setting_item_desc_container}>
                                                <div className={styles.setting_item_title}>Sound</div>
                                                <div className={styles.setting_item_desc}>Notification sound</div>
                                            </div>
                                            <Select options={["sound 1", "sound 2", "sound 3"]}></Select>
                                        </div>
                                    </div>
                                    <div className={styles.setting_group_item}>
                                        <div className={styles.setting_item_content} onClick={() => handleDropdownClick("message_notification")}>
                                            <Icon name={"chat"}></Icon>
                                            <div className={styles.setting_item_desc_container}>
                                                <div className={styles.setting_item_title}>Message</div>
                                                <div className={styles.setting_item_desc}>Message notification</div>
                                            </div>
                                            <Button appearance={"subtle"}>
                                                {openedDropdown === "message_notification" ? <Icon name={"chevron_up"} size={20}></Icon> : <Icon name={"chevron_down"} size={20}></Icon>}
                                            </Button>
                                        </div>
                                        <Collapse visible={openedDropdown === "message_notification"}>
                                            <div className={styles.setting_item_dropdown}>
                                                <p className={styles.setting_item_option_title}>Message notification</p>
                                                <Switch></Switch>
                                            </div>
                                            <div className={styles.setting_item_dropdown}>
                                                <p className={styles.setting_item_option_title}>Group message notification</p>
                                                <Switch></Switch>
                                            </div>
                                        </Collapse>
                                    </div>
                                </div>
                            </div>
                        )}
                        {accountTabMotion.shouldRender && (
                            <div className={styles.tab_content_card} style={accountTabMotion.animationStyle}>
                                <div className={styles.setting_group}>
                                    <div className={styles.setting_group_title}>Account Information</div>
                                    <div className={styles.setting_group_item}>
                                        <div className={styles.setting_item_content} onClick={() => handleDropdownClick("username")}>
                                            <Icon name={"contact_card"}></Icon>
                                            <div className={styles.setting_item_desc_container}>
                                                <div className={styles.setting_item_title}>Username</div>
                                                <div className={styles.setting_item_desc}>{viewingUsername}</div>
                                            </div>
                                            <Button appearance={"subtle"}>
                                                {openedDropdown === "username" ? <Icon name={"chevron_up"} size={20}></Icon> : <Icon name={"chevron_down"} size={20}></Icon>}
                                            </Button>
                                        </div>
                                        <Collapse visible={openedDropdown === "username"}>
                                            <div className={styles.setting_item_dropdown}>
                                                <Field validation_message={formErrors?.username} validation_state={formErrors?.username ? "error" : undefined}>
                                                    <Input type="text" value={formData.username} onChange={(value) => {setFormData({...formData, username: value})}}></Input>
                                                </Field>
                                                { updatingField === "username" ? (
                                                    <Button appearance={"standard"}>
                                                        <Spinner></Spinner>
                                                        Saving...
                                                    </Button>
                                                ) : (
                                                    <Button appearance={"standard"} onClick={() => {handleUpdate("username", formData.username)}}>Save</Button>
                                                )}
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className={styles.setting_group_item}>
                                        <div className={styles.setting_item_content}>
                                            <Icon name={"key"}></Icon>
                                            <div className={styles.setting_item_desc_container}>
                                                <div className={styles.setting_item_title}>Password</div>
                                                <div className={styles.setting_item_desc}>Change your password</div>
                                            </div>
                                            <Button appearance={"standard"} onClick={() => setIsShowingUpdatePassword(true)}>
                                                Change
                                            </Button>
                                        </div>
                                    </div>
                                    <div className={styles.setting_group_item}>
                                        <div className={styles.setting_item_content} onClick={() => handleDropdownClick("phone_number")}>
                                            <Icon name={"phone"}></Icon>
                                            <div className={styles.setting_item_desc_container}>
                                                <div className={styles.setting_item_title}>Phone number</div>
                                                <div className={styles.setting_item_desc}>{viewingPhoneNumber}</div>
                                            </div>
                                            <Button appearance={"standard"}>
                                                Change
                                            </Button>
                                        </div>
                                    </div>
                                    <div className={styles.setting_group_item}>
                                        <div className={styles.setting_item_content} onClick={() => handleDropdownClick("email")}>
                                            <Icon name={"mail"}></Icon>
                                            <div className={styles.setting_item_desc_container}>
                                                <div className={styles.setting_item_title}>Email</div>
                                                <div className={styles.setting_item_desc}>{viewingEmail}</div>
                                            </div>
                                            <Button appearance={"standard"}>
                                                Change
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {appearanceTabMotion.shouldRender && (
                            <div className={styles.tab_content_card} style={appearanceTabMotion.animationStyle}>
                                <div className={styles.setting_group}>
                                    <div className={styles.setting_group_title}>Display</div>
                                    <div className={styles.setting_group_item}>
                                        <div className={styles.setting_item_content} onClick={() => handleDropdownClick("theme")}>
                                            <Icon name={"sparkle"}></Icon>
                                            <div className={styles.setting_item_desc_container}>
                                                <div className={styles.setting_item_title}>Theme</div>
                                                <div className={styles.setting_item_desc}>Custom the look and feel</div>
                                            </div>
                                            <Button appearance={"subtle"}>
                                                {openedDropdown === "theme" ? <Icon name={"chevron_up"} size={20}></Icon> : <Icon name={"chevron_down"} size={20}></Icon>}
                                            </Button>
                                        </div>
                                        <Collapse visible={openedDropdown === "theme"}>
                                            <div className={styles.setting_item_dropdown}>
                                                <div className={styles.theme_option_container}>
                                                    <div className={`${styles.theme_option} ${formData.theme === "light" ? styles.active : ""}`} onClick={() => handleUpdate("theme", "light")}>
                                                        <div className={styles.theme_image_container}>
                                                            <Image src={"/images/theme_light.png"} alt={""} fill/>
                                                        </div>
                                                    </div>
                                                    <div className={`${styles.theme_option} ${formData.theme === "dark" ? styles.active : ""}`} onClick={() => handleUpdate("theme", "dark")}>
                                                        <div className={styles.theme_image_container}>
                                                            <Image src={"/images/theme_dark.png"} alt={""} fill/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className={styles.setting_group_item}>
                                        <div className={styles.setting_item_content}>
                                            <Icon name={"local_language"}></Icon>
                                            <div className={styles.setting_item_desc_container}>
                                                <div className={styles.setting_item_title}>Language</div>
                                                <div className={styles.setting_item_desc}>Select the display language</div>
                                            </div>
                                            <Select options={["English", "Vietnamese"]}></Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {updatePasswordCardMotion.shouldRender && (
                createPortal(
                    <div className={styles.update_password_card_container}>
                        <UpdatePasswordCard onClose={() => setIsShowingUpdatePassword(false)} style={updatePasswordCardMotion.animationStyle}></UpdatePasswordCard>
                    </div>,
                    document.getElementById("modal-root") as HTMLElement
                )
            )}
        </ClientLayout>
    )
}