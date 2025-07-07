"use client";

import Image from "next/image";
import { useState } from "react";

import { useMotion, MotionName } from "@/hooks";
import { DropdownSearch, Icon, Input, Button, Textarea, Switch, Select, Collapse, Radio} from "@/components";

import { ClientLayout } from "@/layouts";
import styles from './page.module.css';

interface TabProps {
    openedDropdown: string;
    handleDropdownClick: (dropdown: string) => void;
    style: React.CSSProperties;
}

const GeneralTab = ({ openedDropdown, handleDropdownClick, style}: TabProps) => {

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

const AccountTab = ({ openedDropdown, handleDropdownClick, style}: TabProps) => {
    return (
        <div className={styles.tab_content_card} style={style}>
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
                            <div className={styles.setting_item_desc}>@chick2004</div>
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
                            <div className={styles.setting_item_desc}>0903252075</div>
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
                            <div className={styles.setting_item_desc}>chauthanhcuong2004@gmail.com</div>
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

const AppearanceTab = ({ openedDropdown, handleDropdownClick, style}: TabProps) => {
    
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

    const [selectedTab, setSelectedTab] = useState("general");
    const [openedDropdown, setOpenedDropdown] = useState<string>("");

    const { shouldRender: shouldRenderAccountTab, animationStyle: animationStyleAccountTab } = useMotion(selectedTab === "account", { appear: MotionName.SLIDE_UP_IN, appearDistance: 20 });
    const { shouldRender: shouldRenderGeneralTab, animationStyle: animationStyleGeneralTab } = useMotion(selectedTab === "general", { appear: MotionName.SLIDE_UP_IN, appearDistance: 20 });
    const { shouldRender: shouldRenderAppearanceTab, animationStyle: animationStyleAppearanceTab } = useMotion(selectedTab === "appearance", { appear: MotionName.SLIDE_UP_IN, appearDistance: 20 });

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
                        {shouldRenderGeneralTab && <GeneralTab style={animationStyleGeneralTab} openedDropdown={openedDropdown} handleDropdownClick={handleDropdownClick}></GeneralTab>}
                        {shouldRenderAccountTab && <AccountTab style={animationStyleAccountTab} openedDropdown={openedDropdown} handleDropdownClick={handleDropdownClick}></AccountTab>}
                        {shouldRenderAppearanceTab && <AppearanceTab style={animationStyleAppearanceTab} openedDropdown={openedDropdown} handleDropdownClick={handleDropdownClick}></AppearanceTab>}
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}