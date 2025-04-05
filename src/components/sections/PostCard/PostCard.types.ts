export default interface PostCardProps {

    id: string;

    content: string;

    time: string;

    visibility: "public" | "friends" | "private";

    medias?: Array<any>;

    likes_count?: number;

    comments_count?: number;

    shares_count?: number;

    isLiked?: boolean;

    isBookmarked?: boolean;

    user_id: string;

    user_display_name: string;

    user_profile_photo: string;



}