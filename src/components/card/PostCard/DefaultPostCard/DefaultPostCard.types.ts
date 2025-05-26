import { Post } from "@/types"

export default interface DefaultPostCardProps extends Post {

    style?: React.CSSProperties;

    className?: string;
    
    handleOpenEditPost?: () => void;

    handleOpenDeletePost?: () => void;

    handleOpenDetailPost?: () => void;
}