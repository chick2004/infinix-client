export default interface PostCardProps {

    id?: string;

    content?: string;

    medias?: Array<string>;

    likes?: number;

    comments?: number;

    shares?: number;

    isLiked?: boolean;

    isBookmarked?: boolean;

    isSaved?: boolean;

}