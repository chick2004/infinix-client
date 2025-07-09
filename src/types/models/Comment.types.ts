import type CommentMedia from './CommentMedia.types';
import type User from './User.types';
export default interface Comment {

    id: number;

    post_id: number;

    content?: string;

    user: User;

    media?: CommentMedia;

    reply_to_comment_id?: number;
}