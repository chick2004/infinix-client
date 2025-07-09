"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { requestInit } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, Text, Button, Icon, Spinner } from "@/components";
import { useAuth } from "@/hooks";
import { ApiResponse, FriendRequest } from "@/types";
import FriendRequestListCardProps from "./FriendRequestListCard.types";
import styles from "./FriendRequestListCard.module.scss";

export default function FriendRequestListCard({ style, className, ref, friend_requests }: FriendRequestListCardProps) {

    const root = clsx(
        styles.root,
        className
    );

    const { user } = useAuth();
    const friendRequestsQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/users/" + user?.id + "/friend-requests";
    const queryClient = useQueryClient();

    const mutateAcceptFriendRequest = async (friend_request_id: number) => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/friend-requests/" + friend_request_id, requestInit("PUT", {
            status: "accepted"
        }));
        if (!response.ok) {
            throw new Error("Failed to accept friend request");
        }
        return response.json();
    }
    const acceptFriendRequestMutation = useMutation({
        mutationFn: mutateAcceptFriendRequest,
        onSuccess: (_, id) => {
            queryClient.setQueryData([friendRequestsQueryUrl], (oldData: ApiResponse<FriendRequest[]>) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    data: oldData.data.filter((request: FriendRequest) => request.id !== id)
                };
            });
        },
    });

    const mutateRejectFriendRequest = async (friend_request_id: number) => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/friend-requests/" + friend_request_id, requestInit("PUT", {
            status: "rejected"
        }));
        if (!response.ok) {
            throw new Error("Failed to reject friend request");
        }
        return response.json();
    }
    const rejectFriendRequestMutation = useMutation({
        mutationFn: mutateRejectFriendRequest,
        onSuccess: (_, id) => {
            queryClient.setQueryData([friendRequestsQueryUrl], (oldData: ApiResponse<FriendRequest[]>) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    data: oldData.data.filter((request: FriendRequest) => request.id !== id)
                };
            });
        }
    });

    return (
        <Card stroke style={style} className={root} ref={ref}>
            <div className={styles.header}>
                <Text type={"body_strong"} className={styles.title}>Friend Requests</Text>
                <Link href="" className={styles.see_all}>See all</Link>
            </div>
            <div className={styles.list}>
                {friend_requests.map((request) => (
                    <div key={request.id} className={styles.item}>
                        <Image className={styles.avatar} src={request.sender.profile.profile_photo || "/images/avatar.png"} alt={request.sender.profile.display_name} width={40} height={40}/>
                        <div className={styles.info}>
                            <Text className={styles.display_name}>{request.sender.profile.display_name}</Text>
                            <div className={styles.actions}>
                                {acceptFriendRequestMutation.isPending ? (
                                    <Button appearance="subtle">
                                        <Spinner></Spinner>
                                    </Button>
                                ) : (
                                    <Button appearance="subtle" disabled={rejectFriendRequestMutation.isPending} onClick={() => acceptFriendRequestMutation.mutate(request.id)}>
                                        <Icon name="checkmark" size={16}></Icon>
                                    </Button>
                                )}
                                {rejectFriendRequestMutation.isPending ? (
                                    <Button appearance="subtle">
                                        <Spinner></Spinner>
                                    </Button>
                                ) : (
                                    <Button appearance="subtle" disabled={acceptFriendRequestMutation.isPending} onClick={() => rejectFriendRequestMutation.mutate(request.id)}>
                                        <Icon name="dismiss" size={16}></Icon>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}