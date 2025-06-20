import type { Post } from "@/types"
export default interface PostCardProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;

    post: Post;
}