import type { Conversation } from "@/types";
export default interface ConversationBoxCardProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;

    conversation: Conversation;

}
