import type Message from "./Message.types";
export default interface MessageGroup {

    avatar: string;

    user_displayname: string;

    user_id: number;

    messages: Message[];

    time: Date;

    is_own: boolean;
}