import type { Profile } from "@/types";
export default interface User {

    id: number;

    username: string;

    email: string;

    phone_number?: string | null;

    last_activity: string | null;

    profile: Profile;

    created_at: string;

    updated_at: string;

    deleted_at: string | null;

    is_friend?: boolean;

    is_sent_friend_request?: boolean;

}