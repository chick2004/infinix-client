import { Post } from "@/types"

export default interface DefaultPostCardProps extends Post {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;
    
    handleOpenEditPost?: () => void;

    handleOpenDeletePost?: () => void;

    handleOpenDetailPost?: () => void;
}