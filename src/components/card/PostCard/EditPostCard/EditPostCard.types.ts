import { Post } from "@/types"

export default interface EditPostCardProps extends Post{

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;

    handleClose?: () => void;
}