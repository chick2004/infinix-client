import type MessageMedia from './MessageMedia.types';
export default interface Message {

    id?: number;

    conversation_id?: number;

    user_id?: number;

    reply_to_message_id?: number;

    is_edited?: boolean;

    is_deleted?: boolean;

    is_recalled?: boolean;

    content?: string;

    medias?: MessageMedia[];

    created_at?: string;

    updated_at?: string;
    
}