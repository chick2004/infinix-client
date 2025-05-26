import type { Media, User } from "@/types";

export default interface Post {

    id?: string;

    content?: string;

    visibility?: string;

    medias?: Media[];

    shared_post?: Post | null;

    created_at?: string;

    updated_at?: string;

    deleted_at?: string | null;

    user?: User;

}