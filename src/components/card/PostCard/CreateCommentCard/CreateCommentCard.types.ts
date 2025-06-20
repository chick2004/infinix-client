import type { Comment } from '@/types';
export default interface CommentCardProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;

    post_id: number;

    editting_comment?: Comment;

    onEndEdit?: () => void;

}