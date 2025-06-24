import type CommentMedia from './CommentMedia.types';
import type User from './User.types';
export default interface Comment {

    id: number;

    post_id: string;

    content?: string;

    user: User;

    media?: CommentMedia
}