import MessageProps from "@/components/card/Message/Message.types";

export default interface MessageGroupProps {

    messages: MessageProps[];

    avatar: string;

    user_displayname: string;

    user_id: number;

    time: Date;

    style?: React.CSSProperties;

}