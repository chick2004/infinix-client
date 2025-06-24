import type { PostMedia, User } from "@/types";

export default interface Post {

    id: number;

    content?: string;

    visibility: string;

    medias?: PostMedia[];

    shared_post?: Post | null;

    created_at: string;

    updated_at: string;

    deleted_at?: string | null;

    user: User;

}