import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { requestInit } from "@/lib";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Layer, Button, Text, Icon } from "@/components";
import ProfileCardProps from "./ProfileCard.types";
import styles from "./ProfileCard.module.scss";

export default function ProfileCard({ style, className, ref, user, is_owner }: ProfileCardProps) {

    const router = useRouter();

    const root = clsx(
        styles.root,
        className
    );

    const mutateCreateFriendRequest = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/friend-requests", requestInit("POST", {receiver_id: user.id}));
        if (!response.ok) {
            throw new Error("Failed to create friend request");
        }
        return response.json();
    }
    const createFriendRequestMutation = useMutation({
        mutationFn: mutateCreateFriendRequest,
        onError: (error) => {
            console.error("Error creating friend request:", error);
        },
        onSuccess: () => {
            // Optionally handle success, e.g., show a notification
            console.log("Friend request sent successfully");
        }
    });

    const mutateCreateConversation = async (data: { with_user: number | undefined }) => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/conversations", requestInit("POST", data));

        if (!response.ok) {
            throw new Error("Failed to create conversation");
        }

        return response.json();
    }
    const createConversationMutation = useMutation({
        mutationFn: mutateCreateConversation,
        onError: (error) => {
            console.error("Error fetching cookie:", error);
        },
        onSuccess: (data) => {
            router.push("/chat/" + data.data.id);
        }
    });

    const conversationQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/conversations/with_user/" + user?.id;
    const queryConversation = async () => {
        const response = await fetch(conversationQueryUrl, requestInit("GET"));

        if (!response.ok) {
            throw new Error("Failed to fetch conversation");
        }

        return response.json();
    }
    const conversationQuery = useQuery({
        queryKey: [conversationQueryUrl],
        queryFn: queryConversation,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5,
    }); 

    const handleCreateConversation = async () => {
        if (!user || is_owner) return;
        if (conversationQuery.data?.data) {
            router.push("/chat/" + conversationQuery.data.data.id);
        } else {
            createConversationMutation.mutate({ with_user: user.id });
        }
    }

    const handleCreateFriendRequest = async () => {
        if (!user || is_owner) return;
        createFriendRequestMutation.mutate();
    }

    return (
        <Layer stroke className={root} style={style} ref={ref}>
            <div className={styles.photos_container}>
                <div className={styles.cover_photo_container}>
                    <Image src={user.profile.profile_photo || "/images/splash3.webp"} alt={"cover-photo"} fill />
                </div>
                <div className={styles.profile_photo_container}>
                    <Image src={user.profile.cover_photo || "/images/avatar.png"} alt={"profile-photo"} fill />
                </div>
            </div>
            <div className={styles.profile_info_container}>
                <Text type="body_large">{user.profile.display_name}</Text>
                <Text type="body">@{user.username}</Text>
                <Text type="body">{user.profile.bio}</Text>
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
                        {user.is_sent_friend_request ? (
                            <Button appearance="accent" onClick={handleCreateFriendRequest} disabled={createFriendRequestMutation.isPending} >
                                <Icon name="person_add" size={20} />
                                Sent request
                            </Button>
                        ) : user.is_friend ? (
                            <Button appearance="accent" onClick={handleCreateConversation} disabled={createConversationMutation.isPending} >
                                <Icon name="chat" size={20} />
                                Message
                            </Button>
                        ) : (
                            <Button appearance="accent" onClick={handleCreateFriendRequest} disabled={createFriendRequestMutation.isPending} >
                                <Icon name="person_add" size={20} />
                                Add friend
                            </Button>
                        )}
                        <div className={styles.group}>
                            <Button appearance="standard" onClick={handleCreateConversation}>
                                    <Icon name="chat" size={20} />
                                </Button>
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