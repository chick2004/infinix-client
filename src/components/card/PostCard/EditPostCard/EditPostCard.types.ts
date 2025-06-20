import type { Post } from "@/types"

export default interface EditPostCardProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;

    post: Post;

    handleClose?: () => void;
}