"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { requestInit } from "@/lib";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks";
import { useMotion, MotionName } from "@/hooks";
import { DropdownSearch, Icon, Input, Button, Textarea, Switch, Select, Collapse, Radio} from "@/components";

import { ClientLayout } from "@/layouts";
import styles from './page.module.css';
import { User, Setting, ApiResponse } from "@/types";

    interface TabProps {
        openedDropdown: string;
        handleDropdownClick: (dropdown: string) => void;
        style: React.CSSProperties;
        formData?: any;
        onUpdate?: (name: string, payload: any) => void;
    }

    const GeneralTab = ({ openedDropdown, handleDropdownClick, style, formData, onUpdate}: TabProps) => {

        return (
            <div className={styles.tab_content_card} style={style}>
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
        )
    }

    const AccountTab = ({ openedDropdown, handleDropdownClick, style, formData, onUpdate}: TabProps) => {

        const [displayName, setDisplayName] = useState(formData?.display_name || "");
        const [bio, setBio] = useState(formData?.bio || "");
        const [dateOfBirth, setDateOfBirth] = useState(formData?.date_of_birth || "");

        return (
            <div className={styles.tab_content_card} style={style}>
                <div className={styles.profile_preview}>
                    <div className={styles.profile_photo_container}>
                        <div className={styles.cover_photo}>
                            <Image src={formData?.cover_photo || "/images/splash1.webp"} alt={""} fill/>
                        </div>
                        <div className={styles.profile_photo}>
                            <Image src={formData?.profile_photo || "/images/avatar.png"} alt={""} fill/>
                        </div>
                    </div>
                    <div className={styles.info_container}>
                        <div className={styles.display_name}>{formData?.display_name}</div>
                        <div className={styles.bio}>{formData?.bio}</div>
                    </div>
                </div>
                <div className={styles.setting_group}>
                    <div className={styles.setting_group_title}>Personal Information</div>
                    <div className={styles.setting_group_item}>
                        <div className={styles.setting_item_content} onClick={() => handleDropdownClick("display_name")}>
                            <Icon name={"contact_card"}></Icon>
                            <div className={styles.setting_item_desc_container}>
                                <div className={styles.setting_item_title}>Display name</div>
                                <div className={styles.setting_item_desc}>{formData?.display_name}</div>
                            </div>
                            <Button appearance={"subtle"}>
                                {openedDropdown === "display_name" ? <Icon name={"chevron_up"} size={20}></Icon> : <Icon name={"chevron_down"} size={20}></Icon>}
                            </Button>
                        </div>
                        <Collapse visible={openedDropdown === "display_name"}>
                            <div className={styles.setting_item_dropdown}>
                                <Input onChange={setDisplayName} value={displayName}></Input>
                                <Button appearance={"standard"} onClick={() => onUpdate?.("display_name", displayName)}>Save</Button>
                            </div>
                        </Collapse>
                    </div>
                    <div className={styles.setting_group_item}>
                        <div className={styles.setting_item_content} onClick={() => handleDropdownClick("biography")}>
                            <Icon name={"person_note"}></Icon>
                            <div className={styles.setting_item_desc_container}>
                                <div className={styles.setting_item_title}>Bio</div>
                                <div className={styles.setting_item_desc}>{formData?.bio}</div>
                            </div>
                            <Button appearance={"subtle"}>
                                {openedDropdown === "biography" ? <Icon name={"chevron_up"} size={20}></Icon> : <Icon name={"chevron_down"} size={20}></Icon>}
                            </Button>
                        </div>
                        <Collapse visible={openedDropdown === "biography"}>
                            <div className={styles.setting_item_dropdown}>
                                <Textarea onChange={setBio} value={bio} style={{width: "200px"}}></Textarea>
                                <Button appearance={"standard"} onClick={() => onUpdate?.("bio", bio)}>Save</Button>
                            </div>
                        </Collapse>
                    </div>
                    <div className={styles.setting_group_item}>
                        <div className={styles.setting_item_content} onClick={() => handleDropdownClick("date_of_birth")}>
                            <Icon name={"calendar"}></Icon>
                            <div className={styles.setting_item_desc_container}>
                                <div className={styles.setting_item_title}>Date of birth</div>
                                <div className={styles.setting_item_desc}>{formData?.date_of_birth}</div>
                            </div>
                            <Button appearance={"subtle"}>
                                {openedDropdown === "date_of_birth" ? <Icon name={"chevron_up"} size={20}></Icon> : <Icon name={"chevron_down"} size={20}></Icon>}
                            </Button>
                        </div>
                        <Collapse visible={openedDropdown === "date_of_birth"}>
                            <div className={styles.setting_item_dropdown}>
                                <Input type="date" onChange={setDateOfBirth}></Input>
                                <Button appearance={"standard"} onClick={() => onUpdate?.("date_of_birth", dateOfBirth)}>Save</Button>
                            </div>
                        </Collapse>
                    </div>
                </div>
                <div className={styles.setting_group}>
                    <div className={styles.setting_group_title}>Profile photo</div>
                    <div className={styles.setting_group_item}>
                        <div className={styles.setting_item_content} onClick={() => handleDropdownClick("profile_photo")}>
                            <Icon name={"person_square"}></Icon>
                            <div className={styles.setting_item_desc_container}>
                                <div className={styles.setting_item_title}>Profile photo</div>
                                <div className={styles.setting_item_desc}>Adjust your avatar</div>
                            </div>
                            <Button appearance={"subtle"}>
                                {openedDropdown === "profile_photo" ? <Icon name={"chevron_up"} size={20}></Icon> : <Icon name={"chevron_down"} size={20}></Icon>}
                            </Button>
                        </div>
                        <Collapse visible={openedDropdown === "profile_photo"}>
                            <div className={styles.setting_item_dropdown}>
                                <p className={styles.setting_item_option_title}>Take a photo</p>
                                <Button appearance={"standard"}>Open camera</Button>
                            </div>
                            <div className={styles.setting_item_dropdown}>
                                <p className={styles.setting_item_option_title}>Choose a file</p>
                                <Button appearance={"standard"}>Browse files</Button>
                            </div>
                        </Collapse>
                    </div>
                    <div className={styles.setting_group_item}>
                        <div className={styles.setting_item_content} onClick={() => handleDropdownClick("cover_photo")}>
                            <Icon name={"image"}></Icon>
                            <div className={styles.setting_item_desc_container}>
                                <div className={styles.setting_item_title}>Cover photo</div>
                                <div className={styles.setting_item_desc}>Adjust your cover photo</div>
                            </div>
                            <Button appearance={"subtle"}>
                                {openedDropdown === "cover_photo" ? <Icon name={"chevron_up"} size={20}></Icon> : <Icon name={"chevron_down"} size={20}></Icon>}
                            </Button>
                        </div>
                        <Collapse visible={openedDropdown === "cover_photo"}>
                            <div className={styles.setting_item_dropdown}>
                                <p className={styles.setting_item_option_title}>Take a photo</p>
                                <Button appearance={"standard"}>Open camera</Button>
                            </div>
                            <div className={styles.setting_item_dropdown}>
                                <p className={styles.setting_item_option_title}>Choose a file</p>
                                <Button appearance={"standard"}>Browse files</Button>
                            </div>
                        </Collapse>
                    </div>
                </div>
                <div className={styles.setting_group}>
                    <div className={styles.setting_group_title}>Account Information</div>
                    <div className={styles.setting_group_item}>
                        <div className={styles.setting_item_content} onClick={() => handleDropdownClick("username")}>
                            <Icon name={"contact_card"}></Icon>
                            <div className={styles.setting_item_desc_container}>
                                <div className={styles.setting_item_title}>Username</div>
                                <div className={styles.setting_item_desc}>{formData?.username}</div>
                            </div>
                            <Button appearance={"subtle"}>
                                {openedDropdown === "username" ? <Icon name={"chevron_up"} size={20}></Icon> : <Icon name={"chevron_down"} size={20}></Icon>}
                            </Button>
                        </div>
                        <Collapse visible={openedDropdown === "username"}>
                            <div className={styles.setting_item_dropdown}>
                                <Input type="text"></Input>
                                <Button appearance={"standard"}>Save</Button>
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
                            <Button appearance={"standard"}>
                                Change
                            </Button>
                        </div>
                    </div>
                    <div className={styles.setting_group_item}>
                        <div className={styles.setting_item_content} onClick={() => handleDropdownClick("phone_number")}>
                            <Icon name={"phone"}></Icon>
                            <div className={styles.setting_item_desc_container}>
                                <div className={styles.setting_item_title}>Phone number</div>
                                <div className={styles.setting_item_desc}>{formData?.phone_number}</div>
                            </div>
                            <Button appearance={"subtle"}>
                                {openedDropdown === "phone_number" ? <Icon name={"chevron_up"} size={20}></Icon> : <Icon name={"chevron_down"} size={20}></Icon>}
                            </Button>
                        </div>
                        <Collapse visible={openedDropdown === "phone_number"}>
                            <div className={styles.setting_item_dropdown}>
                                <Input type="text"></Input>
                                <Button appearance={"standard"}>Save</Button>
                            </div>
                        </Collapse>
                    </div>
                    <div className={styles.setting_group_item}>
                        <div className={styles.setting_item_content} onClick={() => handleDropdownClick("email")}>
                            <Icon name={"mail"}></Icon>
                            <div className={styles.setting_item_desc_container}>
                                <div className={styles.setting_item_title}>Email</div>
                                <div className={styles.setting_item_desc}>{formData?.email}</div>
                            </div>
                            <Button appearance={"subtle"}>
                                {openedDropdown === "email" ? <Icon name={"chevron_up"} size={20}></Icon> : <Icon name={"chevron_down"} size={20}></Icon>}
                            </Button>
                        </div>
                        <Collapse visible={openedDropdown === "email"}>
                            <div className={styles.setting_item_dropdown}>
                                <Input type="text"></Input>
                                <Button appearance={"standard"}>Save</Button>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </div>
        )
    }

    const AppearanceTab = ({ openedDropdown, handleDropdownClick, style, formData, onUpdate}: TabProps) => {
        
        return (
            <div className={styles.tab_content_card} style={style}>
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
                                    <div className={styles.theme_option}>
                                        <div className={styles.theme_image_container}>
                                            <Image src={"/images/theme_light.png"} alt={""} fill/>
                                        </div>
                                        <Radio name="theme" label="Light"></Radio>
                                    </div>
                                    <div className={styles.theme_option}>
                                        <div className={styles.theme_image_container}>
                                            <Image src={"/images/theme_dark.png"} alt={""} fill/>
                                        </div>
                                        <Radio name="theme" label="Dark"></Radio>
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
        )
    }
    
