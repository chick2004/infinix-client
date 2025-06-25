import type { Message } from "@/types";
export default interface CreateMessageCardProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;

    conversation_id: number;

    reply_to?: Message | null;

    onEndReply?: () => void;
    
    editting_message?: Message | null;

    onEndEdit?: () => void;
}