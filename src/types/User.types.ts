import { Profile } from "@/types";
export default interface User {

    id?: number;

    username?: string;

    email?: string;

    phone_number?: string | null;

    last_activity?: string | null;
    
    email_verified_at?: string | null;

    profile?: Profile;

    created_at?: string;

    updated_at?: string;

    deleted_at?: string | null;

}