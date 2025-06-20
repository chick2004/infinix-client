import type Message from './Message.types';
export default interface Conversation {

    id?: number;

    is_group?: boolean;

    name?: string;

    image?: string;

    last_message?: Message;

    messages?: Message[];
}