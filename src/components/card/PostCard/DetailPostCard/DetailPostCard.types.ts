import type { Post } from "@/types"

export default interface DetailPostCardProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;

    post: Post;

    handleClose?: () => void;
    
}