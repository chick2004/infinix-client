import type { MessageGroup, Message } from "@/types";
export default interface MessageGroupProps  {

    group: MessageGroup

    style?: React.CSSProperties;

    className?: string;

    show_display_name?: boolean;

    onReply?: (message: Message) => void;

    onEdit?: (message: Message) => void;
}