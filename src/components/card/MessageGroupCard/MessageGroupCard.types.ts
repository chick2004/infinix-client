import type { MessageGroup, Message } from "@/types";
export default interface MessageGroupProps  {

    group: MessageGroup

    style?: React.CSSProperties;

    className?: string;

    onReply?: (message: Message) => void;
}