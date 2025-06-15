import { Comment } from '@/types';

export default interface CommentCardProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;

    comment: Comment;

}