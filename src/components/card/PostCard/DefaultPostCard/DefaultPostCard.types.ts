import type { Post } from "@/types"

export default interface DefaultPostCardProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;

    post: Post;
    
    handleOpenEditPost?: () => void;

    handleOpenDeletePost?: () => void;

    handleOpenDetailPost?: () => void;
}