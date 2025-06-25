import type { Message } from "@/types"
export default interface MessageCardProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;

    message: Message;

    is_own: boolean;

    onReply?: (message: Message) => void;

    onEdit?: (message: Message) => void;
}