import type MessageMedia from './MessageMedia.types';
import type User from './User.types';
export default interface Message {

    id: number;

    conversation_id: number;

    user: User;

    reply_to?: Message;

    is_edited?: boolean;

    is_deleted?: boolean;

    is_recalled?: boolean;

    content?: string;

    medias?: MessageMedia[];

    created_at: string;

    updated_at: string;
    
}