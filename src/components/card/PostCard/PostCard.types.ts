import { Post } from "@/types"

export default interface PostCardProps extends Post {

    style?: React.CSSProperties;

    className?: string;

}