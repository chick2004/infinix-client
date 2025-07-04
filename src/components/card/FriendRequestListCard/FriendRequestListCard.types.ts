import type { FriendRequest } from "@/types";
export default interface FriendRequestListCardProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;

    friend_requests: FriendRequest[];

}