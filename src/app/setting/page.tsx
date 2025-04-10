"use client";

import Image from "next/image";
import { useState } from "react";

import { useMotion, MotionName } from "@/hooks";
import { DropdownSearch, Icon, Input, Button, Textarea, Collapse} from "@/components";

import { ClientLayout } from "@/layouts";
import styles from './page.module.css';
import { optimizeImage } from "next/dist/server/image-optimizer";

interface TabProps {
    openedDropdown: string;
    handleDropdownClick: (dropdown: string) => void;
}

const AccountTab = ({ openedDropdown, handleDropdownClick}: TabProps) => {
    return (
        <div className={styles.tab_content_card}>
            <div className={styles.profile_preview}>
                <div className={styles.profile_photo_container}>
                    <div className={styles.cover_photo}>
                        <Image src={"/images/splash1.webp"} alt={""} fill/>
                    </div>
                    <div className={styles.profile_photo}>
                        <Image src={"/images/avatar.png"} alt={""} fill/>
                    </div>
                </div>
                <div className={styles.info_container}>
                    <div className={styles.display_name}>Châu Thành Cường</div>
                    <div className={styles.bio}>Lorem ipsum dolor sit amet consectetur sum dolor sit amet.</div>
                </div>
            </div>
            <div className={styles.setting_group}>
                <div className={styles.setting_group_title}>Personal Information</div>
                <div className={styles.setting_group_item}>
                    <div className={styles.setting_item_content} onClick={() => handleDropdownClick("display_name")}>
                        <Icon name={"contact_card"}></Icon>
                        <div className={styles.setting_item_desc_container}>
                            <div className={styles.setting_item_title}>Display name</div>
                            <div className={styles.setting_item_desc}>Châu Thành Cường</div>
                        </div>
                        <Button appearance={"subtle"}>
                            {openedDropdown === "display_name" ? <Icon name={"chevron_up"} size={20}></Icon> : <Icon name={"chevron_down"} size={20}></Icon>}
                        </Button>
                    </div>
                    <Collapse visible={openedDropdown === "display_name"}>
                        <div className={styles.setting_item_dropdown}>
                            <Input></Input>
                            <Button appearance={"standard"}>Save</Button>
                        </div>
                    </Collapse>
                </div>
                <div className={styles.setting_group_item}>
                    <div className={styles.setting_item_content} onClick={() => handleDropdownClick("biography")}>
                        <Icon name={"person_note"}></Icon>
                        <div className={styles.setting_item_desc_container}>
                            <div className={styles.setting_item_title}>Bio</div>
                            <div className={styles.setting_item_desc}>Lorem ipsum dolor sit amet consectetur. Mi neque ut magna cras non quis congue sit</div>
                        </div>
                        <Button appearance={"subtle"}>
                            {openedDropdown === "biography" ? <Icon name={"chevron_up"} size={20}></Icon> : <Icon name={"chevron_down"} size={20}></Icon>}
                        </Button>
                    </div>
                    <Collapse visible={openedDropdown === "biography"}>
                        <div className={styles.setting_item_dropdown}>
                            <Textarea></Textarea>
                            <Button appearance={"standard"}>Save</Button>
                        </div>
                    </Collapse>
                </div>
                <div className={styles.setting_group_item}>
                    <div className={styles.setting_item_content} onClick={() => handleDropdownClick("date_of_birth")}>
                        <Icon name={"calendar"}></Icon>
                        <div className={styles.setting_item_desc_container}>
                            <div className={styles.setting_item_title}>Date of birth</div>
                            <div className={styles.setting_item_desc}>26/09/2004</div>
                        </div>
                        <Button appearance={"subtle"}>
                            {openedDropdown === "date_of_birth" ? <Icon name={"chevron_up"} size={20}></Icon> : <Icon name={"chevron_down"} size={20}></Icon>}
                        </Button>
                    </div>
                    <Collapse visible={openedDropdown === "date_of_birth"}>
                        <div className={styles.setting_item_dropdown}>
                            <Input type="date"></Input>
                            <Button appearance={"standard"}>Save</Button>
                        </div>
                    </Collapse>
                </div>
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
        </div>
    )
}

const GeneralTab = ({ openedDropdown, handleDropdownClick}: TabProps) => {

    return (
        <></>
    )
}

export default function Page() {

    const [selectedTab, setSelectedTab] = useState("general");
    const [openedDropdown, setOpenedDropdown] = useState<string>("");

    const handleDropdownClick = (dropdown: string) => {
        if (openedDropdown === dropdown) {
            setOpenedDropdown("");
        } else {
            setOpenedDropdown(dropdown);
        }
    };

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
                        {selectedTab === "general" && <GeneralTab openedDropdown={openedDropdown} handleDropdownClick={handleDropdownClick}></GeneralTab>}
                        {selectedTab === "account" && <AccountTab openedDropdown={openedDropdown} handleDropdownClick={handleDropdownClick}></AccountTab>}

                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}