export default function Page() {

    const { user } = useAuth();
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

    useEffect(() => {
        if (settingsQuery.data?.data) {
            setFormData({...formData, theme: settingsQuery.data.data.theme, language: settingsQuery.data.data.language });
        }
    }, [settingsQuery.data]);

    const [selectedTab, setSelectedTab] = useState("general");
    const [openedDropdown, setOpenedDropdown] = useState<string>("");

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
            setFormData((prevData) => ({ ...prevData, [name]: payload }));
            console.log("Update successful", data);
        },
        onError: (error) => {
            console.error("Update failed", error);
        }
    });

    const handleUpdate = (name: string, payload: any) => {
        updateMutation.mutate({ name, payload });
        console.log("Update called", name, payload);
    }



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
                        {generalTabMotion.shouldRender && <GeneralTab style={generalTabMotion.animationStyle} openedDropdown={openedDropdown} handleDropdownClick={handleDropdownClick} formData={formData} onUpdate={handleUpdate}></GeneralTab>}
                        {accountTabMotion.shouldRender && <AccountTab style={accountTabMotion.animationStyle} openedDropdown={openedDropdown} handleDropdownClick={handleDropdownClick} formData={formData} onUpdate={handleUpdate}></AccountTab>}
                        {appearanceTabMotion.shouldRender && <AppearanceTab style={appearanceTabMotion.animationStyle} openedDropdown={openedDropdown} handleDropdownClick={handleDropdownClick} formData={formData} onUpdate={handleUpdate}></AppearanceTab>}
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}