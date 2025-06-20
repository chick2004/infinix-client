
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { Layer, Spinner, Button, Text, Icon } from "@/components";
import { useRequest, useFetch } from "@/hooks";
import ProfileCardProps from "./ProfileCard.types";
import styles from "./ProfileCard.module.scss";
import { useEffect } from "react";

export default function ProfileCard({ style, className, ref, user, is_owner }: ProfileCardProps) {

    const router = useRouter();

    const root = clsx(
        styles.root,
        className
    );

    const { data: createConversationData, loading: createConversationLoading, status: createConversationStatus, execute: createConversationExecute } = useRequest(process.env.NEXT_PUBLIC_API_URL + "/conversations", "POST");
    const { data: getConversationData, loading: getConversationLoading, status: getConversationStatus } = useFetch(process.env.NEXT_PUBLIC_API_URL + "/conversations/with_user/" + user?.id);

    const handleCreateConversation = async () => {

        if (!user || is_owner) return;

        if (getConversationData) {
            router.push("/chat/" + getConversationData.id);
        } else {
            createConversationExecute({
            with_user: user.id
        })
        }
    }

    useEffect(() => {
        if (createConversationStatus === 201) {
            router.push("/chat/" + createConversationData.id);
        }
    }, [createConversationStatus, createConversationData]);

    return (
        <Layer stroke className={root} style={style} ref={ref}>
            <div className={styles.photos_container}>
                <div className={styles.cover_photo_container}>
                    <Image src={user?.profile?.profile_photo || "/images/splash3.webp"} alt={"cover-photo"} fill></Image>
                </div>
                <div className={styles.profile_photo_container}>
                    <Image src={user?.profile?.cover_photo || "/images/avatar.png"} alt={"profile-photo"} fill></Image>
                </div>
            </div>
            <div className={styles.profile_info_container}>
                <Text type="body_large">{user?.profile?.display_name}</Text>
                <Text type="body">@{user?.username}</Text>
                <Text type="body">{user?.profile?.bio}</Text>
            </div>
            <div className={styles.social_stats_container}>
                <div className={styles.social_stat}>
                    <Text>Friends</Text>
                    <Text type="body_strong">100</Text>
                </div>
                <div className={styles.social_stat}>
                    <Text>Followers</Text>
                    <Text type="body_strong">100</Text>
                </div>
                <div className={styles.social_stat}>
                    <Text>Following</Text>
                    <Text type="body_strong">100</Text>
                </div>
            </div>
            <div className={styles.actions_container}>
                {is_owner ? (
                    <Button appearance="accent">
                        <Link href={"/setting"}>Edit profile</Link>
                    </Button>
                ) : (
                    <>
                        <Button appearance="accent">
                            <Icon name="person_add" size={20} />
                            Add friend
                        </Button>
                        <div className={styles.group}>
                            {createConversationLoading ? (
                                <Button appearance="standard">
                                    <Spinner></Spinner>
                                </Button>
                            ) : (
                                <Button appearance="standard" onClick={handleCreateConversation}>
                                    <Icon name="chat" size={20} />
                                </Button>
                            )}
                            <Button appearance="standard">
                                <Icon name="chevron_down" size={20} />
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Layer>
    )
}