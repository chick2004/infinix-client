import type MessageMedia from './MessageMedia.types';
import type User from './User.types';
export interface Message {

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

export interface MessageGroup {

    avatar: string;

    user_displayname: string;

    user_id: number;

    messages: Message[];

    time: Date;

    is_own: boolean;
}