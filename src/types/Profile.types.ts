export default interface Profile {

    id?: number;

    user_id: number;

    display_name?: string;

    profile_photo?: string;

    cover_photo?: string;

    bio?: string;

    date_of_birth?: string;

    gender: 'male' | 'female' | 'other';

    created_at?: string;

    updated_at?: string;

}